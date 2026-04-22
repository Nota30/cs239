import { Tags } from "./tags"

export const sources = [
	{
		name: "Public Records",
		maxPrice: 10,
		minPrice: 5,
		tags: [
			Tags.ADDRESS,
			Tags.PHONE,
			Tags.EMAIL,
			Tags.AGE,
			Tags.MARRIED,
			Tags.NAME,
		],
		source: ["County clerk", "Voter roll", "Utility company", "Court docket"],
		facts: [
			"Courts, county officials, and govenmental agencies usually make all your information public. Any court rulings, judgements, marriage/divorce filings, licenses, etc.. An example is the PACER system which provides electronic access to over a billion court documents to everyone.",
		],
	},
	{
		name: "Voter Registration",
		maxPrice: 20,
		minPrice: 10,
		tags: [Tags.REGISTERED, Tags.PARTY],
		source: ["State voter roll"],
		facts: [
			'Quotes from the United States Election Assistance Commission (eac.gov). "there is a great deal of voter information available to either anyone who wants to purchase it". "The price, availability, and type of data in the voter file varies state-by-state. The price of the statewide voter file ranges from $0 to $37,000"',
		],
	},
	{
		name: "DMV Records",
		maxPrice: 20,
		minPrice: 15,
		tags: [Tags.VEHICLE, Tags.DRIVER],
		source: ["State DMV"],
		facts: [
			"According to the Indiana BMV, several entities have paid over $50,000 for bulk data. This includes companies like: Auto Data Direct, Datalink, Explore Information, Hire Right, Insurance Info, LexisNexis, Safety Holdings, and TML. The BMV has also suspended more than 200 companies for violating the terms of their state contracts regarding data sharing.",
		],
	},
	{
		name: "Property Records",
		maxPrice: 20,
		minPrice: 30,
		tags: [Tags.PROPERTY, Tags.LOANS],
		source: ["County assesor"],
		facts: [
			"Deeds, morgages and other property data are public by design so that your title can be verified. Companies like Zillow scrape this data in bulk.",
		],
	},
	{
		name: "Browsing Data",
		maxPrice: 20,
		minPrice: 30,
		tags: [Tags.BROWSER, Tags.IP],
		source: ["ISP, Websites"],
		facts: [
			"The FCC fined Verizon, T-Mobile and AT&T in 2024 for selling real time location information to data brokers. Websites also use a process called RTB which stands for real-time bidding which a is a lightning fast process under 100ms that sells user data for ad space",
		],
	},
	{
		name: "Social Media",
		maxPrice: 15,
		minPrice: 30,
		tags: [Tags.FOLLOWERS, Tags.POST],
		source: ["Meta", "Twitter", "LinkedIN"],
		facts: [
			"Public posts, profile phots and friends list can be scraped at scale. A company called Clearview AI built a face recognition app that was built on this data and finds all public pictures of you.",
		],
	},
	{
		name: "Location Data",
		maxPrice: 40,
		minPrice: 50,
		tags: [Tags.LOCATION],
		source: ["Life360"],
		facts: [
			"In 2021 Life360 was found to be selling data such as precise location of its users who are largely families and kids.",
		],
	},
	{
		name: "Financial Data",
		maxPrice: 50,
		minPrice: 60,
		tags: [Tags.CREDIT, Tags.SSN, Tags.LOANS],
		source: ["Experian", "Equifax", "TransUnion"],
		facts: [
			"Credit bureaus can share credit header data to anyone. The credit header data can contain a partal ssn number, credit scores, name, and addresses.",
		],
	},
	{
		name: "Shopping Data",
		maxPrice: 50,
		minPrice: 60,
		tags: [Tags.SHOPPING],
		source: ["Walmart", "Target", "Meijer"],
		facts: [
			"Loyalty cards are used to collect customer data and sell information. Walmart doesn't accept apple pay because it loses out on customer data.",
		],
	},
	{
		name: "Health Data",
		maxPrice: 70,
		minPrice: 100,
		tags: [Tags.HEALTH],
		source: ["Better Health", "Smart Watch"],
		facts: [
			"Companies like better health were found selling their patients health information. Smart watches and health apps can collect data regarding you and sell them.",
		],
	},
]
