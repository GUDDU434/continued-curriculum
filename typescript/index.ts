function sum(a: number, b: number): number {
  return a + b;
}

// console.log(sum(1, 2));

const a: number = 1;

const b: boolean = false;
const c: string = "hello";

const d: number[] = [1, 2, 3];
const e: [number, number, number] = [1, 2, 3];

// enum
enum Roles {
  superAdmin = "Super Admin",
  admin = "Admin",
  user = "User",
}

// Roles.superAdmin="Super Admin";  // cannot reassign, because it is a read-only property

// objects

const user: {
  name: string;
  age: number;
  email: string;
  role: Roles;
} = {
  name: "John",
  age: 20,
  email: "Ht9o7@example.com",
  role: Roles.superAdmin,
};

type obj = {
  name: string;
  age: number;
  email?: string; // ! optional Types ?
};

const user2: obj = {
  name: "John",
  age: 20,
  email: "Ht9o7@example.com",
};

// Unions

type genderType = "male" | "female" | "Other";

function isFemale(gender: genderType) {
  if (gender === "female") {
    return true;
  } else {
    return false;
  }
}

// isFemale("lsdjfl");
isFemale("female");
