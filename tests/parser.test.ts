import Parser from '../src/parser'

const parser = new Parser()

describe('Parse styles', () => {

    it('should parse *** as [b][i]', () => {
        expect(parser.render('***bold-and-italic***')).toBe('[b][i]bold-and-italic[/i][/b]')
        expect(parser.render('***bold and*italic***')).toBe('[b][i]bold and*italic[/i][/b]')
        expect(parser.render('*** bold*n_italic ***')).toBe('[b][i] bold*n_italic [/i][/b]')
    })

    it('should parse ** as [b]', () => {
        expect(parser.render('**bold**')).toBe('[b]bold[/b]')
        expect(parser.render('** bold***')).toBe('[b] bold[/b]*')
    })

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

    it('should parse __ as [u]', () => {
        expect(parser.render('__Hello World__')).toBe('[u]Hello World[/u]')
        expect(parser.render('__Hello_World__')).toBe('[u]Hello_World[/u]')
    })

    it('should parse ~~ as [strike]', () => {
        expect(parser.render('~~Goodbye World~~')).toBe('[strike]Goodbye World[/strike]')
    })

    it('should parse || as [spoiler]', () => {
        expect(parser.render("||You can't see me||")).toBe("[spoiler]You can't see me[/spoiler]")
    })
})

describe('Parse special text', () => {

    it('should parse links', () => {
        expect(parser.render("[Norbyte's Script-Extender](https://github.com/Norbyte/ositools)")).toBe("[url=https://github.com/Norbyte/ositools]Norbyte's Script-Extender[/url]")
    })
})

describe('Parse headers', () => {

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