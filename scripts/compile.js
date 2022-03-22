#!/usr/bin/env node

require('dotenv').config()

const { warnings, errors, success, start, finish } = require('./ui')

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const { join } = require('path')

const existsAsync = promisify(fs.exists)
const fse = require('fs-extra')

const execCommand = promisify(exec)

async function deleteFile(filePath) {
  if (fs.existsSync(filePath)) {
    fs.rmdir(filePath, { recursive: true }, (err) => {
      if (err) {
        throw err;
      }

      console.log(`${filePath} old files deleted!`, '\n');

    });
  }
}


async function compileContract({
  contract,
  path
}) {

  const compiled = join(__dirname, '../build')
  let cmd = ""

  if (process.env.COMPILER === 'local') {
    cmd = `~/smartpy-cli/SmartPy.sh compile ${path} build/${contract} --html`
  } else {

    // cmd = `docker run --rm --name smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project desneruda/smartpy-cli:latest "compile ${path} build/${contract} --html"`
    cmd = `docker run --rm --name smartpy-cli -v ${join(__dirname, '../')}:/app desneruda/smartpy-cli:latest "compile ${path} build/${contract}"`
  }

  start("compiling contract: " + contract)
  console.log("   compiler command: " + cmd, '\n')

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

  success("Compiled successfully\n")

}

module.exports = { compileContract }
