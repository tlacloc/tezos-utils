#!/usr/bin/env node

require('dotenv').config()

const { exec } = require('child_process')
const { promisify } = require('util')
const fs = require('fs')
const { join } = require('path')

const existsAsync = promisify(fs.exists)
const fse = require('fs-extra')

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
  console.log("test command: " + cmd, '\n')

  if (!fs.existsSync(compiled)) {
    fs.mkdirSync(compiled)
  }

  await deleteFile(join(compiled, `${contract}`))

  await execCommand(cmd).then(warnings => {
    if(warnings.stdout) {console.log(warnings.stdout) }
    if(warnings.stderr) {console.log(warnings.stderr) }
  })
  .catch(err => {
    if(err.stdout) {console.log(err.stdout) }
    if(err.stderr) {console.log(err.stderr) }
  })

}

module.exports = { testContract }
