import Parser from './parser'

import { core, github, octokit } from './typedefs'

const markdownConverter = async (core: core, octokit: octokit, github: github) => {
    const parser = new Parser()

    const results = parser.render(`
    # Hello World!

    This is a **Markdown File** that will be *converted* to _steam BB code_.
    `)

    core.info(results)
}

//  ============================
export default markdownConverter
//  ============================