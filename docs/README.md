# Getting started

## What is Wagon Engine?

Wagon Engine is a HTML templating engine only available on Node.js that allows developers to create fast template based pages. The main idea behind this template was why create a new template language if we could just use javascript. Thus Wagon Engine was born with its sweet syntax to seperate its Javascript from its HTML. Wagon Engine was originally created for yet another node http router named Gare. Internally, Wagon Engine uses a slimmed down version of [BlueText](https://github.com/str1z/bluetext) parser to parse templates.

## Special features

- Everything in Javascript
- Partials from other files
- Functional components
- Fast rendering
- Flexible API

## Installation

```sh
npm i wagon-engine
```

## Your first template

?> It is strongly suggested to install the [syntax highlighting vscode extension](https://marketplace.visualstudio.com/items?itemName=str1z.html-wagon-syntax-highlighting).

Let's first create our template HTML file.

```sh
touch template.html
```

Add the following in the template.

```html
<div>{#for (let i = 0; i < 10; i++)} {i} {/for}</div>
```

Now, we need to compile and render it. To do so, create an `index.js` file.

```sh
touch index.js
```

Install the package with `npm i wagon-engine` and write the following.

```js
const wge = require("wagon-engine");

const html = wge.render(__dirname + "/template.html");

console.log(html);
```

Upon execution, the code above should log:

```html
<div>0 1 2 3 4 5 6 7 8 9</div>
```

_Voilà!_ You have made your first Wagon template.
