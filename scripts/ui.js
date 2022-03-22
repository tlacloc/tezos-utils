async function warnings(message) {
    console.log(`🚧 ${message}`)

}


async function errors(message) {
    console.log(`❌ ${message}`)

}

async function success(message) {
    console.log(`✅ ${message}`)

}

async function start(message) {
    console.log(`🏃 ${message}`)

}

async function finish(message) {
    console.log(`🎉 🎉  ${message} 🎉 🎉`)

}

async function flag(message) {
    console.log(`🚩 ${message}`)

}


module.exports = {

    warnings,
    errors,
    success,
    start,
    finish,
    flag
}
