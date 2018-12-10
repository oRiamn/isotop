export class Observable {
	constructor() {
		this.observers = [];
	}
	subscribe(obj) {
		return this.observers.push(obj);
	}
	unsubscribe(obj) {
		this.observers = this.observers.filter((observer) =>{
			return observer !== obj;
		});
	}
	notify(...args) {
		for (const observer of this.observers) {
			observer.notify(this, ...args);
		}
	}
}