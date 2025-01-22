class PersonClass {
  name: string;
  age: number;
  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

class Student extends PersonClass {
  studentId: number;
  course: string;
  semester: number;
  constructor(
    studentId: number,
    course: string,
    semester: number,
    name: string,
    age: number,
    email: string
  ) {
    super(name, age);
    this.studentId = studentId;
    this.course = course;
    this.semester = semester;
  }
}

class Staff extends PersonClass {
  staffId: number;
  department: string;
  position: string;
  constructor(
    staffId: number,
    department: string,
    position: string,
    name: string,
    age: number,
    email: string
  ) {
    super(name, age);
    this.staffId = staffId;
    this.department = department;
    this.position = position;
  }
}
