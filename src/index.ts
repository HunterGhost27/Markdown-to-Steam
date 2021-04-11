//  GitHub Actions Toolkit
import * as core from '@actions/core'
import * as github from '@actions/github'

import markdownConverter from './markdownConverter'

const files = core.getInput('files').split(/,\s+?/g)    //  Parse comma separated list of files as array
const outDir = core.getInput('outDir')  //  Output directory

//  =======
//  OCTOKIT
//  =======

//  Setup octokit client
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_TOKEN || ''
!GITHUB_ACCESS_TOKEN && core.setFailed(`Invalid GITHUB_ACCESS_TOKEN`)
const octokit = github.getOctokit(GITHUB_ACCESS_TOKEN)

//  Convert files and push changes to output directory
markdownConverter(files, outDir, core, octokit, github)
    .then(() => core.info(`Successfully converted ${files.join(', ')} into steam-workshop bb code`))
    .catch((err: Error) => core.setFailed(err))