# Pages branch

This branch is used for hosting Goalfinder's website and therefore only contains assets relevant for the web page.
Following other branches can be helpful:

-   Current development state: `development`
-   Latest release: `main`

## Updated Branch Structure

    .
    ├── .vscode                 Configuration files for Visual Studio Code
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
    │   ├── user                    User documentation content
    │   ├── technical               Technical documentation content
    │   └── content-structures      Content structures for different documentation and different languages 
    │       ├── user-content-structure-de.json      German content structure for the user documentation
    │       ├── user-content-structure-en.json      English content structure for the user documentation
    │       ├── technical-content-structure-de.json German content structure for the technical documentation
    │       └── technical-content-structure-en.json English content structure for the technical documentation
    ├── doc-alt                 Documentation from the previous repository
    ├── locales                 Localization files for different languages
    ├── pages                   HTML pages for the website
    │   ├── credits.html            Credits page
    │   ├── help.html               Help page
    │   ├── home.html               Home page
    │   ├── technical.html          Technical documentation pages
    │   └── user.html               User documentation pages
    ├── scripts                 JavaScript files for dynamic functionality
    │   ├── home.js                 Scripts for the home page
    │   ├── technical.js            Scripts for technical documentation
    │   └── user.js                 Scripts for user documentation
    ├── styles                  CSS stylesheets for the website
    ├── tools                   Web tools for development
    │   ├── content-browser         Folder structure browser script
    │   ├── markdown-converter      Markdown to HTML converter
    │   └── markdown-documentation  Documentation initialization scripts
    ├── .gitignore              Files and directories excluded from git source control
    ├── LICENSE                 Licensing information for the project
    └── README.md               Description of the repository
