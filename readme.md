
**This project is still a work in progress. The development environment is working and you can start developing your theme accordingly but the theme design is not yet implemented**

### TODO

- ~~Develop the Bootstrap 4 Theme layouts~~
- Develop the ES6 JavaScript Boilerplates & standard components
- Implement working Ajax Cart components

We currently use the Strap in production on [BRIXTOL TEXTILES](https://github.com/BRIXTOL/shopify-theme). Might be worth browsing the repo to see how the strap working on a live theme.

> Please note the the BRIXTOL TEXTILES theme is not an open source project. If you pull or clone that repo the legal team will be on your back, so tred lightly.

<hr>

# SHOPIFY STRAP

 An opinionated development environment scaffold for building Shopify themes. This theme and development environment implements a modern approach to developing shopify themes by implementing and harnessing various node modules resulting in blazing fast builds.

 > The Strap is intended for more complex Shopify theme builds. If you're still a junior developer and/or think jQuery is cool then it's best you go and use something like [Slate](https://github.com/Shopify/slate) like the rest of the tech-tards. No offence.

## Features

- Live Reloading of assets and templates in local development.
- Supports ES6 to ES5 Transpilation.
- Supports SCSS/SASS to CSS and custom autoprefixing.
- Uploads concurrently to multiple stores.
- ~~Bootstrap 4 Grid Framework.~~
- Various Vanilla JavaScript Components (no jQuery).


## Installation
Download or clone the repository and run `yarn` or `npm install` from the projects root directory.

## Setup
Strap assumes you have some basic knowledge of theme development with Shopify. Please ensure you've set everything up correctly before you begin building with the Strap and follow the build-flow when developing.

### Upload Theme to Shopify
Before you get started you will need to add a new theme to your store and upload the `theme.zip` file located in the root directory.

### Setup Shopify Sync
Shopify Sync allows you to upload files to your Shopify store/s. You will need to connect your stores theme/s before you begin building with the Strap, You've got 2 options here.

#### Option 1
You can use the Sync wizard from the command line by running:

```
yarn sync configure
```

The Sync wizard will generate a `sync.config.json` file will the information you enter and the Strap will use this information in development.

> The [Shopify Sync](https://github.com/panoply/shopify-sync) module is a stripped down version of [Quickshot](https://github.com/internalfx/quickshot) using different naming conventions and has little less flavor.

#### Option 2**
You can also add a `sync.config.json` file to the root directory and include your information in the file. Below is an example of what the wizard generates and what you can enter manually:

```
{
   "concurrency": 20,
   "ignore_file": ".strignore",
   "targets": [{
      "target_name": "development",
      "api_key": "abcdefg123456",
      "password": "abcdefg123456",
      "domain": "myshopify-domain",
      "primary_domain": "https://www.storedomain.com",
      "theme_name": "development",
      "theme_id": 12345678
    }],
   "configVersion": 1
}
```


> The `targets` key accepts an array which allows you to add multiple theme from multiple store domains.


### Setup SSL in Development
It's reccomended you add your own SSL certificate before running the strap. This will help with live reloading when in development. You can generate an SSL certificate with `openssl` using the below command:

```
cd build/ssl &&  openssl req -x509 -out localhost.crt -keyout localhost.key \
  -newkey rsa:2048 -nodes -sha256 \
  -subj '/CN=localhost' -extensions EXT -config <( \
   printf "[dn]\nCN=localhost\n[req]\ndistinguished_name = dn\n[EXT]\nsubjectAltName=DNS:localhost\nkeyUsage=digitalSignature\nextendedKeyUsage=serverAuth") && cd ../../
Generating a 2048 bit RSA private key
```

Once you've generated your cert, you need to add it to your Certificates in Keychain Access (on Mac).

> You may need to install `openssl` which you can do with brew.

## Environment
The development environment implements [Gulp](https://gulpjs.com), [Rollup](https://rollupjs.org/), [Browser Sync](https://browsersync.io) and [Shopify Sync](https://github.com/panoply/shopify-sync) build tools. Each build tool has a role to play in the development of themes using the strap.

<h4>Gulp</h4>
Development related jobs are run through various gulp tasks. All relative paths are sourced from the `package.json` file which allows you to customize the development flow.

<h4>Rollup</h4>
JavaScript files are all bundled using Rollup. Rollup is a powerful bundler and allows the theme to leverage ES6 transpliation with Buble which is a faster transpiler than Babel.

<h4>Browser Sync</h4>
Live Reload your changes to assets and templates using Browser Sync. In development mode the Strap will proxy your theme and live reload changes in localhost. By default Browser Sync will start a development server at `localhost:3000` but the CLI will log this anyway.

<h4>Shopify Sync</h4>
Sync changes to your stores using Shopify Sync. The sync uses a command line interface for easy configuration of theme targets. You can upload to multiple stores with Shopify Sync which makes multi-store theme development a breeze.

## Development
All dependencies are included with the `package.json` file. Also inclusive within the `package.json` file is all asset bundle task paths and settings which are used by `gulp` and `rollup` respectively. There are 6 CLI commands.

| Command | Operation |
|--|--|
| `yarn sync` | Launches the Shopify Sync configuration wizard |
| `yarn develop` | Starts development environment |
| `yarn build` | Builds the theme directory |
| `yarn watch` | Watches and uploads to the target specified |
| `yarn icons` | Creates and/or updates the SVG Sprite |
| `yarn production` | Production builds a `theme.zip` file  |


## Theme
The theme design shipped within this scaffold is built ontop of the [Bootstrap 4](http://getbootstrap.com/) css grid framework. Under the hood the Theme implements both [Mithril.js](https://mithril.js.org/) and [Turbolinks 5](https://github.com/turbolinks/turbolinks) JavaScript frameworks which act in unity resulting in PWA like experience for users. Because the Strap only intends to be a starting point boolierplate for theme development only minor functionality is built into the core.

## JavaScript
Theme strap enables you to write JavaScript in ES6 which is transpiled down to ES5 using [Rollup.js](https://github.com/rollup/rollup). Due to Shopify's required `.liquid` static templates the theme implements [Mithril.js](https://mithril.js.org/) and [Turbolinks 5](https://github.com/turbolinks/turbolinks) which act in unity resulting in PWA like experience for our users.

**The exported JavaScript file is named `bundle.js` which at this time should be kept under this name. Future releases will enable custom naming of assets.**

> The cart and locale components are both built with mithril.js


<h4>Included Dependecies</h4>

- Turbolinks 5
- Mithril (SPA Framework)
- SSM (Responsive State Management)
- Picturefill (Responsive Image Management)
- Store (Local Storage Management)
- Siema (Carousel Component)
- Money.js & Accounting.js (Currency Management)

<h4>Custom Components</h4>

- Dropdown (Collapse Component)
- Tabs (Tab Component)

## Styling
The themes stylesheet is written in either `SASS` or `SCSS` and implement the [Bootstrap 4](http://getbootstrap.com/) framework components.

**The stylesheet is named `stylesheet.css` which at this time should be kept under this name. Future releases will enable custom naming of assets.**

> Please note that the theme does NOT implement Bootstraps jQuery components


## Icons
The theme uses an imported SVG icon sprite and custom `height` and `width` sizing is added in the stylesheets for each icon nested in each element. While this has some extra code requirements it enables more custom control of each icon. The icon SVG sprite is exported as a snippet and called within the `theme` layout view file.


## Views
Views are the static `.liquid` files required by Shopify. View files are exported to the main `theme` directory in a minified format from the `src` directory. View files within the `/src` directory follow a vastly different build pattern to that of the Shopify `theme` directory. Below is some additional information on these directories:

#### Customers
The customers directory contains all account and/or customer related views within in it. The views in this directory will build into `theme/templates/cutomers` directory.

#### Layout
The layout directory contains layout files. Brixtol uses only one layout, which is `theme` however more can be added. The view/s in this directory will build into `theme/layout` directory.

#### Sections
The sections directory contains the theme sections. Brixtol does not really apply many theme sections to its design due to the multiple storefronts required. The views in this directory will build into `theme/sections` directory

#### Snippets
The snippets directory contains multiple directories that are relative to a template of the same name. The snippet files upon build and export are prefixed with the relative directory name they are located in. Which means these snippets are to be included with a dot prefix, for example:

Lets say you were to create a snippet in the `snippets/collection` directory with the name `filename`. This snippet would then export to `theme/snippets` with the directory name prefixed to the file. This means any snippet file would be included as `{% include 'collection.filename '%}` in your template.

#### Templates
The Templates directory contains the themes main templates. These views are exported to `theme/templates` directory. Majority of the Template views include multiple snippets.

<hr>

**Made with ❤️ by Nikolas Savvidis**
