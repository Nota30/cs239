// interface User {
// 	name: string
// 	address: string
// 	phone: string
// 	email: string
// 	age: number
// 	ssn: string
// 	married: boolean
// 	registered: boolean
// 	party: "X Party" | "Y Party" | "Z Party"
// 	vehicle: string[]
// 	driver: string[]
// 	property: string[]
// 	browser: string[]
// 	ip: string
// 	followers: string[]
// 	posts: string[]
// 	location: string[]
// 	credit: number
// 	shopping: string[]
// 	loans: string[]
// 	health: string[]
// }

export interface User {
	name: {
		first: string | undefined
		last: string | undefined
	}
	location: {
		city: string | undefined
		state: string | undefined
	}
	dob: {
		age: number | undefined
	}
}

interface Body {
	results: User[]
}

export async function getRandomUser(): Promise<User> {
	const response = await fetch("https://randomuser.me/api/?nat=us")

	const body: Body = (await response.json()) as Body

	const data: User = {
		name: {
			first: body.results[0]?.name.first,
			last: body.results[0]?.name.last,
		},
		location: {
			city: body.results[0]?.location.city,
			state: body.results[0]?.location.state,
		},
		dob: {
			age: body.results[0]?.dob.age,
		},
	}

	return data
}
