class Person {
  constructor(name) {
    this.name = name;
  }

  sayName() {
    return `My name is ${this.name} :)`;
  }
}

module.exports = {
  Person,
};
