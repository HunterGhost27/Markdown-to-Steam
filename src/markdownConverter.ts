import * as path from 'path'
import { Base64 } from 'js-base64'
import Parser from './parser'

import { core, github, octokit } from './typedefs'

const parser = new Parser()

//  Converts files from markdown into steam bb code and pushes the changes to outDir directory
const markdownConverter = async (file: string, outDir: string, core: core, octokit: octokit, github: github) => {
    //  Get Markdown contents
    const { data }  = await octokit.repos.getContent({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: file
    })

    //  Get contents and SHA (if any)
    const { content: baseContent, sha } = { ...data }
    if (!baseContent) { return }
    
    //  Decode and parse
    const content = Base64.decode(baseContent)
    const results = parser.render(content)

    if (content.trim() == results.trim()) { return }

    //  Create/Update file contents
    const filePath = path.join(outDir, file).replace(/\.(\w+)/g, '.txt')
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