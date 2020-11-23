# Components

The Wagon Templating Engine might not seem very flexible and easy to work with without components until now...

## Quick example

```js
<!-- Define your component -->
{# const myComponent = () => }
    <div>This is my component</div>
{/myComponent}

<!-- and use it! -->
{% myComponent()}
```

The source above will output...

```html
<div>This is my component</div>
```

## With parameters

```js
<!-- Define your component -->
{# const myComponentWithParams = (i) => }
    <div>This is my component #{i + 1}</div>
{/myComponentWithParams}

<!-- and use it! -->
{# for (let i = 0; i < 5; i++>)}
    {% myComponentWithParams(i)}
{/for}
```

The source above will output...

```html
<div>This is my component #1</div>
<div>This is my component #2</div>
<div>This is my component #3</div>
<div>This is my component #4</div>
<div>This is my component #5</div>
```

## From a partial

partial.html

```js
<!-- Define your component -->
{# const myComponentWithParams = () => }
    <div>I am a component from a partial!</div>
{/myComponentWithParams}
```

main.html

```js
<!-- Include the partial -->
{@ this.include("./partial.html")}
<!-- and use it! -->
{% myComponentWithParams(i)}
```

The source above will output...

```html
<div>I am a component from a partial!</div>
```
