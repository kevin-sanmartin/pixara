"use client";
import React, { useCallback, useEffect, useState } from "react";

// Stores
import I18nStore from "@Stores/I18n";

type IProps = {
	map: string;
	vars?: Record<string, any>;
};

export default function I18n({ map, vars }: IProps) {
	const [value, setValue] = useState<string>("");

	const updateValue = useCallback(() => {
		let newValue: string = "";
		const keys = map.split(".");
		let translation = I18nStore.getInstance().translations;

		keys.forEach((key) => {
			if (typeof translation[key] === "string") {
				newValue = translation[key];
				return;
			}
			translation = translation[key];
		});

		if (vars) {
			Object.keys(vars).forEach((key) => {
				newValue = newValue.replace(`{{${key}}}`, vars[key]);
			});
		}

		setValue(newValue);
	}, [map, vars]);

	useEffect(
		() => I18nStore.getInstance().onTranslationChange(updateValue),
		[updateValue],
	);
	useEffect(() => updateValue(), [updateValue]);

	return <span dangerouslySetInnerHTML={{ __html: value }} />;
}
