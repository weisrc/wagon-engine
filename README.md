# Wagon Engine

Wagon is a very fast and cool templating engine for fast development.

Here is quick example on the syntax.

```
<div id="myDiv">
    {#if (usingWagon === true)}
        {niceMessage()}
    {:else}
        Use it because it is cool.
    {/if}
</div>
```

As you can see, it is literally javascript in html.

Now lets try to compile this template.

```js
let renderer = Template.fromFile("fullPathToTemplate.html").compile();
console.log(
  renderer({
    usingWagon: true,
    niceMessage: () => "Yay, you are using Wagon!",
  })
);
```

Ouputs

```html
<div id="myDiv">Yay, you are using Wagon!</div>
```

Time to spice things up!

with for loops...

```
{#for (let i = 0; i < 10; i ++>)}
    {i}
{/for}
```

Outputs...

```
0 1 2 3 4 5 6 7 8 9
```

with while loops...

```
{#while (true)}
    Oops no good
{/while}
```

Outputs...

Nothing just like any javascript never ending loops.

with literally javascript code...

```
{%
    class Human {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }
        greet() {
            return `Hello, my name is ${this.name} and I am ${this.age}.`
        }
    }
}
{new Human("Bob", 20).greet()}
```

Outputs...

```
Hello, my name is Bob and I am 20
```

### Very simple syntax...

| syntax                | description                   | example                            |
| --------------------- | ----------------------------- | ---------------------------------- |
| `{code}`              | Evaluated and displayed       | {"You will see me"}                |
| `{% code}`            | Evaluated, but not displayed  | {% let m = "You will not"}         |
| `{# block statement}` | Open a block statement        | {# if (true)}                      |
| `{: block statement}` | Chains a block statement      | {: else if (true)}                 |
| `{/...}`              | Closes a block statement      | {/ if}                             |
| `{@ code}`            | Evaluated during compile time | {@ this.include("./partial.html")} |

### Render time variables

| name        | description                    |
| ----------- | ------------------------------ |
| `this.main` | Root template name (full path) |
| `this.html` | In generation HTML             |

`this.html` can be modified by the template.

So...

```
{% this.html += "Hello world"}
```

will be the same as...

```
{"Hello world"}
```

or even simpler...

```
Hello world
```

### Compile time variables and methods

| name                                  | description                                 |
| ------------------------------------- | ------------------------------------------- |
| `this.main`                           | Root template name (full path)              |
| `this.name`                           | Current template name (full path)           |
| `this.raw`                            | Raw template                                |
| `this.code`                           | In genration code                           |
| `this.define(string name, any value)` | Define a constant                           |
| `this.include(string relativePath)`   | Inserts compiled code from another template |

### Syntax highlighting

There is syntax highlighter in the VScode Marketplace.
https://marketplace.visualstudio.com/items?itemName=str1z.html-wagon-syntax-highlighting
