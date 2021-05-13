import * as path from 'path'
import { Base64 } from 'js-base64'
import Parser from './parser'

import { core, github, octokit } from './typedefs'

const parser = new Parser()

//  Converts files from markdown into steam bb code and pushes the changes to outDir directory
const markdownConverter = async (file: string, outDir: string, core: core, octokit: octokit, github: github) => {

    const [ fileName, fileExtension ] = file.split('.')  //  Get fileName and extension
    if (fileExtension.toLowerCase() !== 'md') { return } // Return if the file specified is not markdown

    //  Get contents
    const { data }  = await octokit.repos.getContent({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: file
    })
    const { content: baseContent } = { ...data }
    if (!baseContent) { return }    //  If README.md has no contents then return
    
    //  Decode and parse
    const content = Base64.decode(baseContent)
    const results = parser.render(content)
    
    if (content.trim() == results.trim()) { return }    //  If there is no change required then return

    //  Get txt file's SHA if it exists
    let sha
    try {
        const { data: txtData }  = await octokit.repos.getContent({
            owner: github.context.repo.owner,
            repo: github.context.repo.repo,
            path: `${outDir}/${fileName}.txt`
        })
        //  Get SHA (if any)
        sha = { ...txtData }.sha
    } catch (err) {
        sha = undefined
    }

    console.log(sha)

    //  Create/Update file contents
    const filePath = path.join(outDir, file).replace(/\.(\w+)/g, '.txt')
    core.info(`Updating ${filePath}`)
    const res = await octokit.repos.createOrUpdateFileContents({
        owner: github.context.repo.owner,
        repo: github.context.repo.repo,
        path: filePath,
        branch: 'main',
        sha,
        message: 'Update Steam Workshop BB Content',
        content: Base64.encode(results)
    })

    console.log(res)
}

//  ============================
export default markdownConverter
//  ============================