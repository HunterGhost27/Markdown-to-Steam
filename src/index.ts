import * as core from '@actions/core'
import * as github from '@actions/github'

import markdownConverter from './markdownConverter'

const files = core.getInput('files').split(', ')
const outDir = core.getInput('outDir')

//  =======
//  OCTOKIT
//  =======

const GITHUB_ACCESS_TOKEN = process.env.GITHUB_TOKEN || ''
!GITHUB_ACCESS_TOKEN && core.setFailed(`Invalid GITHUB_ACCESS_TOKEN`)
const octokit = github.getOctokit(GITHUB_ACCESS_TOKEN)


markdownConverter(files, outDir, core, octokit, github)
    .then(() => core.info('Successfully converted README.md into steam-workshop bb code'))
    .catch((err: Error) => core.setFailed(err))