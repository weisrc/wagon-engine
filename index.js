const nPath = require("path");

function save(path, asyncMode = false) {
  let norm = nPath.normalize(path);
  if (asyncMode) wge.cache["async:" + norm] = wge.Template.compileFile(norm, true);
  else wge.cache[norm] = wge.Template.compileFile(norm);
}

function render(path, data, cache = wge.config.cache) {
  let norm = nPath.normalize(path);
  if (wge.cache[norm]) return wge.cache[norm](data);
  let renderer = wge.Template.compileFile(norm);
  if (cache) wge.cache[norm] = renderer;
  return renderer(data);
}

async function asyncRender(path, data, cache = wge.config.cache) {
  let norm = nPath.normalize(path);
  if (wge.cache["aysnc:" + norm]) return await wge.cache[norm](data);
  let renderer = wge.Template.compileFile(norm, true);
  if (cache) wge.cache["async:" + norm] = renderer;
  return await renderer(data);
}

const wge = {
  cache: {},
  config: { cache: true },
  Template: require("./template"),
  save,
  render,
  asyncRender,
};

module.exports = wge;
