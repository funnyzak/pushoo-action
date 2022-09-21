import {parse} from 'csv-parse/sync';
import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import * as tmp from 'tmp';

import * as core from '@actions/core';
import {issueCommand} from '@actions/core/lib/command';
import * as github from '@actions/github';
import {ChannelType} from 'pushoo';

let _defaultContext, _tmpDir: string;

export interface Inputs {
  platforms: ChannelType[];
  tokens: string[];
  content: string;
  title: string;
  options_file: string;
  debug: boolean;
  timeout: number;
}

export function defaultContext(): string {
  if (!_defaultContext) {
    let ref = github.context.ref;
    if (github.context.sha && ref && !ref.startsWith('refs/')) {
      ref = `refs/heads/${github.context.ref}`;
    }
    if (github.context.sha && !ref.startsWith(`refs/pull/`)) {
      ref = github.context.sha;
    }
    _defaultContext = `${process.env.GITHUB_SERVER_URL || 'https://github.com'}/${github.context.repo.owner}/${github.context.repo.repo}.git#${ref}`;
  }
  return _defaultContext;
}

export function tmpDir(): string {
  if (!_tmpDir) {
    _tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'pushoo-')).split(path.sep).join(path.posix.sep);
  }
  return _tmpDir;
}

export function tmpNameSync(options?: tmp.TmpNameOptions): string {
  return tmp.tmpNameSync(options);
}

export async function getInputs(): Promise<Inputs> {
  return {
    platforms: (await getInputList('platforms')).map(v => v as ChannelType),
    tokens: await getInputList('tokens'),
    content: core.getInput('content'),
    title: core.getInput('title'),
    options_file: core.getInput('options_file'),
    debug: core.getInput('debug') == 'true',
    timeout: parseInt(core.getInput('timeout'))
  };
}

export async function getInputList(name: string, ignoreComma?: boolean): Promise<string[]> {
  const res: Array<string> = [];

  const items = core.getInput(name);
  if (items == '') {
    return res;
  }

  const records = await parse(items, {
    columns: false,
    relaxQuotes: true,
    relaxColumnCount: true,
    skipEmptyLines: true
  });

  for (const record of records as Array<string[]>) {
    if (record.length == 1) {
      res.push(record[0]);
      continue;
    } else if (!ignoreComma) {
      res.push(...record);
      continue;
    }
    res.push(record.join(','));
  }

  return res.filter(item => item).map(pat => pat.trim());
}

// FIXME: Temp fix https://github.com/actions/toolkit/issues/777
export function setOutput(name: string, value: unknown): void {
  issueCommand('set-output', {name}, value);
}
