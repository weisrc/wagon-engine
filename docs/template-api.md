# Template API

The template API will describe the API only available inside of the template.

## Render time

All the following will only 100% work in render time. In other words, some of it might not work inside the [Compile Block](/syntax#compile-block)

### Variables

| name        | description                        | constant |
| ----------- | ---------------------------------- | -------- |
| `this`      | the `Template instance`            | `true`   |
| `self`      | the template render context        | `true`   |
| `data`      | the data passed by the renderer    | `false`  |
| `self.main` | the filename of the template       | `false`  |
| `self.code` | the generated code of the template | `false`  |
| `self.raw`  | the final raw template             | `false`  |
| `self.html` | the _in-generation_ html           | `false`  |

#### Examples

```js
{% self.html += "Hello there"}
```

is equivalient to...

```html
{"Hello there"}
```

or just...

```
Hello there
```

---

```js
Welcome back {data.username}!
Here is what you missed...
{#for (let item of data.missed)}
    <div style="display: block; color: ___item_color___">
        {item.title + "\n"}
    </div>
{/for}
```

## Compile time

Essentially everything inside `{@ ...}`.

?> The compile time context is all the properties and methods of an instance of the `Template class` under the `this` keyword.

### Properties

| name        | description                              | constant |
| ----------- | ---------------------------------------- | -------- |
| `this.main` | the filename of the main template        | `false`  |
| `this.name` | the filename of the current template     | `false`  |
| `this.code` | the _in-generation_ code of the template | `false`  |
| `this.raw`  | the final raw template                   | `false`  |

#### Examples

```js
{@
    if (this.main == this.name) {
        console.log("You are running me as the main file.")
    }
}
```

### Methods

| name           | description                           | params                     |
| -------------- | ------------------------------------- | -------------------------- |
| `this.include` | include a partial                     | `string relativePath`      |
| `this.define`  | define a `render time` constant       | `string name`, `any value` |
| `this.write`   | write raw code during `compile time`. | `string rawCode`           |

#### Examples

main.html

```js
{@ this.include("./partial.html")}
<h1>I am main. Nice to meet you!</h1>
{@ this.define("myNumber", 123)}
{myNumber}
<hr>
{@ this.write("myNumber = 321")}
{myNumber}
```

partial.html

```js
<h1>Greetings! I am from partial.</h1>
```

outputs

```html
<h1>Greetings! I am from partial.</h1>
<h1>I am main. Nice to meet you!</h1>
123
<hr />
321
```

!> Add in front `./` for relative paths.
