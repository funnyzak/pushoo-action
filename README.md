# Pushoo Github Action

[![license][license-image]][repository-url]
[![Sourcegraph][sg-image]][sg-url]
[![action][ci-image]][ci-url]
[![GitHub repo size][repo-size-image]][repository-url]
[![latest tag][tag-image]][rle-url]
[![GitHub last commit][last-commit-image]][repository-url]

[license-image]: https://img.shields.io/github/license/funnyzak/pushoo-action.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/pushoo-action
[repo-size-image]: https://img.shields.io/github/repo-size/funnyzak/pushoo-action
[down-latest-image]: https://img.shields.io/github/downloads/funnyzak/pushoo-action/latest/total.svg
[down-total-image]: https://img.shields.io/github/downloads/funnyzak/pushoo-action/total.svg
[commit-activity-image]: https://img.shields.io/github/commit-activity/m/funnyzak/pushoo-action?style=flat-square
[last-commit-image]: https://img.shields.io/github/last-commit/funnyzak/pushoo-action?style=flat-square
[license-image]: https://img.shields.io/github/license/funnyzak/pushoo-action.svg?style=flat-square
[repository-url]: https://github.com/funnyzak/pushoo-action
[rle-url]: https://github.com/funnyzak/pushoo-action/releases/latest
[rle-all-url]: https://github.com/funnyzak/pushoo-action/releases
[ci-image]: https://img.shields.io/github/workflow/status/funnyzak/pushoo-action/CI
[ci-url]: https://github.com/funnyzak/pushoo-action/actions
[rle-image]: https://img.shields.io/github/release-date/funnyzak/pushoo-action.svg
[sg-image]: https://img.shields.io/badge/view%20on-Sourcegraph-brightgreen.svg?style=flat-square
[sg-url]: https://sourcegraph.com/github.com/funnyzak/pushoo-action
[tag-image]: https://img.shields.io/github/v/tag/funnyzak/pushoo-action

A GitHub Action with [Pushoo.js](https://github.com/imaegoo/pushoo) pushes multiple platform messages.

## Usages

```yaml
name: CI
on:
  push:
    tags:
      - '*'
  pull_request:
    branches: [main]
  workflow_dispatch:
jobs:
  PushooPush:
    runs-on: ubuntu-latest
    steps:
      -
        name: Checkout
        uses: actions/checkout@v2
      -
        name: Pushoo Action
        uses: funnyzak/pushoo-action@main
        with:
          platforms: wecom, dingtalk, bark
          tokens: ${{ secrets.PUSH_TOKEN }}
          content: |
            # Pushoo Action Test
            trigger event: ${{ github.event_name }}
          title: Pushoo Action Test
          options: '{"bark": { "url": "https://github.com/funnyzak" }}'
          debug: false
```

## Inputs

| Name               | Type     | Description                                                                                                                                                                        |
|--------------------|----------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `platforms`        | List/CSV | List of [platforms mapping](https://github.com/imaegoo/pushoo) (e.g., `dingtalk,wecom`)       |
| `tokens`            | List/CSV | List of [token](https://github.com/imaegoo/pushoo) (e.g., `dingtalk_token_string,wecom_token_string`)                 |
| `content`          | String   | The push content of the Markdown format. If the push platform does not support MarkDown, Pushoo will automatically convert to support formats.                                                                                       |
| `title`    | String   | Optional, message title, if the push platform does not support message title, it will be spliced in the first line of the text.              |
| `options`          | String   | Optional, For some additional configuration when pushing, Json string.  |
| `debug`             | Boolean   | Enable the debug flag to show detail log. |             

## Contribution

If you have any ideas or opinions, please refer to Issue or PR.

<a href="https://github.com/funnyzak/pushoo-action/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=funnyzak/pushoo-action" />
</a>

## License

MIT License © 2022 [funnyzak](https://github.com/funnyzak)
