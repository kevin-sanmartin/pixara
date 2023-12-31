"use client";

// Components
import Typography, {
	ETypographyColor,
	ETypographyType,
	ETypographyWeight,
} from "@Components/Elements/Typography";
import I18n from "@Components/Materials/I18n/I18n";

// Styles
import classes from "./classes.module.scss";

export default function Home() {
	return (
		<main className={classes["root"]}>
			<Typography
				type={ETypographyType.P}
				weight={ETypographyWeight.Semibold}
				color={ETypographyColor.Primary}>
				<I18n map="common.hello" vars={{ name: "Kévin" }} />
			</Typography>
		</main>
	);
}
