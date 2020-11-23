# Syntax

Right now, this might seem a bit intimidating, but no worries, this page will clear all of it!

?> There are only 5 types of blocks in this templating engine with there own specialities.

## Render Block

Everything in the render block will get evaluated and then rendered.

```js
<!-- numbers -->
{123}
<!-- booleans -->
{true}
<!-- strings -->
{"Hello world"}
<!-- functions -->
{getMessage()}
<!-- javascript... duh -->
{12 + 12 + 12 + getNumber() + Math.random()}
```

## Eval block

Everything will get evaludated, but never rendered.

```js
{% let hello = "helloworld"}
{%
    // multiline
    let array = []
    for (let i = 0; i < 10; i++) array.push(Math.random())
}
```

## Block block

To start a block of code and have any blocks nested inside.

```js
{# for (let i = 0; i < 10; i++)}
    <!-- anything can go here -->
{/for}
```

!> The variable `i` will only be available inside of the scope just like in Javascript.

!> Don't forget to close the Block Block with `{/your_identifier_to_not_get_lost}`

## Compile block

To add code during compilation.

```js
{@ this.include("./partial.html")}
```

## Other block

To get precomputed values and render it inside `script tags`, `style tags` or `attributes`.

?> Why use another syntax? Another syntax was used to avoid confusion and syntax errors, especially in the script tags, style tags and event attributes.

```html
{% let obj = {n: Math.random()}}
<script>
  let number = ___obj_n___;
</script>

{% let color = "red"}
<div style="color: ___color___">I am red...</div>
```

!> There are 3 underscores surrounding it and all nested underscores are replaced with dots. For variable properties, precomputation will be nescessary.
