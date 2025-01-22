//Numeric Types:
const age: number = 25;
// const largeNumber: bigint = 9007199254740991n;

// String Type:

// let name: string = "John Doe";

// Boolean Type:
const isStudent: boolean = true;

// Array Types:

const scores: number[] = [85, 90, 95];
const colours: string[] = ["red", "green", "blue"];
const answers: boolean[] = [true, false, true];

// Tuple Type:
const person: [string, number] = ["John Doe", 25];

// Enum Type:

enum Direction {
  North,
  East,
  South,
  West,
}

const currentDirection: Direction = Direction.North;

// Any Type:
const randomValue: any = "Hello";

// Void Type:
function logMessage(message: string): void {
  console.log(message);
}

// Null and Undefined Types:
const emptyValue: null = null;
const notAssigned: undefined = undefined;

// Function Declarations:
function add(a: number, b: number): number {
  return a + b;
}

// Object Types:
type Person = {
  name: string;
  age: number;
};

const user1: Person = {
  name: "John Doe",
  age: 25,
};

interface Car {
  make: string;
  model: string;
  year: number;
}

const car1: Car = {
  make: "Toyota",
  model: "Camry",
  year: 2022,
};
