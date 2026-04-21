export const Tags = {
	NAME: "name",
	ADDRESS: "address",
	PHONE: "phone",
	EMAIL: "email",
	AGE: "age",
	SSN: "social security number",
	MARRIED: "marriage",
	REGISTERED: "voter registration status",
	PARTY: "party affiliation",
	VEHICLE: "vehicle data",
	DRIVER: "driver data",
	PROPERTY: "property owned",
	BROWSER: "browser history",
	IP: "ip address",
	FOLLOWERS: "social media followers",
	POST: "social media posts",
	LOCATION: "precise location",
	CREDIT: "credit score",
	SHOPPING: "shopping history",
	LOANS: "loans taken",
	HEALTH: "health data",
}

export type TagKey = keyof typeof Tags

export function getRandomTags(): TagKey[] {
	const keys = Object.keys(Tags) as TagKey[]
	if (keys.length === 0) return []

	const count = Math.floor(Math.random() * keys.length) + 1

	const shuffled = [...keys]
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		;[shuffled[i], shuffled[j]] = [shuffled[j]!, shuffled[i]!]
	}

	return shuffled.slice(0, count)
}
