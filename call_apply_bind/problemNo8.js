let p1 = {
  name: "Raju",
  age: 22,
};

function personInfo() {
  console.log("name:", this.name, "and my age is", this.age);
}

personInfo.call(p1);
