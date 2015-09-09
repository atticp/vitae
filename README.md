# Vitae

Vitae is an angularJS app for displaying curriculum vitaes (résumés).

Features include:

* Reads résumé information from a json file
* Main header section
* Key skills section
* Timeline to show previous work, education and voluntary experience.
* Interests chart


# Running Locally

Get the repo

    $ git clone https://github.com/atticp/vitae
    $ cd vitae

Install dependencies

    $ npm install -g gulp karma-cli
    $ npm install

Run the test suite

    $ npm test

Alternatively run just one of the test components

    $ jshint .
    $ karma start

# Résumé data

Résumé data is contained in `layout/vitae.json`

**vitae.json**
```JSON
{
    "name": "John Doe",
    "phone": "+441234567890",
    "email": "j.doe@xxxxxx.com",
    "address": "00 Road, Town, County, PostCode",
    "description": "A description of John Doe goes here.",
    "keyskills": [
        ...
    ],
    "experience": [
        ...
    ],
    "interests": [
        ...
   ]
}
```

## Key Skills data

The `keyskills` section of the vitae json is an array of strings listing the applicants main skills.

```JSON
"keyskills": [
       "Key Skill 1",
       "Key Skill 2",
       "Key Skill 3",
       ...
   ]
```

## Experience data

The `experience` section of the vitae json is an array of experience objects. Each experience object contains a type (work/education/voluntary) which enables the different experience types to be formatted in different ways.

```JSON
 "experience": [
        {
            "type": "work",
            "company": "A Company",
            "position": "Worker",
            "startdate": "2011-05-01",
            "enddate": "2013-01-01",
            "skills": [
                "Skill A",
                "Skill B",
                "Skill C"
            ]
        },
        {
            "type": "education",
            "company": "University",
            "position": "Degree Subject",
            "startdate": "2003-09-01",
            "enddate": "2006-06-01",
            "skills": [
                "Degree grade in Degree"
         ]
      },
        {
            "type": "voluntary",
            "startdate": "2003-08-01",
            "enddate": "",
            "company": "Voluntary Work",
            "position": "Voluntary Worker",
            "skills": [
                "Skill X",
                "Skill Y",
                "Skill Z"
         ]
      },
      ...
   ]
```
## Interests data

The `interests` section of the vitae json is an array of interest objects.

```JSON
"interests": [
        {
            "title": "Interest 1",
            "img": "glyphicons_329_soccer_ball.png"
      },
        {
            "title": "Interest 2",
            "img": "glyphicons_314_table_tennis.png"
      },
        ...
   ]
```

# Project Structure

```
│
├── LICENSE                   MIT
├── README.md                 this file
├── bower.json                defines third-party css/js - downloads to /assets
├── gulpfile.js               defines gulp tasks
├── karma.conf.js             karma test config
├── package.json              npm dependencies and scripts
│
├── assets/                   bower components (not intended to be committed)
│
├── build/                    build and test output files
│   ├── coverage/               code coverage html
│   └── release/                release build output
│
├── layout/                   main page and layout files
│   ├── index.html              main template
│   ├── vitae.json              résumé data file
│   ├── css/                    css files
│   │   └── main.css              main css file
│   └── images/                 image files
│
├── src/                      angular files
│   ├── d3/                     d3 service
│   ├── d3-utils/               d3 utilities service
│   ├── interests/              vitae interests directives
│   ├── key-skills/             vitae key skills directives
│   ├── name-header/            vitae name header directives
│   ├── templates/              vitae templates cache
│   ├── timeline/               vitae timeline directives
│   └── vitae/                  vitae directives, controller and data service
│
└── test/
    └── unit/                  unit/karma tests
```
