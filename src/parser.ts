export default class Parser {

    replacers: Map<string, { regex: RegExp, replace: string }>

    constructor() {

        //  REPLACERS
        //  =========
    
        //  The order of .replace matters! Elements higher up will be replaced first. 

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
            ['underline',           { regex: /\_{2}(.*?)\_{2}/gm,                       replace: '[u]$1[/u]'                    }],

            //                      _Every-thing in between_                            [i]Every-thing in between[/i]
            ['alt-italic',          { regex: /\_(.*?)\_/gm,                             replace: '[i]$1[/i]'                    }],
            ['alt-italic-fix',      { regex: /(\w+?)\[i\](.*?)\[\/i\]/gm,               replace: '$1_$2_'                       }],

            //                      ~~Every-thing in between~~                          [strike]Every-thing in between[/strike]
            ['strike',              { regex: /\~~(.*?)\~~/gm,                           replace: '[strike]$1[/strike]'          }],

            //                      ||Every-thing in between||                          [spoiler]Every-thing in between[/spoiler]
            ['spoiler',             { regex: /\|\|((.|\n)*?)\|\|/gm,                    replace: '[spoiler]$1[/spoiler]'        }],
            
            //  SPECIAL TYPES
            //  -------------
            
            //                      [Text](https://link.com)                            [url=https://link.com]Text[/url]
            ['link',                { regex: /\[([^\[]+)\]\(([^\)]+)\)/gm,              replace: '[url=$2]$1[/url]'             }],

            ['code-start',          { regex: /```(.+)/g,                                replace: '[code]'                       }],
            ['code-end',            { regex: /```/g,                                    replace: '[/code]'                      }],

            //                      >Michael-Scott You miss 100% of the shots.`         [quote=Michael-Scott]You miss 100% of the shots.[/quote]
            ['authored-quote',      { regex: /^>([\S]+)[\s]+(.*)/gm,                    replace: '[quote=$1]$2[/quote]'         }],
            
            //                      > You miss 100% of the shots.`                      [quote]You miss 100% of the shots.[/quote]
            ['quote',               { regex: /^>[\s]?(.*)/gm,                           replace: '[quote]$1[/quote]'            }],
            
            //                      --- or ===                                          <hr>
            ['horizontal-rule',     { regex: /^-{3,}/gm,                                replace: '<hr>'                         }],
            ['horizontal-rule-alt', { regex: /^={3,}/gm,                                replace: '<hr>'                         }],

            //  LISTS
            //  -----
            
            ['ordered-list',        { regex: /(\n|^)[ ]*[0-9]+\.[ ](.*)/gm,             replace: '$1[olist]\n[*] $2\n[/olist]'  }],
            ['ordered-fix',         { regex: /(\n|^)\[\/olist\][\s]*?\[olist\]/gm,         replace: ''                          }],

            ['unordered-list',      { regex: /(\n|^)[ ]*[\*\-\+][ ](.*)/gm,             replace: '$1[list]\n[*] $2\n[/list]'    }],
            ['unordered-fix',       { regex: /(\n|^)\[\/list\][\s]*?\[list\]/gm,           replace: ''                          }],

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
        return result
    }
}
