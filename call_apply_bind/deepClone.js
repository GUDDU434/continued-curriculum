function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

let originalObj = { name: "Alice", hobbies: ["reading", "traveling"] };
let clonedObj = deepClone(originalObj);
clonedObj.hobbies.push("coding"); // Modifying the cloned obj

console.log("Original:", originalObj);
console.log("Cloned:", clonedObj);
