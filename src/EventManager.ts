import {
	type BoxRenderable,
	type CliRenderer,
	type KeyEvent,
} from "@opentui/core"
import { welcomeScreen } from "./pages/welcome"
import { guideScreen } from "./pages/guide"
import type { RootDatabase } from "lmdb"
import { taskScreen } from "./pages/task"
import { marketScreen } from "./pages/market"
import { completeScreen } from "./pages/complete"
import { terminateScreen } from "./pages/terminate"

export class EventManger {
	state: BoxRenderable | null

	constructor(
		public client: CliRenderer,
		public database: RootDatabase
	) {
		this.client = client
		this.database = database
		this.state = null
	}

	async onReady() {
		await this.database.put("credits", 500)
		await this.database.put("rep", 100)
		await this.database.put("target", "")
		await this.database.put("tags", "")
		await this.database.put("found", "")

		this.state = welcomeScreen(this.client)
		this.client.root.add(this.state)
	}

	async onKeyPress() {
		const keyhandler = this.client.keyInput

		keyhandler.on("keypress", async (key: KeyEvent) => {
			const cred = await this.database.get("credits")
			const rep = await this.database.get("rep")

			if (cred < 0 || rep <= 0) {
				this.client.root.remove(this.state!.id)
				this.state = await terminateScreen(this.client, this.database)
				this.client.root.add(this.state)
			}

			if (key.name == "space") {
				if (this.state!.id == "welcome") {
					this.client.root.remove("welcome")
					this.state = guideScreen(this.client)
					this.client.root.add(this.state)
				} else if (this.state!.id == "guide") {
					this.client.root.remove("guide")
					this.state = await taskScreen(this.client, this.database)
					this.client.root.add(this.state)
				} else if (this.state!.id == "task") {
					this.client.root.remove("task")
					this.state = await marketScreen(this.client, this.database)
					this.client.root.add(this.state)
				} else if (this.state!.id == "complete") {
					this.client.root.remove("complete")
					this.state = await taskScreen(this.client, this.database)
					this.client.root.add(this.state)
				}
			} else if (key.name == "s") {
				if (this.state!.id == "market") {
					this.client.root.remove("market")
					this.state = await completeScreen(this.client, this.database)
					this.client.root.add(this.state)
				}
			}
		})
	}

	public async bootstrap() {
		await this.onReady()
		await this.onKeyPress()
	}
}
