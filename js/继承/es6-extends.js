class Parent {
	constructor(name) {
		this.name = name;
        this.colors = ['red', 'blue', 'green'];
    }
    getName () {
        console.log(this.name)
    }
}
class Child extends Parent {
	constructor(name,age) {
        super(name)
        this.age = age
	}
}

// test
const c = new Child("hello", 18)
c.getName()