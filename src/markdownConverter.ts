//  Library
import * as path from 'path'
import { Base64 } from 'js-base64'
import Parser from './parser'

//  Type Definitions
import type { core, github, octokit } from './typeDefinitions'

//  =======================
const parser = new Parser()
//  =======================

//  Converts files from markdown into steam bb code and pushes the changes to outDir directory
const markdownConverter = async (file: string, outDir: string, core: core, octokit: octokit, github: github) => {

    const filePath = path.join(outDir, file).replace(/\.(\w+)/g, '.txt')    //  Output File Directory

    //  Get contents of Source File
    const { data } = await octokit.repos.getContent({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: file
    })
    const { content: baseContent } = { ...data } as { content: string }
    if (!baseContent) { return }    //  If Source has no contents then return

    //  Decode and parse
    const content = Base64.decode(baseContent)
    const results = parser.render(content)

    if (content.trim() === results.trim()) { return }    //  If there is no change required then return

    //  Get txt file's SHA if it exists
    let sha
    try {
        const { data: txtData } = await octokit.repos.getContent({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            path: filePath
        }) as { data: { sha: string } }

        //  Get SHA (if any)
        sha = { ...txtData }.sha
    } catch (err) {
        sha = undefined
    }

    //  Create/Update file contents
    core.info(`Updating ${filePath}`)
    await octokit.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: filePath,
        branch: 'main',
        sha,
        message: 'Update Steam Workshop BB Content',
        content: Base64.encode(results)
    })
}

//  ============================
export default markdownConverter
//  ============================