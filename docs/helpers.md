# Helpers

Let's say that you have a super complex function that you want to call within the template. You can...

- Just pass it inside `data`.
- Make it your own!

Because that the `this` is available everywhere inside the template, you can add your own methods either to `Template.prototype` or just to the instance.

## Creating helpers

index.js

```js
const { Template } = require("wge");
let template = Template.fromFile(__dirname + "/template.html");

// with the instance
template.myHelper = function () {
  return "I am from a helper (method)!";
};

// with prototype
Template.prototype.otherHelper = function () {
  // all template instances will have access to this helper!
  return "I am from the other helper (method)!";
};

let renderer = template.compile();
console.log(renderer());
```

template.html

```html
{ this.myHelper() }
<hr />
{ this.otherHelper() }
```

will output...

```html
I am from a helper (method)!
<hr />
I am from the other helper (method)!
```

## Compile time helpers

Compile time helpers are helpers that will be executed on compile time, thus they need to be inside the [Compile Block](syntax#compile-block).

?> The `include` method is a helper to include other partials!

This is up to your own creativity. Refer to the [Javascript API Template class](/javascript-api#template-class) for more information on what you can use.
