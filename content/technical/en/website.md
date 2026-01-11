# Website
## Structure

The website has the following layout:
```
.
├── _layouts                Jekyll build files
│   └── default.html            Default web page               
├── .vscode                 Configuration files for Visual Studio Code
│   ├── .prettierrc             Config for prettier formatter
│   └── settings.json           Basic setup for Extensions      
├── assets                  Assets for the content of the web page
│   ├── fonts                   Fonts
│   └── img                     Images
│       ├── assembly                Images of the assembly
│       ├── design                  Images of the 3d design
│       ├── logos                   Logos
│       │   └── goalfinder              Different variations of the GoalFinder logo
│       ├── mission-cards           Icons for the home page's mission cards
│       ├── showcase                General images of the GoalFinder
│       └── svg                     Svg icons mainly for the documentation
├── content                 Markdown content for user and technical documentation
│   ├── content-structures      Content structures for different documentation and different languages
│   │   ├── user-content-structure-de.json      German content structure for the user documentation
│   │   ├── user-content-structure-en.json      English content structure for the user documentation
│   │   ├── technical-content-structure-de.json German content structure for the technical documentation
│   │   └── technical-content-structure-en.json English content structure for the technical documentation
│   ├── technical               Technical documentation content
│   │   ├── de                      German technical documentation content
│   │   └── en                      English technical documentation content
│   └── user                    User documentation content
│       ├── de                      German user documentation content
│       └── en                      English user documentation content
├── doc-alt                 Documentation from the previous repository
│   ├── getting-started-de.md   User help file
│   └── README_de.md            German README
├── locales                 Localization files for different languages
│   ├── de.json                 German translation file
│   └── en.json                 English translation file
├── pages                   HTML pages for the website
│   ├── credits.html            Credits page
│   ├── help.html               Help page
│   ├── home.html               Home page
│   ├── technical.html          Technical documentation pages
│   └── user.html               User documentation pages
├── scripts                 JavaScript files for dynamic functionality
│   ├── i18n.js                 Translation script for static content
│   ├── home.js                 Scripts for the home page
│   ├── technical.js            Scripts for technical documentation
│   └── user.js                 Scripts for user documentation
├── styles                  CSS stylesheets for the website
│   ├── documentation.css       Documentation style sheet
│   └── main.css                Main style sheet
├── tools                   Web tools for development
│   ├── content-browser         Folder structure browser script
│   │   ├── content-browser.js      Main content browser script
│   │   └── content-checker.js      Quality of life script to check content structures for mismatches
│   ├── markdown-converter      Markdown to HTML converter
│   │   ├── assets/font             Fonts for the markdown converter
│   │   ├── markdown-converter.js   Main markdown converter script
│   │   └── markdown-styles.css     Converter style sheet
│   └── markdown-documentation  Documentation initialization scripts
├── _config.yml             Configuration for Jekyll
├── .gitignore              Files and directories excluded from git source control
├── Gemfile                 Ruby Gemfiles
├── index.html              Jekyll index file
├── LICENSE                 Licensing information for the project
└── README.md               Description of the repository
```

#end