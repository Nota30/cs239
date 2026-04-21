import { BoxRenderable, CliRenderer, TextRenderable } from "@opentui/core"
import type { RootDatabase } from "lmdb"

export function guideScreen(client: CliRenderer) {
	const outerBox = new BoxRenderable(client, {
		id: "guide",
		border: true,
		borderColor: "#DE3163",
		width: "100%",
		height: "100%",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		title: "HOW TO PLAY",
		titleAlignment: "left",
	})

	const innerBox = new BoxRenderable(client, {
		flexDirection: "column",
		alignItems: "flex-start",
	})

	const descriptionText = [
		"1. You are a data broker.",
		"2. You will recieve tasks from clients.",
		"3. The tasks are to find data on requested induviduals.",
		"4. If you accept you will be redirected to the data market.",
		"5. If you refuse you will lose reputation.",
		"6. You will be terminated if your reputation decreases to 0.",
		"7. You will recieve credits based on how well you find information.",
		"8. You will be terminated if your credits decreases to 0.",
		"9. You can use credits to aquire data regarding individuals.",
		"10. You will start with 500 credits and 100 reputation.",
		"11. GLHF :)",
	]

	for (let index = 0; index < descriptionText.length; index++) {
		innerBox.add(
			new TextRenderable(client, {
				content: descriptionText[index],
			})
		)
	}

	const movementText = [
		"\n\nMovement Keys:",
		"↑ / ↓      Navigate",
		"ENTER      Buy data",
		"S          Submit",
		"\n\nPress the space key to continue...",
	]

	for (let index = 0; index < movementText.length; index++) {
		innerBox.add(
			new TextRenderable(client, {
				content: movementText[index],
				fg: "#888888",
			})
		)
	}

	outerBox.add(innerBox)

	return outerBox
}
