function parseRE(re) {
  if (re instanceof RegExp) return new RegExp("^" + re.source, "s");
  else if (typeof re === "string") return new RegExp("^" + re, "s");
}
function Rule(options) {
  const { start, end, nested = [], chained = [], map = (res) => res } = options;
  this.start = parseRE(start);
  this.end = parseRE(end);
  this.nested = nested.map((v) => (v === Rule.SELF ? this : v));
  this.chained = chained.map((v) => (v === Rule.SELF ? this : v));
  this.map = map;
}
Rule.NONE = Symbol("Rule.NONE");
Rule.SELF = Symbol("Rule.SELF");
Rule.prototype.parse = function (s, c = { i: 0 }) {
  let start = s.slice(c.i).match(this.start);
  if (!start) return Rule.NONE;
  let i0 = c.i,
    i1 = (c.i += start[0].length),
    i2,
    i3,
    end,
    nested = [];
  if (this.end)
    while (s[c.i]) {
      if ((end = s.slice(c.i).match(this.end))) {
        i2 = c.i;
        i3 = c.i += end[0].length;
        break;
      }
      for (let rule of this.nested) {
        let res = rule.parse(s, c);
        if (res !== Rule.NONE) {
          nested.push(res);
          break;
        }
      }
    }
  return this.map({ i: [i0, i1, i2, i3], start, end, nested });
};

let char = new Rule({
  start: "(.)",
  map: ({ start }) => start[1],
});

let escapeChar = new Rule({
  start: /\\(.)/,
  map: ({ start }) => "\\" + start[1],
});

let strings = ['"', "'", "`"].map(
  (t) =>
    new Rule({
      start: t,
      end: t,
      nested: [escapeChar, char],
      map: ({ nested }) => t + nested.join("") + t,
    })
);

let _block = new Rule({
  start: "___",
  end: "___",
  nested: [char],
  map: ({ nested }) => ({ block: nested.join("").replace(/_/g, ".") }),
});

let attributes = ["'", '"'].map(
  (t) =>
    new Rule({
      start: t,
      end: t,
      nested: [_block, escapeChar, char],
      map: ({ nested }) => [t, nested, t],
    })
);

let htmlComment = new Rule({
  start: "<!--",
  end: "-->",
  nested: [char],
  map: ({ nested }) => "<!--" + nested.join("") + "-->",
});

let comments = [
  new Rule({
    start: /\/\*/,
    end: /\*\//,
    nested: [char],
    map: () => Rule.NONE,
  }),
  new Rule({
    start: /\/\//,
    end: /[\r\n]+/,
    nested: [char],
    map: () => Rule.NONE,
  }),
];

let nestedBlock = new Rule({
  start: "\\{",
  end: "\\}",
  nested: [...comments, Rule.SELF, ...strings, char],
  map: ({ nested }) => "{" + nested.join("") + "}",
});

let block = new Rule({
  start: "\\{",
  end: "\\}",
  nested: [...comments, nestedBlock, ...strings, char],
  map: ({ nested }) => ({ block: nested.join("") }),
});

let script = new Rule({
  start: "<script",
  end: "</script>",
  nested: [_block, ...comments, ...strings, char],
  map: ({ nested }) => ["<script", nested, "</script>"],
});

let tagOpen = new Rule({
  start: "<\\w+",
  end: ">",
  nested: [...attributes, char],
  map: ({ nested, start }) => [start[0], nested, ">"],
});

module.exports = {
  rules: [htmlComment, script, tagOpen, block, char],
  Rule,
};
