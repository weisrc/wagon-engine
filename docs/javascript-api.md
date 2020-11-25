# Javscript API

## Variables

### cache

`map<string> cache` is to store the precompiled renderers.

### config

`bool config.cache` is the option to disable or enable default caching.

## Functions

### render

`string function(string path, any data, bool cache?)` returns the rendered HTML from the template. If already rendered, it will take the renderer from cache. It will otherwise generate a new renderer function.

`string path` is the absolute path to the template.

`any data` is the `data` in the render time context.

`bool cache` is an option to enable caching. Defaults to `config.cache`.

### asyncRender

`async string function(string path, any data, bool cache?)` returns the rendered HTML from the template. If already rendered, it will take the renderer from cache. It will otherwise generate a new asynchronous renderer function.

`string path` is the absolute path to the template.

`any data` is the `data` in the render time context.

`bool cache` is an option to enable caching. Defaults to `config.cache`.

### save

`void function(string path, bool asyncMode?)` creates and saves the renderer to the cache.

`string path` is the absolute path to the template.

`bool asyncMode` is the option to compile the template into a asynchronous function. Defaults to `false`.

## Template Class

### Static methods

`Template constructor(string raw, string name, string main)`
creates a `Template` instance with the raw template, the name and the main.

`Template Template.fromFile(string path)`
creates a `Template` instance with the content of the file at the path.

`Function Template.compileFile(string path)`
returns the compiled function with the content of the file at the path.

!> `path` is the absolute path.

### Properties

`string this.parser` is the parser that parses the raw template.

`string this.raw` is the raw template.

`string this.name` is the name of the template.

`string this.main` is the main of the template.

`string this.code` is the code of the template.

### Methods

`string this.tagEsc(string data)` is to escape text containing HTML tags. Replaces `<` and `>` by `&lt;` and `&gt;`.

`void this.include(string path)` is to include a partial template.

`void this.define(string name, any value)` is to define a constant with a value from compile time inside the render time context.

`void this.writeCode(string code)` is to write raw code during compilation.

`void this.generate()` is to the code from the raw template.

`Function this.compile(bool asyncMode)` is to create a function with the generated code.
