//  GitHub Actions Toolkit
import * as core from '@actions/core'
import * as github from '@actions/github'

import markdownConverter from './markdownConverter' //  Markdown Converter

//  -----------------------------------------------------
const file = core.getInput('file')  //  The File to parse
//  -----------------------------------------------------

//  =======
//  OCTOKIT
//  =======

//  Setup octokit client
const GITHUB_ACCESS_TOKEN = process.env.GITHUB_TOKEN || ''
!GITHUB_ACCESS_TOKEN && core.setFailed(`Invalid GITHUB_ACCESS_TOKEN`)
const octokit = github.getOctokit(GITHUB_ACCESS_TOKEN)

//  Convert files and push changes to output directory
markdownConverter(file, core, octokit, github)
    .then(() => core.info(`Successfully converted ${file} --> Steam BB-Code`))
    .catch((err: Error) => core.setFailed(err))