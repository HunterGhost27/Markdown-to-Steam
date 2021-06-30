//  Library
import * as path from 'path'
import { Base64 } from 'js-base64'
import Parser from './parser'

//  Type Definitions
import type { Endpoints } from '@octokit/types'
import type { core, github, octokit } from './typeDefinitions'

//  =======================
const parser = new Parser()
//  =======================

//  Converts files from markdown into steam bb code and pushes the changes to outDir directory
const markdownConverter = async (file: string, outDir: string, core: core, octokit: octokit, github: github) => {

    //  Repo name and owner
    const { owner, repo } = github.context.repo

    //  Get default branch
    const { data: { default_branch: branch } } = await octokit.request(`GET /repos/${owner}/${repo}`) as Endpoints['GET /repos/{owner}/{repo}']['response']


    const filePath = path.join(outDir, file).replace(/\.(\w+)/g, '.txt')    //  Output File Directory

    //  Get contents of Source File
    const { data: { content: baseContent } } = await octokit.repos.getContent({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: file
    }) as { data: { content: string } }
    if (!baseContent) { return }    //  If Source has no contents then return

    //  Decode and parse
    const content = Base64.decode(baseContent)
    const results = parser.render(content)

    if (content.trim() === results.trim()) { return }    //  If there is no change required then return

    //  Get txt file's SHA if it exists
    let sha
    try {
        const { data: { sha: SHA } } = await octokit.repos.getContent({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            path: filePath
        }) as { data: { sha: string } }
        sha = SHA
    } catch (err) {
        sha = undefined
    }

    //  Create/Update file contents
    core.info(`Updating ${filePath}`)
    await octokit.repos.createOrUpdateFileContents({
        owner,
        repo,
        path: filePath,
        branch,
        sha,
        message: 'Update Steam Workshop BB Content',
        content: Base64.encode(results)
    })
}

//  ============================
export default markdownConverter
//  ============================