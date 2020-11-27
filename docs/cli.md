# CLI

The command line tool for development purposes only. Was made with cliful, a library made for it.

## Installation

```sh
npm i wge-cli -g
```

## Coommands

### serve

Start the Wagon Engine live development server!

`serve [dir]? -[port,p]? -[inject,i]?`

- arguments : `arg0 exact(serve) dir type(string)`
- options : `port type(integer) inject type(string)`

### help

For help
`help [name]#? -[all,a]?`

- arguments : `arg0 exact(help) name type(string)`
- options : `all type(boolean)`

### info

Get the nescessary information.

`info`

- arguments : `arg0 exact(info)`
- options : `none`
