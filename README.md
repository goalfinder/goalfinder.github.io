# Pages branch

This branch is used for hosting Goalfinder's website and therefore only contains assets relevant for the web page.
Following other branches can be helpful:
 - Current development state: `development`
 - Latest release: `main`

## Branch structure

    .
    ├── .vscode                 Configuration files for Visual Studio Code
    ├── assets                  Assets for the content of the web page
    ├── doc-alt                 Documentation from the previous repository
    ├── web                     Development directory for the web-based access point
    │   ├── assets                  Assets for the technical aspect of the webpage. Other assets are found in the assets directory in root
    │   │   ├── fonts                   Fonts
    │   │   ├── img                     Images
    │   │   └── pages                   Pages
    │   ├── home                    Welcoming home page lining out key facts about the Goalfinder project
    │   ├── styles                  Stylesheets
    │   ├── technical               Technical documentation about the Goalfinder
    │   │   ├── pages                   HTML pages for the documentation
    │   │   │   └── content                 MarkDown pages for the documentation
    │   │   └── scripts                 Documentation scripts
    │   ├── tools                   Web tools for development         
    │   │   ├── content-browser         Folder structure browser script
    │   │   └── markdown-converter      MarkDown Converter script
    │   └── usage                   Beginner friendly documentation about the Goalfinder
    │       │   ├── pages               HTML pages for the documentation
    │       │   └── content             MarkDown pages for the documentation
    │       └── scripts         Documentation scripts
    ├── .gitignore              Files and directories excluded from git source control
    ├── LICENSE                 Licensing information for the project
    ├── package-lock.json       Locked npm dependencies for consistent builds
    └── README.md               Description of the repository