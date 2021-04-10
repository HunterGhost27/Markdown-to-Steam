export default class Parser {

    replacers: Map<string, { regex: RegExp, replace: string }>

    constructor() {

        //  REPLACERS
        //  =========
    
        this.replacers = new Map([
        
            //  STYLES
            //  ------
        
            ['bold',                { regex: /\*\*(.*?)\*\*/g,                  replace: '[b]$1[/b]'                    }],
            ['italic',              { regex: /\*(.*?)\*/g,                      replace: '[i]$1[/i]'                    }],
            ['underline',           { regex: /\_(.*?)\_/g,                      replace: '[u]$1[/u]'                    }],
            ['strike',              { regex: /\~(.*?)\~/g,                      replace: '[strike]$1[/strike]'          }],
            ['spoiler',             { regex: /~~((.|\n)*?)~~/g,                 replace: '[spoiler]$1[/spoiler]'        }],
            
            //  SPECIAL TYPES
            //  -------------
            
            ['link',                { regex: /\[([^\[]+)\]\(([^\)]+)\)/g,       replace: '[url=$2]$1[/url]'             }],
            ['code',                { regex: /`((.|\n)*?)`/g,                   replace: '[code]$1[/code]'              }],
            ['quote',               { regex: /(\n|^)\>[ ](.*)/g,                replace: '$1[quote]$2[/quote]'          }],
            
            //  LISTS
            //  -----
            
            ['ordered-list',        { regex: /(\n|^)[ ]*[0-9]+\.[ ](.*)/g,      replace: '$1[olist]\n[*]$2\n[/olist]'   }],
            ['unordered-list',      { regex: /(\n|^)[ ]*[\*\-\+][ ](.*)/g,      replace: '$1[ulist]\n[*]$2\n[/ulist]'   }],
            
            //  HEADERS
            //  -------
            
            ['header1',             { regex: /(\n|^)(#{1})[ ](.*)/g,            replace: '[h1]$1[/h1]'                  }],
            ['header2',             { regex: /(\n|^)(##{1})[ ](.*)/g,           replace: '[h2]$1[/h2]'                  }],
            ['header3',             { regex: /(\n|^)(###{1})[ ](.*)/g,          replace: '[h3]$1[/h3]'                  }],
        ])
    }

    //  RENDER FUNCTION
    //  ===============

    render = (md: string) => {
        let result = ''
        this.replacers.forEach(rx => {
            result = md.replace(rx.regex, rx.replace)
        })
        return result
    }
}
