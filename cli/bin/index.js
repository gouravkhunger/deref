#! /usr/bin/env node

const yargs = require("yargs");

const options = yargs  
  .usage("Usage: deref <cmd> [args]")  
  .command("link", {
    alias:"link",
    describe: "Link to trace for redirects.",
    type: "string",
    demandOption: true
  }).help(true).argv;