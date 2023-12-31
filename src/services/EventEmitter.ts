import Events from "events";

export default class EventEmitter extends Events {
	public constructor() {
		super();

		this.setMaxListeners(0);
	}
}
