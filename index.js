const nPath = require("path");

const wge = {
  cache: {},
  config: { cache: true },
  Template: require("./template"),
};

wge.save = function (path, asyncMode = false) {
  let norm = nPath.normalize(path);
  if (asyncMode) wge.cache["async:" + norm] = wge.Template.compileFile(norm, true);
  else wge.cache[norm] = wge.Template.compileFile(norm);
};

wge.render = function (path, data, cache = wge.config.cache) {
  let norm = nPath.normalize(path);
  if (wge.cache[norm]) return wge.cache[norm](data);
  let renderer = wge.Template.compileFile(norm);
  if (cache) wge.cache[norm] = renderer;
  return renderer(data);
};

wge.asyncRender = async function (path, data, cache = wge.config.cache) {
  let norm = nPath.normalize(path);
  if (wge.cache["aysnc:" + norm]) return await wge.cache[norm](data);
  let renderer = wge.Template.compileFile(norm, true);
  if (cache) wge.cache["async:" + norm] = renderer;
  return await renderer(data);
};

module.exports = wge;
