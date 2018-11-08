export class Observable {
	constructor() {
		this.observers = [];  
	}
	subscribe(obj) {
		return this.observers.push(obj);
	}
	notify(...args) {
		for (const observer of this.observers) {
			observer.notify(this, ...args);
		}
	}
}
  
export class Observer {
	constructor(observable) {
		observable.add(this);
	}
	notify(observable, ...args) {
		[...args].forEach((arg) => {
			this.notifyFn(arg);
		});
	}
	notifyFn(arg) {
		console.log(arg);
	}
}

