import { useCallback, useEffect, useState } from "react";
import classNames from "classnames";

// Stores
import ThemeModeStore, { EThemeMode } from "@Stores/ThemeStore";

// Icons
import { FaMoon } from "react-icons/fa";
import { IoSunnySharp } from "react-icons/io5";

// Styles
import classes from "./classes.module.scss";

export default function ThemeModeSwitcher() {
	const [mode, setMode] = useState(ThemeModeStore.getInstance().mode);

	useEffect(() => ThemeModeStore.getInstance().onSwitch((mode) => setMode(mode)), []);

	const onClick = useCallback(() => ThemeModeStore.getInstance().toggle(), []);

	return (
		<button
			className={classNames(classes["root"], {
				[classes["light"]!]: mode === EThemeMode.LIGHT,
			})}
			onClick={onClick}>
			<div
				className={classNames(classes["handle"], {
					[classes["light"]!]: mode === EThemeMode.LIGHT,
				})}
			/>
			{mode === EThemeMode.LIGHT && (
				<IoSunnySharp className={classNames(classes["icon"], classes["sun"])} />
			)}
			{mode === EThemeMode.DARK && (
				<FaMoon className={classNames(classes["icon"], classes["moon"])} />
			)}
		</button>
	);
}
