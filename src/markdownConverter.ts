import * as path from 'path'
import { Base64 } from 'js-base64'
import Parser from './parser'

import { core, github, octokit } from './typedefs'

const parser = new Parser()

//  Converts files from markdown into steam bb code and pushes the changes to outDir directory
const markdownConverter = async (file: string, outDir: string, core: core, octokit: octokit, github: github) => {
    //  Get Markdown contents
    try{
        const { data }  = await octokit.repos.getContent({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            path: file
        })

        const { content: baseContent, sha } = { ...data }
        if (!baseContent) { return } //Base64 decode and do stuff with content
        
        const content = Base64.decode(baseContent)
        const results = parser.render(content)

        if (content.trim() == results.trim()) { return }

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
    } catch (err) {
        core.error(err)
    }
}

//  ============================
export default markdownConverter
//  ============================