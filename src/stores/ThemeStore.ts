// Services
import EventService from "@Services/EventEmitter";

export enum EThemeMode {
	LIGHT = "light",
	DARK = "dark",
}

export default class ThemeModeStore {
	private readonly event = new EventService();
	private static instance: ThemeModeStore;

	private _mode: EThemeMode = EThemeMode.LIGHT;

	private constructor() {
		ThemeModeStore.instance = this;
	}

	public static getInstance() {
		if (!ThemeModeStore.instance) return new this();
		return ThemeModeStore.instance;
	}

	public get mode() {
		return this._mode;
	}

	public set mode(mode: EThemeMode) {
		this._mode = mode;
		localStorage.setItem("theme-mode", this.mode);
		document.body.setAttribute("theme-mode", mode);
		this.event.emit("switch-theme-mode", this.mode);
	}

	public onSwitch(callback: (mode: EThemeMode) => void) {
		this.event.on("switch-theme-mode", callback);
		return () => {
			this.event.off("switch-theme-mode", callback);
		};
	}

	public toggle() {
		this.switch(this.mode === EThemeMode.DARK ? EThemeMode.LIGHT : EThemeMode.DARK);
	}

	public switch(mode: EThemeMode) {
		if (mode === this.mode) return;
		this.mode = mode;
	}

	public init() {
		const mode =
			(localStorage.getItem("theme-mode") as EThemeMode) ?? EThemeMode.LIGHT;
		document.body.setAttribute("theme-mode", mode);
		this.switch(mode);
	}
}
