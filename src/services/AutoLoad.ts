import ThemeModeStore from "@Stores/ThemeStore";

/**
 * Service that will automatically instanciate other services on load
 */
export default class AutoLoadService {
	private static instance: AutoLoadService;

	private constructor() {}

	public static async load() {
		if (!AutoLoadService.instance) {
			const instance = new this();
			await instance.init();
			AutoLoadService.instance = instance;
		}
	}

	private async init() {
		ThemeModeStore.getInstance().init();
	}
}
