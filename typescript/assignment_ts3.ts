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


const student1 = new Student(1, "Computer Science", 2, "John Doe", 25, "Ht9o7@example.com");

const staff1 = new Staff(1, "IT", "Manager", "Jane Smith", 30, "KX6b9@example.com");