#!/usr/bin/env node

'use strict'

/* eslint no-console:off */

const fs = require('fs')
const path = require('path')
const { execFileSync } = require('child_process')
const { mkdir, cp, touch, which, cd } = require('shelljs')

// Process cli args.
const args = process.argv.slice(2)
const packageName = args[0]

// Ensure a package name was provided.
if (!packageName) {
  console.error('Error: The package name must be provided')
  process.exit(1)
}

// References for base and new package directories.
const basePackageDir = path.join(__dirname, '../packages/typography')
const newPackageDir = path.join(__dirname, `../packages/${packageName}`)

/**
 * Add package script.
 */

mkdir(newPackageDir)

cp(path.join(basePackageDir, 'LICENSE'), newPackageDir)
cp(path.join(basePackageDir, 'README.md'), newPackageDir)
cp(path.join(basePackageDir, '.npmignore'), newPackageDir)
cp('-r', path.join(basePackageDir, 'assets'), newPackageDir)

mkdir(path.join(newPackageDir, 'src'))
touch(path.join(newPackageDir, 'src/index.js'))

// Run yarn init if yarn installed.
const yarnInstalled = which('yarn') !== null
if (!yarnInstalled) {
  console.warn(
    'Warn: yarn not found, please run `npm init` inside the new package.'
  )
} else {
  cd(newPackageDir)
  execFileSync('yarn', ['init'], { stdio: 'inherit' })

  const newPackageFile = path.join(newPackageDir, 'package.json')
  if (fs.existsSync(newPackageFile)) {
    const pkg = JSON.parse(fs.readFileSync(newPackageFile, 'utf8'))
    pkg.publishConfig = { access: 'public' }
    fs.writeFileSync(newPackageFile, JSON.stringify(pkg, null, 2))
  }

  execFileSync('yarn', ['add', 'react', 'react-dom', '--peer'])
}

console.log(`⚡️  New package created: ${newPackageDir}`)
process.exit(0)
