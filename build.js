const chalk = require('chalk')

console.log(chalk.bgMagenta(' 我是大傻子'))

const fs = require('fs')
const archiver = require('archiver')
const chalk = require('chalk')

const output = fs.createWriteStream(__dirname + '/chrome.zip')

const archive = archiver('zip', {
    zlib: { level: 9 } 
})

output.on('close', () => {
    console.log(chalk.green((archive.pointer() / 1048576).toFixed(2) + ' MB'))
    console.log('archiver has been finalized and the output file descriptor has closed.')
})


output.on('end', () => {
    console.log('Data has been drained')
})


archive.on('warning', function(err) {
    if (err.code === 'ENOENT') {
        console.log('EEEEEE')
    } else {
        throw err
    }
})


archive.on('error', function(err) {
    throw err
})

archive.pipe(output)

const buildDir = __dirname + '/build/'


if (buildDir) {
    console.log("Building: " + buildDir)
    archive.directory('build/', false)
} else {
    chalk.yellow('Build folder not found')
}


archive.finalize()


