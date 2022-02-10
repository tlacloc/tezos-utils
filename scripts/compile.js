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


async function compileContract ({
  contract,
  path
}) {

  const compiled = join(__dirname, '../build')
  let cmd = ""
  
  if (process.env.COMPILER === 'local') {
    cmd = `~/smartpy-cli/SmartPy.sh compile ${path} build/${contract} --html`
  } else {

    cmd = `docker run --rm --name smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli "compile ${path} build/${contract} --html"`
    // cmd = `docker run --rm --name bakingbad/smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli /bin/bash -c "compile ${path} compiled/${contract} --html"`
  }

  console.log("**** compiling contract: " + contract, '\n')
  console.log("compiler command: " + cmd, '\n')

  if (!fs.existsSync(compiled)) {
    fs.mkdirSync(compiled)
  }

  await deleteFile(join(compiled, `${contract}`))

  await execCommand(cmd)

}

module.exports = { compileContract }
