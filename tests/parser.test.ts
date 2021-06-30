import Parser from '../src/parser'

const parser = new Parser()

describe('Parse styles', () => {

    //  Bold and Italic
    //  ---------------

    it('should parse *** as [b][i]', () => {
        expect(parser.render('***bold-and-italic***')).toBe('[b][i]bold-and-italic[/i][/b]')
        expect(parser.render('***bold and*italic***')).toBe('[b][i]bold and*italic[/i][/b]')
        expect(parser.render('*** bold*n_italic ***')).toBe('[b][i] bold*n_italic [/i][/b]')
    })

    it('should parse **_ as [b][i]', () => {
        expect(parser.render('**_bold-and-italic_**')).toBe('[b][i]bold-and-italic[/i][/b]')
        expect(parser.render('**_bold and*italic_**')).toBe('[b][i]bold and*italic[/i][/b]')
        expect(parser.render('**_ bold*n_italic _**')).toBe('[b][i] bold*n_italic [/i][/b]')
    })

    //  Bold
    //  ----

    it('should parse ** as [b]', () => {
        expect(parser.render('**bold**')).toBe('[b]bold[/b]')
        expect(parser.render('** bold***')).toBe('[b] bold[/b]*')
    })

    //  Italic
    //  ------

    it('should parse * as [i]', () => {
        expect(parser.render('*italic*')).toBe('[i]italic[/i]')
        expect(parser.render('*ita_lic*')).toBe('[i]ita_lic[/i]')
        expect(parser.render('*ita lic*')).toBe('[i]ita lic[/i]')
    })

    it('should parse _ as [i]', () => {
        expect(parser.render('_italic_')).toBe('[i]italic[/i]')
        expect(parser.render('_ita*lic_')).toBe('[i]ita*lic[/i]')
        expect(parser.render('_ita lic_')).toBe('[i]ita lic[/i]')
    })

    //  Underline
    //  ---------

    it('should parse __ as [u]', () => {
        expect(parser.render('__Hello World__')).toBe('[u]Hello World[/u]')
        expect(parser.render('__Hello_World__')).toBe('[u]Hello_World[/u]')
    })

    //  Strikethrough
    //  -------------

    it('should parse ~~ as [strike]', () => {
        expect(parser.render('~~Goodbye World~~')).toBe('[strike]Goodbye World[/strike]')
    })

    //  Spoilers
    //  --------

    it('should parse || as [spoiler]', () => {
        expect(parser.render("||You can't see me||")).toBe("[spoiler]You can't see me[/spoiler]")
    })
})

describe('Parse special text', () => {

    //  Links
    //  -----

    it('should parse links', () => {
        expect(parser.render("[Norbyte's Script-Extender](https://github.com/Norbyte/ositools)")).toBe("[url=https://github.com/Norbyte/ositools]Norbyte's Script-Extender[/url]")
    })

    //  Code
    //  ----

    it('should parse code', () => {
        expect(parser.render("`this.isNotGood() === true`")).toBe("[code]this.isNotGood() === true[/code]")
    })
})

describe('Parse headers', () => {

    //  Headers
    //  -------

    it('should parse # as [h1]', () => {
        expect(parser.render('# YOLO')).toBe('[h1]YOLO[/h1]')
        expect(parser.render('# YO # LO ')).toBe('[h1]YO # LO [/h1]')
    })

    it('should parse ## as [h2]', () => {
        expect(parser.render('## Second-in-command')).toBe('[h2]Second-in-command[/h2]')
    })

    it('should parse ### as [h3]', () => {
        expect(parser.render('### Mostly Irrelevant')).toBe('[h3]Mostly Irrelevant[/h3]')
    })
})

describe('Parse Lists', () => {

    //  Ordered Lists
    //  -------------

    it('should parse ordered-lists', () => {
        const mdol = [
            "1. Create/Edit Config.json in Osiris Data\\StatsConfigurator\\.",
            "2. Load Configuration from the in-game **mod-menu**.",
            "3. Rebuild ConfigData once you're happy with your edits.",
            "4. Broadcast your **ConfigData** to any peers. (Multiplayer)",
            "5. Verify client configs to ensure everyone is on the same page.",
            "6. **Done** - your **ConfigData** will automatically reload your edits whenever the game loads. Repeat the aforementioned options as necessary.",
            "7. Restart the game for changes to apply.",
        ].join('\n')

        const bbol = [
            "[olist]",
            "[*] Create/Edit Config.json in Osiris Data\\StatsConfigurator\\.",
            "[*] Load Configuration from the in-game [b]mod-menu[/b].",
            "[*] Rebuild ConfigData once you're happy with your edits.",
            "[*] Broadcast your [b]ConfigData[/b] to any peers. (Multiplayer)",
            "[*] Verify client configs to ensure everyone is on the same page.",
            "[*] [b]Done[/b] - your [b]ConfigData[/b] will automatically reload your edits whenever the game loads. Repeat the aforementioned options as necessary.",
            "[*] Restart the game for changes to apply.",
            "[/olist]",
        ].join('\n')

        expect(parser.render(mdol)).toBe(bbol)
    })


    //  Unordered Lists
    //  ---------------

    it('should parse unordered-lists', () => {
        const mdul = [
            "* Create/Edit Config.json in Osiris Data\\StatsConfigurator\\.",
            "* Load Configuration from the in-game **mod-menu**.",
            "* Rebuild ConfigData once you're happy with your edits.",
            "+ Broadcast your **ConfigData** to any peers. (Multiplayer)",
            "+ Verify client configs to ensure everyone is on the same page.",
            "- **Done** - your **ConfigData** will automatically reload your edits whenever the game loads. Repeat the aforementioned options as necessary.",
            "- Restart the game for changes to apply.",
        ].join('\n')

        const bbul = [
            "[ulist]",
            "[*] Create/Edit Config.json in Osiris Data\\StatsConfigurator\\.",
            "[*] Load Configuration from the in-game [b]mod-menu[/b].",
            "[*] Rebuild ConfigData once you're happy with your edits.",
            "[*] Broadcast your [b]ConfigData[/b] to any peers. (Multiplayer)",
            "[*] Verify client configs to ensure everyone is on the same page.",
            "[*] [b]Done[/b] - your [b]ConfigData[/b] will automatically reload your edits whenever the game loads. Repeat the aforementioned options as necessary.",
            "[*] Restart the game for changes to apply.",
            "[/ulist]",
        ].join('\n')

        expect(parser.render(mdul)).toBe(bbul)
    })


})