# bih/hackone-chrome-extension

This is the Google Chrome extension for [HackOne](https://hackone.me) that I built.

Status: **Pre-alpha** (Expect major changes to the specification and codebase.)

### Specification

This covers everything under the `userData` scope that we ask for, and we share.

| Key | Description | Required |
| --- | ----------- | -------- |
| `.username` | The desired username. Example: `bilawalhameed` | Required |
| `.lastUpdated` | ISO-8601. Example: `Sun Oct 29 2017 18:11:51 GMT 0100 (CET)` | Required |
| `.bio.firstName` | The first name of the user. Example: `Bilawal` | Optional |
| `.bio.lastName` | The last name of the user. Example: `Hameed` | Optional |
| `.bio.gender` | The gender of the user. Options: `male`, `female`, `non_binary`, `n/a`, `other` | Optional |
| `.bio.email` | A fully qualified email address of the user. Example: `user@example.com` | Required |
| `.bio.phone` | A phone number of the user. Example: `+4601234567890` | Optional |
| `.bio.dietaryRestrictions` | The dietary restrictions of the user. Example: `No pork.` | Optional |
| `.bio.summary` | A self-written summary of the user. Example: `Developer Advocate Engineer at Spotify` | Optional |
| `.bio.location.city` | The city the user currently lives in. Example: `Stockholm` | Optional |
| `.bio.location.countryCode` | A ISO 3166-1 alpha-2 country code of the user. Example: `SE` | Required |
| `.bio.location.region` | The region the user currently lives in. Example: `Stockholm County` | Optional |
| `.bio.location.state` | The state the user currently lives in. Example: `Södermanland and Uppland` | Optional |
| `.bio.websites.personal` | The fully qualified personal website URL of the user. Example: `https://bilaw.al` | Optional |
| `.bio.websites.facebook` | The fully qualified Facebook profile URL of the user. | Optional |
| `.bio.websites.twitter` | The fully qualified Twitter profile URL of the user. | Optional |
| `.bio.websites.github` | The fully qualified GitHub profile URL of the user. | Optional |
| `.bio.websites.linkedin` | The fully qualified Linkedin profile URL of the user. | Optional |
| `.bio.websites.dribbble` | The fully qualified Dribbble profile URL of the user. | Optional |
| `.bio.websites.blog` | The fully qualified personal blog URL of the user. | Optional |
| `.bio.resume` | The fully qualified resume URL of the user. | Optional |
| `.bio.picture` | The fully qualified profile photo image URL of the user. | Optional |
| `.bio.education[].institution` | The educational institution of the user's studies. Example: `Manchester Metropolitan University` | Required |
| `.bio.education[].areas[]` | The focus areas of the user's studies. Example: `["Computer Science", "Human-Computer Interaction"]` | Optional |
| `.bio.education[].studyType` | The type of study of the user's studies. Example: `Bachelor of Science` | Optional |
| `.bio.education[].start` | The start year of the user's studies. Example: `2011` | Required |
| `.bio.education[].end` | The end year of the user's studies. Example: `2015` | Required |
| `.bio.work[].company` | The name of the company/organisation the user worked at. Example: `Spotify` | Required |
| `.bio.work[].position` | The position the user held at said company/organisation. | Required |
| `.bio.work[].start` | The start year of the user's work position. | Required |
| `.bio.work[].end` | The start year of the user's work position. If current, this can be `null`. | Optional |
| `.bio.work[].description` | A description of the work duties and requirements. | Optional |
| `.bio.hackathons[].name` | The name of the hackathon the user attended. | Required |
| `.bio.hackathons[].season` | The season the user attended said event. Example: `summer` | Optional |
| `.bio.hackathons[].year` | The year the user attended said event. | Optional |
| `.bio.hackathons[].awards[]` | A list of the awards/prizes user received from said event. | Optional |
| `.bio.hackathons[].project.name` | The name of the project built at said event. | Required |
| `.bio.hackathons[].project.link` | The link of the project built at said event. | Required |
| `.bio.hackathons[].project.image` | An image screenshot/example URL of the project built at said event. | Optional |
| `.bio.hackathons[].project.repository` | The repository URL of the project built at said event. | Optional |
| `.bio.hackathons[].project.description` | A description of the project built at said event. | Optional |
| `.bio.hackathons[].project.technologies[]` | A list of technologies used to build the project at said event. | Optional |
| `.bio.projects[].name` | The name of the project. | Optional |
| `.bio.projects[].description` | A description of the project. | Optional |
| `.bio.projects[].link` | A link of the project. | Optional |
| `.bio.projects[].image` | An image screenshot/example URL of the project. | Optional |
| `.bio.skills[]` | A list of skills the user has noted they have. | Optional |

### Contributing

Firstly, you can clone (or fork & clone) this repository: `git clone ssh://git@github.com/bih/hackone-chrome-extension.git`

Secondly, you can load this extension locally by going to your Extensions tab in Chrome, and you should see the "Load Unpacked Extension" button (If you don't, try clicking the "Developer Mode" button on the top right). After that, simply select this folder.

You should be able to make live changes to the folder and see them in the Chrome extension.

### TODO

- Create a walkthrough of how to use the extension
- Add tests
- Add linters
- Rewrite editor from scratch
- Test support across Chrome releases over the past 12 months
- Revise specification
- Create more sample apps

### Disclaimer

This was originally a hack I built in 2014, and I decided to re-release it upon the request of the community. I'm going to actively maintain this, because I believe this will be a fantastic open source tool for the global hackathon community.


### Example JSON

```json
{
    "username": "bilawalhameed",
    "email": "11026592@stu.mmu.ac.uk",
    "lastUpdated": "Sun, 31 Aug 2014 21:55:43 GMT",
    "bio": {
        "firstName": "Bilawal",
        "lastName": "Hameed",
        "gender": "male",
        "email": "11026592@stu.mmu.ac.uk",
        "phone": "+447000800900",
        "dietaryRestrictions": "None",
        "summary": "Maybe a couple sentences. I'm a software engineer and entrepreneur.",
        "location": {
            "city": "Manchester",
            "countryCode": "GB",
            "region": "Greater Manchester",
            "state": ""
        },
        "websites": {
            "personal": "http://bilaw.al",
            "facebook": "https://www.facebook.com/home.pp",
            "twitter": "http://twitter.com/bilawalhameed",
            "github": "http://github.com/bih",
            "linkedin": "http://www.linkedin.com/in/bilawalhameed",
            "dribbble": "",
            "blog": "http://bilaw.al"
        },
        "resume": "https://www.linkedin.com/in/bilawalhameed",
        "picture": ""
    },
    "education": [
        {
            "institution": "Manchester Metropolitan University",
            "areas": [
                "Computer Science"
            ],
            "studyType": "Bachelor's",
            "start": "2011",
            "end": "2015"
        }
    ],
    "work": [
        {
            "company": "Example Company",
            "position": "Software Engineering Intern",
            "start": "2012",
            "end": "2012",
            "description": "Helped them build X and improve X over the summer."
        }
    ],
    "hackathons": [
        {
            "name": "Yo NYC Hackathon",
            "season": "Summer",
            "year": "2014",
            "awards": [
                "Judge's Choice",
                "Most Popular"
            ],
            "project": {
                "name": "YoAuth",
                "link": "http://yoauth.herokuapp.com",
                "image": "http://yoauth.herokuapp.com/logo.png",
                "repository": "http://github.com/bih/yoauth",
                "description": "A simple authentication platform built on Yo",
                "technologies": [
                    "Javascript",
                    "HTML5",
                    "Node.js",
                    "Socket.IO"
                ]
            }
        }
    ],
    "projects": [
        {
            "name": "jquery.markdown.js",
            "description": "A simple Markdown editor written in JavaScript",
            "link": "http://github.com/bih/jquery.markdown.js",
            "image": ""
        }
    ],
    "skills": [
        "Javascript",
        "Ruby",
        "HTML",
        "CSS"
    ]
}
```