import {
	ASCIIFontRenderable,
	BoxRenderable,
	CliRenderer,
	TextRenderable,
} from "@opentui/core"

export function welcomeScreen(client: CliRenderer) {
	const box = new BoxRenderable(client, {
		id: "welcome",
		border: true,
		borderColor: "#DE3163",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
	})

	const title = new ASCIIFontRenderable(client, {
		text: "DATA-BROKER",
		paddingBottom: 20,
		font: "huge",
		color: "#DE3163",
	})

	const description = new TextRenderable(client, {
		content:
			"Collecting data since 2026 :)\n\nPress CTRL + C to quit anytime\n",
		fg: "#888888",
	})

	const next = new TextRenderable(client, {
		content: "Press the space key to continue...",
		fg: "#444444",
	})

	box.add(title)
	box.add(description)
	box.add(next)

	return box
}
