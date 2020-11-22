let userR = require("./template").compileFile(__dirname + "/test.html");

console.log(
  userR({
    m: "123",
  })
);
