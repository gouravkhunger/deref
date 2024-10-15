#!/usr/bin/env node

const axios = require("axios");
const { program } = require("commander");
const cliInfo = require("../package.json");

program
  .name("deref")
  .description("CLI interface for https://deref.gourav.sh")
  .version(cliInfo["version"], '-v, --version');

program
.requiredOption('-u, --url <string>', 'url to trace redirection path')
.option('-j, --json', 'output raw json response');

program.parse();

const options = program.opts();
const url = options.url;
const json = options.json ? true : false;

axios.post("https://deref.gourav.sh/api", new URLSearchParams({
  'link': url
})).then((response) => {
  const data = response.data;
  if (json) {
    console.log(data);
    return;
  }

  console.log(`Start url: ${data.start_url}`);
  console.log(`Final url: ${data.final_url}\n`);

  console.log(`Found ${data.redirect_count} redirects:`);

  for (let i = 0; i < data.route_log.length; i++) {
    console.log(`${i} — ${data.route_log[i]}`);
  }
}).catch((error) => {
  const response = error.response;

  if (json) {
    console.log({
      status: response.status,
      ...response.data
    });
    process.exit(1);
  }

  console.log(`An unexpected ${response.status} error occurred. ${response.data.message}`);
  process.exit(1);
});
