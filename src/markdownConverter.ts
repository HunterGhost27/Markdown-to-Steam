import * as path from 'path'
import Parser from './parser'

import { core, github, octokit } from './typedefs'

const markdownConverter = async (files: string[], outDir: string, core: core, octokit: octokit, github: github) => {
    const parser = new Parser()

    files.forEach(file => {
        const filePath = path.join(outDir, file)
        core.info(`file-path: ${filePath}`)
    })

    const results = parser.render(`
    # Hello World!

    This is a **Markdown File** that will be *converted* to _steam BB code_.
    `)

    core.info(results)
}

//  ============================
export default markdownConverter
//  ============================