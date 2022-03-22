#!/usr/bin/env node

require('dotenv').config()

const { warnings, errors, success, start, finish } = require('./ui')

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const { join } = require('path')

const existsAsync = promisify(fs.exists)
const fse = require('fs-extra')
const { exit } = require('process')

const execCommand = promisify(exec)

async function deleteFile (filePath) {
  if (fs.existsSync(filePath)) {
    fs.rmdir(filePath, { recursive: true }, (err) => {
      if (err) {
          throw err;
      }

      console.log(`${filePath} old files deleted!`, '\n');

    });
  }
}


async function testContract ({
  contract,
  path
}) {

  const compiled = join(__dirname, '../test_results')
  let cmd = ""
  
  if (process.env.COMPILER === 'local') {
    cmd = `~/smartpy-cli/SmartPy.sh test ${path} test_results/${contract} --html`
  } else {

    cmd = `docker run --rm --name smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli "test ${path} test_results/${contract} --html"`
    // cmd = `docker run --rm --name bakingbad/smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli /bin/bash -c "compile ${path} compiled/${contract} --html"`
  }
  start("testing contract: " + contract)
  console.log("test command: " + cmd, '\n')

  if (!fs.existsSync(compiled)) {
    fs.mkdirSync(compiled)
  }

  await deleteFile(join(compiled, `${contract}`))

  await execCommand(cmd).then(warning => {
    if (warning.stdout) { warnings(warning.stdout) }
    if (warning.stderr) { warnings(warning.stderr) }
  })
  .catch(err => {
      if (err.stdout) { errors(err.stdout) }
      if (err.stderr) { errors(err.stderr) }
      exit()

  })

  success("Tests passed\n")

}

module.exports = { testContract }
