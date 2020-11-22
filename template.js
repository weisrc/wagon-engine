const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const nodepath = require("path");
const fs = require("fs");
const { rules, Rule } = require("./rules");

class Template {
  constructor(raw, name, main) {
    this.parser = new Rule({ start: "", end: "$", nested: rules });
    this.raw = raw;
    this.name = name;
    this.vars = {
      html: "$html",
      main: "$main",
      code: "$code",
      data: "data",
    };
    this.main = main;
    this.code = "";
    this.parser.map = ({ nested }) => {
      let res = [];
      let acc = "";
      let flat = nested.flat(64);
      for (let e of flat)
        if (typeof e === "string") acc += e;
        else {
          if (acc) res.push(acc);
          acc = "";
          res.push(e);
        }
      if (acc) res.push(acc);
      for (let e of res) {
        if (typeof e === "string") this.code += `${this.vars.html} += "${e.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/"/g, '\\"')}"\n`;
        else if (e.block[0] == "@") new Function(e.block.slice(1)).apply(this);
        else if (e.block[0] == "%") this.code += e.block.slice(1) + "\n";
        else if (e.block[0] == "#") this.code += e.block.slice(1) + "\n{\n";
        else if (e.block[0] == ":") this.code += "\n}\n" + e.block.slice(1) + "\n{\n";
        else if (e.block[0] == "/") this.code += "\n}\n";
        else this.code += `${this.vars.html} += ${e.block}\n`;
      }
      return this.code;
    };
  }
  include(path) {
    let full = path.startsWith("./") ? nodepath.resolve(nodepath.dirname(this.name), path) : nodepath.normalize(path);
    let template = Template.fromFile(full, full, this.main);
    template.generate();
    this.code += template.code;
  }
  define(varname, value) {
    this.code += `const ${varname} = ${JSON.stringify(value)}\n`;
  }
  add(code) {
    this.code += code;
  }
  generate() {
    this.parser.parse(this.raw);
  }
  compile(asyncMode) {
    this.generate();
    let code = "";
    code += `let ${this.vars.html} = ""\n`;
    code += `const ${this.vars.main} = ${JSON.stringify(this.main)}\n`;
    code += `const ${this.vars.code} = ${JSON.stringify(this.code)}\n`;
    code += this.code + "\n";
    code += `return ${this.vars.html}`;
    let args = [this.vars.data, code];
    if (asyncMode) return new AsyncFunction(...args);
    else return new Function(...args);
  }
  static fromFile(path) {
    let full = nodepath.normalize(path);
    return new this(fs.readFileSync(full, { encoding: "utf8" }), full, full);
  }
  static compileFile(path, asyncMode) {
    return this.fromFile(path).compile(asyncMode);
  }
}

module.exports = Template;
