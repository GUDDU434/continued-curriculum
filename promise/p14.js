function HTMLElements(str) {
  const VALID = new Set(["b", "i", "em", "div", "p"]);
  const stack = [];

  // Split out tags vs. text
  const tokens = str.split(/(<[^>]*>)/).filter((t) => t);

  for (const tok of tokens) {
    let m;

    // opening tag?
    if ((m = tok.match(/^<([a-z]+)>$/))) {
      const tag = m[1];
      if (VALID.has(tag)) {
        stack.push(tag);
      }

      // closing tag?
    } else if ((m = tok.match(/^<\/([a-z]+)>$/))) {
      const tag = m[1];
      if (VALID.has(tag)) {
        if (stack.length && stack[stack.length - 1] === tag) {
          // properly matched, pop it
          stack.pop();
        } else {
          // mismatch: the last open tag is the one you'd need to change
          return stack[stack.length - 1];
        }
      }
    }
    // otherwise it's text content — ignore
  }

  // if nothing left open, it's all good
  return stack.length === 0 ? "true" : stack[stack.length - 1];
}

// -- Examples:

console.log(HTMLElements("<div><b><p>hello world</p></b></div>"));
// → "true"

console.log(HTMLElements("<div><i>hello</i>world</b>"));
// → "div"

console.log(HTMLElements("<div><div><b></b></div></p>"));
// → "div"

console.log(
  HTMLElements("<div>abc</div><p><em><i>test test test</b></em></p>")
);
// → "i"
