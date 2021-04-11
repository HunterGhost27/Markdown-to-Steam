import * as path from 'path'
import Parser from './parser'

import { core, github, octokit } from './typedefs'

//  Converts files from markdown into steam bb code and pushes the changes to outDir directory
const markdownConverter = async (files: string[], outDir: string, core: core, octokit: octokit, github: github) => {
    const parser = new Parser()

    files.forEach(async file => {
        //  Get Markdown contents
        const { data }  = await octokit.repos.getContent({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            path: file
        })

        const { content, sha } = { ...data }
        if (!content) { return } //Base64 decode and do stuff with content
        
        const results = parser.render(content)

        const filePath = path.join(outDir, file).replace(/\.(\w+)/g, '.txt')
        core.info(`Updating ${filePath} with: \n${results}`)
        // await octokit.repos.createOrUpdateFileContents({
        //     owner: github.context.repo.owner,
        //     repo: github.context.repo.repo,
        //     path: filePath,
        //     sha,
        //     message: 'Update Steam Workshop BB Content',
        //     content: results
        // })
    })
}

//  ============================
export default markdownConverter
//  ============================