// Services
import EventService from "@Services/EventEmitter";

export enum ELang {
	EN = "en",
	FR = "fr",
}

export type TTranslation = Record<string, any>;

export default class I18nStore {
	private readonly _event = new EventService();

	private static _instance: I18nStore;
	private static readonly _defaultLng = ELang.EN;
	private static _lang: ELang = I18nStore._defaultLng;
	private _translations: TTranslation = {};

	private constructor() {
		I18nStore._instance = this;
		this.autoDetectAndSetLanguage();
	}

	public static getInstance() {
		if (!I18nStore._instance) new this();
		return I18nStore._instance;
	}

	public get lang() {
		return I18nStore._lang;
	}

	public set lang(lang: ELang) {
		I18nStore._lang = lang;
		this._event.emit("lang", lang);
	}

	public get translations() {
		return this._translations;
	}

	public set translations(translations: TTranslation) {
		this._translations = translations;
		this._event.emit("translation", translations);
	}

	public onLangChange(callback: (lang: ELang) => void) {
		this._event.on("lang", callback);
		return () => {
			this._event.off("lang", callback);
		};
	}

	public onTranslationChange(callback: (translation: TTranslation) => void) {
		this._event.on("translation", callback);
		return () => {
			this._event.off("translation", callback);
		};
	}

	public toggleLang() {
		this.lang = this.lang === ELang.EN ? ELang.FR : ELang.EN;
		this.loadTranslationFile();
	}

	private loadTranslationFile() {
		const translations = require(`src/configs/i18n/${this.lang}.json`);
		this.translations = translations;
	}

	private autoDetectAndSetLanguage() {
		// LocalStorage is not available on server side
		// so we need to check if we are on the client side
		// before trying to access it
		if (typeof window === "undefined") return;

		// Get the language from local storage or the browser
		// and split it to get the first part
		// (ex: fr-FR => fr)
		const lng = window.navigator.language.split("-")[0]!;

		// Check if the language is supported
		// If the language is not supported, set the default language
		Object.values(ELang).includes(lng as ELang)
			? (this.lang = lng as ELang)
			: (this.lang = I18nStore._defaultLng);

		// Load the translation file
		this.loadTranslationFile();
	}
}
