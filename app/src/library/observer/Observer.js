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
		// eslint-disable-next-line no-console
		console.log(arg);
	}
}