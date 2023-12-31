import React, { PropsWithChildren } from "react";
import classNames from "classnames";

// Styles
import classes from "./classes.module.scss";

// Enums
export enum ETypographyType {
	H1 = "h1",
	H2 = "h2",
	H3 = "h3",
	H4 = "h4",
	H5 = "h5",
	H6 = "h6",
	P = "p",
}

export enum ETypographySize {
	Large = "large",
	Medium = "medium",
	Small = "small",
	XSmall = "xsmall",
}

export enum ETypographyWeight {
	Bold = "bold",
	Semibold = "semibold",
	Medium = "medium",
	Extrabold = "extrabold",
	Regular = "regular",
}

export enum ETypographyColor {
	Primary = "primary",
	Error = "error",
	Warning = "warning",
	Success = "success",
	Neutral = "neutral",
}

type IProps = PropsWithChildren & {
	type: ETypographyType;
	size?: ETypographySize;
	weight?: ETypographyWeight;
	color?: ETypographyColor;
	className?: string;
};

export default function Typography(props: IProps) {
	const size = props.size ?? "medium";
	const weight = props.weight ?? "regular";
	const color = props.color ?? "primary";

	return React.createElement(
		props.type,
		{
			className: classNames(
				classes["root"],
				classes[props.type],
				classes[`size-${size}`],
				classes[`weight-${weight}`],
				classes[`color-${color}`],
				props.className,
			),
		},
		props.children,
	);
}
