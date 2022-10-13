import * as core from '@actions/core';
import pushoo, {ChannelType} from 'pushoo';
import * as context from './context';
import * as stateHelper from './state-helper';

async function run(): Promise<void> {
  try {
    stateHelper.setTmpDir(context.tmpDir());

    const defContext = context.defaultContext();
    const inputs: context.Inputs = await context.getInputs();

    await core.group(`Input Info`, async () => {
      core.info(JSON.stringify(inputs));
      core.info(defContext);
    });

    inputs.platforms.forEach(async (platform: ChannelType, index: number) => {
      const result = await pushoo(platform, {
        token: inputs.tokens[index],
        title: inputs.title,
        content: inputs.content,
        options: inputs.options
      });

      await core.group(`Platform Push Result`, async () => {
        core.info(JSON.stringify(result));
      });
    });

    await core.group(`OutPut Info`, async () => {
      core.info(JSON.stringify(defContext));
      context.setOutput('metadata', {context: defContext});
    });
  } catch (error) {
    core.setFailed(error.message);
  }
}

// async function cleanup(): Promise<void> {
//   if (stateHelper.tmpDir.length > 0) {
//     core.startGroup(`Removing temp folder ${stateHelper.tmpDir}`);
//     fs.rmSync(stateHelper.tmpDir, {recursive: true});
//     core.endGroup();
//   }
// }

run();
