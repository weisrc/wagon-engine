# Plugins

## Binder

Binder is a plugin that adds a new method `this.binder` which returns a `Binder` instance. Binder is very useless on its own, but it opens the door for seemless server-client connection.

### Installation

```shs
npm i wge-binder
```

### Sample

```html
<script %>
  const binder = this.binder();
  let btn = binder.element();
  btn.on("click", (e) => {
    // will log on the client
    console.log("Hello, you clicked me.");
  });
</script>
<button {btn.id}></button>
<script _>
  binder.open();
</script>
```

## Style

Style creates css styles with Javascript objects at compile time. `this.style(object)`

### Installation

```sh
npm i wge-style
```

### Sample

```html
<script %>
  const style = this.style({
    color: "blue",
  });
</script>
<button {style}>I am blue!</button>
```
