# CS 239 Final Project
### data-broker app
This CLI application built with BunJS and Typescript that lets you play as a data-broker where you recieve tasks and find the required information with not-so-fun-facts.

## Installing Bun
Visit [bun's website](https://bun.com/) to install bun on your system.

Installation scripts provided on bun's website:
#### Linux/macOS
```bash
curl -fsSL https://bun.sh/install | bash
```
#### Windows
```ps1
powershell -c "irm bun.sh/install.ps1 | iex"
```

## Installing dependencies
```bash
bun install
```

## Running the project
```bash
bun start
```
or
```bash
bun run src/index.ts
```

## Project Structure
> All files are in the `src` directory. The `client` directory contains the client to render the terminal view and the client to open a new database connection. The `data` directory contains the random user generation, facts, and data used in this project. The `pages` directory contains each page/state that the app switches to. The `EventManager.ts` file handles the events/keypress and onready functions. 

## Notes
- This project was built for my Final project in my CS 239 class.
- No AI was used in writing code in this project.
- [OpenTUI](https://opentui.com/) was used to build this project.
- [LMDB](https://en.wikipedia.org/wiki/Lightning_Memory-Mapped_Database) is used as a small database.
- Sources for not-so-fun-facts: [Link](http://themarkup.org/privacy/2023/06/01/life360-sued-for-selling-location-data), [Link](https://www.experian.com/blogs/news/2024/10/01/credit-header-data-an-indispensable-tool-to-combatting-fraud/), [Link](https://www.reddit.com/r/technology/comments/1ipi7cg/allstate_slammed_with_lawsuit_after_scheme_to_spy/), [Link](https://www.nytimes.com/2020/01/18/technology/clearview-privacy-facial-recognition.html), [Link](https://www.reuters.com/business/media-telecom/fcc-fines-us-wireless-carriers-nearly-200-million-over-illegal-location-data-2024-04-29/), [Link](https://www.ftc.gov/system/files/documents/reports/look-what-isps-know-about-you-examining-privacy-practices-six-major-internet-service-providers/p195402_isp_6b_staff_report.pdf), [Link](https://www.vice.com/en/article/data-brokers-netflow-data-team-cymru/), [Link](https://pacer.uscourts.gov/), [Link](https://www.eac.gov/sites/default/files/voters/Available_Voter_File_Information.pdf), [Link](http://wrtv.com/news/wrtv-investigates/indiana-bmv-explains-why-it-sells-driver-data)
