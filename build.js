const chalk = require('chalk')
const fs = require('fs')
const path = require('path')
const archiver = require('archiver')
const log = console.log

const browsers = {
  chrome: {
    name: 'chrome',
    labelColor: 'magenta'
  },
  firefox: {
    name: 'firefox',
    labelColor: 'yellow'
  }
}

const getArchive = browser => {
  const buildFolderPath = path.resolve(__dirname, `./builds/build_${browser}`)

  if (!fs.existsSync(buildFolderPath)) {
    log(chalk.yellow(`${browser} build folder NOT found...`))
    return
  }

  const chalkLabel = chalk.keyword(`${browsers[browser].labelColor}`)
  const label = chalkLabel(browser)

  log(label, chalk.green(`${browser} build folder found...`))

  const zipPath = path.resolve(__dirname, `./builds/${browser}.zip`)
  const output = fs.createWriteStream(zipPath)

  const archive = archiver('zip', {
    zlib: { level: 9 }
  })

  output.on('close', () => {
    const fileSizeMB = (archive.pointer() / 1048576).toFixed(2)
    log(label, chalk.green(`Zip file size: ${fileSizeMB} MB`))
    log(label, 'archiver has been finalized and the output file descriptor has closed.')
  })

  output.on('end', () => log(label, 'Data has been drained'))

  archive.on('warning', err => {
    if (err.code === 'ENOENT') {
      log(label, 'EEEEEE')
    } else {
      throw err
    }
  })

  archive.on('error', err => {
    throw err
  })

  archive.pipe(output)
  archive.directory(buildFolderPath, false)
  archive.finalize()
}

getArchive('chrome')
getArchive('firefox')
