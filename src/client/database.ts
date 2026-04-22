import { open, type RootDatabase } from "lmdb"

export async function createDatabaseClient(): Promise<RootDatabase> {
	const database = open("data-broker", {
		compression: true,
	})

	return database
}
