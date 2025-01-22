"use strict";
function sum(a, b) {
    return a + b;
}
// console.log(sum(1, 2));
const a = 1;
const b = false;
const c = "hello";
const d = [1, 2, 3];
const e = [1, 2, 3];
// enum
var Roles;
(function (Roles) {
    Roles["superAdmin"] = "Super Admin";
    Roles["admin"] = "Admin";
    Roles["user"] = "User";
})(Roles || (Roles = {}));
console.log(Roles.superAdmin);
