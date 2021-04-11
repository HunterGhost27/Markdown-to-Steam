export default class Parser {

    replacers: Map<string, { regex: RegExp, replace: string }>

    constructor() {

        //  REPLACERS
        //  =========
    
        //  The order of .replace matters! Elements higher up should be replaced first. 

        this.replacers = new Map([
        
            //  STYLES
            //  ------
        
            //                      ***Every-thing in between***                        [b][i]Every-thing in between[/i][/b]
            ['bold-&-italic',       { regex: /\*{3}(.*?)\*{3}/gm,                       replace: '[b][i]$1[/i][/b]'             }],

            //                      **_Every-thing in between_**                        [b][i]Every-thing in between[/i][/b]
            ['alt-bold-&-italic',   { regex: /\*{2}\_(.*?)\_\*{2}/gm,                   replace: '[b][i]$1[/i][/b]'             }],

            //                      **Every-thing in between**                          [b]Every-thing in between[/b]
            ['bold',                { regex: /\*{2}(.*?)\*{2}/gm,                       replace: '[b]$1[/b]'                    }],

            //                      *Every-thing in between*                            [i]Every-thing in between[/i]
            ['italic',              { regex: /\*{1}(.*?)\*{1}/gm,                       replace: '[i]$1[/i]'                    }],

            //                      __Every-thing in between__                          [u]Every-thing in between[/u]
            ['underline',           { regex: /\_{2}(.*?)\_{2}/gm,                        replace: '[u]$1[/u]'                    }],

            //                      _Every-thing in between_                            [i]Every-thing in between[/i]
            ['alt-italic',          { regex: /\_(.*?)\_/gm,                             replace: '[i]$1[/i]'                    }],

            //                      ~~Every-thing in between~~                          [strike]Every-thing in between[/strike]
            ['strike',              { regex: /\~~(.*?)\~~/gm,                           replace: '[strike]$1[/strike]'          }],

            //                      ||Every-thing in between||                          [spoiler]Every-thing in between[/spoiler]
            ['spoiler',             { regex: /\|\|((.|\n)*?)\|\|/gm,                    replace: '[spoiler]$1[/spoiler]'        }],
            
            //  SPECIAL TYPES
            //  -------------
            
            //                      [Text](https://link.com)                            [url=https://link.com]Text[/url]
            ['link',                { regex: /\[([^\[]+)\]\(([^\)]+)\)/gm,              replace: '[url=$2]$1[/url]'             }],

            //                      `Hackerman`                                        [code]Hackerman[/code]
            ['code',                { regex: /`((.|\n)*?)`/gm,                          replace: '[code]$1[/code]'              }],

            //                      > You miss 100% of the shots.`                      [quote]You miss 100% of the shots.[/quote]
            ['quote',               { regex: /^\>[\s]?(.*)/gm,                          replace: '$1[quote]$2[/quote]'          }],

            //                      >Michael-Scott You miss 100% of the shots.`         [quote=Michael-Scott]You miss 100% of the shots.[/quote]
            ['authored-quote',      { regex: /^\>[\s]?(.*)/gm,                          replace: '$1[quote]$2[/quote]'          }],
            
            //  LISTS
            //  -----
            
            //  Needs more work
            // ['ordered-list-start',  { regex: /^[\s]*[1]\.[\s]*(.*)/gm,                  replace: '[olist]\n[*]$1'               }],
            // ['ordered-list',        { regex: /^[\s]*[2-9]+\.[\s]*(.*)/gm,               replace: '[*]$1'                        }],
            // ['ordered-list-end',    { regex: /^[\s]+[2-9]+\.[\s]+(.*)/gm,               replace: '[*]$1'                        }],
            
            //  Needs more work
            // ['list',                { regex: /^[\s]*[\*\-\+][\s]*(.*)/gm,                replace: '[list]\n[*]$1'               }],
            
            //  HEADERS
            //  -------
            
            //                      ### Basically Irrelevant                            [h3]Basically Irrelevant[/h3]
            ['header3',             { regex: /^#{3}[\s]?(.*)/gm,                        replace: '[h3]$1[/h3]'                  }],
            
            //                      ## Somewhat Irrelevant                              [h2]Somewhat Irrelevant[/h2]
            ['header2',             { regex: /^#{2}[\s]?(.*)/gm,                        replace: '[h2]$1[/h2]'                  }],
            
            //                      # Most Important                                    [h1]Most Important[/h1]
            ['header1',             { regex: /^#{1}[\s]?(.*)/gm,                        replace: '[h1]$1[/h1]'                  }],
        ])
    }

    //  RENDER FUNCTION
    //  ===============

    render = (md: string) => {
        let result = md
        this.replacers.forEach(rx => { result = result.replace(rx.regex, rx.replace) })
        result = result.trim()
        return result
    }
}
