# deref

A simple Web, API, and CLI interface to find a URL's redirection path without manually opening it. This is a Node.js implementation of [deref.link](https://deref.link).

## Web

The web interace is available at https://deref.gouravkhunger.me.

## CLI

### Installation

```shell
npm i -g deref-node-cli
```

### Usage

```shell
$ deref --help

Usage: deref [options]

CLI interface for https://deref.gouravkhunger.me

Options:
  -v, --version       output the version number
  -u, --url <string>  url to trace redirection path
  -j, --json          output raw json response
  -h, --help          display help for command
```

There is only one required option: `-u`/`--url`. If the input does not have a url scheme, `http://` is used by default.

```shell
$ deref -u link.gouravkhunger.me/github

Start url: http://link.gouravkhunger.me/github
Final url: https://github.com/gouravkhunger

Found 2 redirects:
0 — http://link.gouravkhunger.me/github
1 — https://link.gouravkhunger.me/github
2 — https://github.com/gouravkhunger
```

You may pass in the `-j` or `--json` flag to obtain raw json response for the redirection log:

```shell
$ deref -u link.gouravkhunger.me/github -j

{
  redirect_count: 2,
  start_url: 'http://link.gouravkhunger.me/github',
  final_url: 'https://github.com/gouravkhunger',
  route_log: [
    'http://link.gouravkhunger.me/github',
    'https://link.gouravkhunger.me/github',
    'https://github.com/gouravkhunger'
  ]
}
```

## API

The API endpoint accepts `POST` requests at https://deref.gouravkhunger.me/api. The only required `body` parameter required to be passed is `link`.

```shell
curl -d "link=link.gouravkhunger.me/github" https://deref.gouravkhunger.me/api

# Formatted for readability
{
  "redirect_count": 2,
  "start_url": "http://link.gouravkhunger.me/github",
  "final_url": "https://github.com/gouravkhunger",
  "route_log": [
    "http://link.gouravkhunger.me/github",
    "https://link.gouravkhunger.me/github",
    "https://github.com/gouravkhunger"
  ]
}
```

If you pass the `-j` flag along with the input URL, the response of the CLI is similar to that of the API.

## License

```
MIT License

Copyright (c) 2022 Gourav Khunger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
