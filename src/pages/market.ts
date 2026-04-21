import {
	BoxRenderable,
	CliRenderer,
	KeyEvent,
	SelectRenderable,
	SelectRenderableEvents,
	TextRenderable,
	type SelectOption,
} from "@opentui/core"
import type { RootDatabase } from "lmdb"
import { sources } from "../data/sources"
import { Tags, type TagKey } from "../data/tags"

export async function marketScreen(
	client: CliRenderer,
	database: RootDatabase
) {
	const outerBox = new BoxRenderable(client, {
		id: "market",
		width: "100%",
		height: "100%",
		flexDirection: "column",
	})

	// ---------------------------------------------------- HEADER ---------------------------------------------------
	const header = new BoxRenderable(client, {
		border: true,
		borderColor: "#DE3163",
		width: "100%",
		height: 3,
		flexDirection: "row",
		title: "MARKET",
		titleAlignment: "left",
		alignItems: "center",
		justifyContent: "center",
	})

	const rep = await database.get("rep")
	const reputation = new TextRenderable(client, {
		content: `${rep}/100`,
		fg: "#888888",
	})

	const cred = await database.get("credits")
	const credits = new TextRenderable(client, {
		content: `$${cred}`,
		fg: "#888888",
	})

	header.add(
		new TextRenderable(client, {
			content: "Reputation: ",
			fg: "#888888",
		})
	)
	header.add(reputation)
	header.add(
		new TextRenderable(client, {
			content: "   |   Credits: ",
			fg: "#888888",
		})
	)
	header.add(credits)
	outerBox.add(header)

	// ---------------------------------------------------- BODY ---------------------------------------------------
	const body = new BoxRenderable(client, {
		width: "100%",
		flexGrow: 1,
		flexDirection: "row",
	})

	const dataPanel = new BoxRenderable(client, {
		border: true,
		borderColor: "#DE3163",
		width: 50,
		height: "100%",
		flexDirection: "column",
	})

	const options: SelectOption[] = []
	for (let index = 0; index < sources.length; index++) {
		const price =
			Math.floor(
				Math.random() *
					(sources[index]!.maxPrice - sources[index]!.minPrice + 1)
			) + sources[index]!.minPrice
		const name = `$${price}	${sources[index]!.name}`
		const data = {
			name,
			description: "",
			kind: "item",
			id: `${index}`,
			price: `${price}`,
		}
		options.push(data)
	}

	const selector = new SelectRenderable(client, {
		width: "100%",
		flexGrow: 1,
		showDescription: false,
		selectedTextColor: "#DE3163",
		showScrollIndicator: true,
		wrapSelection: false,
		options: options,
	})

	const detailsPanel = new BoxRenderable(client, {
		border: true,
		borderColor: "#DE3163",
		height: "100%",
		flexDirection: "column",
		flexGrow: 1,
	})

	const details = new TextRenderable(client, {
		content: `
		${sources[0]!.name}\n\n
		Data contained: ${sources[0]!.tags.join(", ")}\n\n 
		Source: ${sources[0]!.source[Math.floor(Math.random() * sources[0]!.source.length)]}`,
	})

	detailsPanel.add(details)
	detailsPanel.add(
		new TextRenderable(client, {
			content: "\n\n		[ENTER] to buy",
			fg: "#DE3163",
		})
	)

	body.add(dataPanel)
	body.add(detailsPanel)
	outerBox.add(body)

	const footer = new BoxRenderable(client, {
		width: "100%",
		height: 10,
		flexDirection: "column",
	})

	const tags: TagKey[] = (await database.get("tags")) as TagKey[]
	let tagString = ""
	for (let index = 0; index < tags.length; index++) {
		tagString += Tags[tags[index]!]
		tagString += ", "
	}

	footer.add(
		new TextRenderable(client, {
			content: `- Data to find:`,
			fg: "#888888",
		})
	)
	footer.add(
		new TextRenderable(client, {
			content: `${tagString}\n- Data found: `,
			fg: "#888888",
		})
	)

	const found = new TextRenderable(client, {
		content: "none",
		fg: "#888888",
	})

	footer.add(found)

	footer.add(
		new TextRenderable(client, {
			content: `\n[S] to submit`,
		})
	)

	selector.on(SelectRenderableEvents.SELECTION_CHANGED, (index, option) => {
		details.content = `
		${sources[option.id]!.name}\n\n
		Data contained: ${sources[option.id]!.tags.join(", ")}\n\n
		Source: ${sources[option.id]!.source[Math.floor(Math.random() * sources[option.id]!.source.length)]}`
	})

	const keyhandler = client.keyInput

	let dataFound = ""
	keyhandler.on("keypress", async (key: KeyEvent) => {
		if (key.name == "return") {
			const selectorOption = selector.getSelectedOption()!
			// @ts-ignore
			const balance = (await database.get("credits")) - selectorOption.price
			credits.content = `$${balance}`
			await database.put("credits", balance)
			// @ts-ignore
			dataFound += sources[selectorOption.id]!.tags.join(", ") + ", "
			found.content = dataFound

			const dbFound = await database.get("found")
			await database.put("found", dbFound + dataFound)
		}
	})

	outerBox.add(footer)

	selector.focus()

	dataPanel.add(selector)

	return outerBox
}
