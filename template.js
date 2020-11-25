const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;
const nPath = require("path");
const fs = require("fs");
const { rules, Rule } = require("./rules");
const utils = require("./utils");
function Template(raw, name, main) {
  this.parser = new Rule({ start: "", end: "$", nested: rules });
  this.raw = raw;
  this.name = name;
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
      if (typeof e === "string") this.code += `self.html += "${e.replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/"/g, '\\"')}"\n`;
      else if (e.block[0] == "@") new Function(e.block.slice(1)).apply(this);
      else if (e.block[0] == "%") this.code += e.block.slice(1) + "\n";
      else if (e.block[0] == "#") this.code += e.block.slice(1).trim().replace(/;$/, "") + "\n{\n";
      else if (e.block[0] == ":") this.code += "\n}\n" + e.block.slice(1) + "\n{\n";
      else if (e.block[0] == "/") this.code += "\n}\n";
      else this.code += `self.html += ${e.block}\n`;
    }
    return this.code;
  };
}
Template.prototype.tagEsc = (string) => string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
Template.prototype.include = function (path) {
  let norm = path.startsWith("./") ? nPath.resolve(nPath.dirname(this.name), path) : nPath.normalize(path);
  let template = Template.fromFile(norm, norm, this.main);
  template.generate();
  this.code += template.code;
};
Template.prototype.define = function (varname, value) {
  this.code += `const ${varname} = ${JSON.stringify(value)}\n`;
};
Template.prototype.writeCode = function (code) {
  this.code += code;
};
Template.prototype.generate = function () {
  this.parser.parse(this.raw);
};
Template.prototype.compile = function (asyncMode) {
  this.generate();
  let code = "";
  code += `const self = ${JSON.stringify({
    html: "",
    main: this.main,
    code: this.code,
    raw: this.raw,
  })}\n`;
  code += this.code + "\n";
  code += `return self.html`;
  let args = ["data", code];
  if (asyncMode) return new AsyncFunction(...args).bind(this);
  else return new Function(...args).bind(this);
};
Template.fromFile = function (path) {
  let norm = nPath.normalize(path);
  return new this(fs.readFileSync(norm, { encoding: "utf8" }), norm, norm);
};
Template.compileFile = function (path, asyncMode) {
  return this.fromFile(path).compile(asyncMode);
};

module.exports = Template;
