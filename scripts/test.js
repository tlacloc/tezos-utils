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
    fs.unlinkSync(filePath)
  }
}


async function testContract ({
  contract,
  path
}) {

  const compiled = join(__dirname, '../test_results')
  let cmd = ""
  
  if (process.env.COMPILER === 'local') {
    cmd = `eosio-cpp -abigen -I ./include -contract ${contract} -o ./compiled/${contract}.wasm ${path}`
  } else {

    cmd = `docker run --rm --name smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli "test ${path} test_results/${contract} --html"`
    // cmd = `docker run --rm --name bakingbad/smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli /bin/bash -c "compile ${path} compiled/${contract} --html"`
  }
  console.log("compiler command: " + cmd, '\n')

  if (!fs.existsSync(compiled)) {
    fs.mkdirSync(compiled)
  }

  await deleteFile(join(compiled, `${contract}`))

  await execCommand(cmd)
  console.log(path)

}

module.exports = { testContract }
