# Open-Budget-ABQ
This project will display the City of Albuquerque's annual budget in a user friendly web application, allowing citizens to better understand how their tax dollars are being spent and how city services are prioritized.

[Read more](https://docs.google.com/document/d/1_QMtesnSFiEhv_ZucwbfkAF0KcPpEsH99120LpU0des/edit) about the tech specs and our initial assessment of its value to the community.

Have some input? We are now soliciting [public comments](https://docs.google.com/document/d/1YGKSBixl7ap8Guoc9gV9pOcMHypVItcUoUlfxCoY7Eo/edit?usp=sharing).

## Development

We welcome contributions from anyone at any time, either in code or in the issue queue. If you fork this repository and make improvements, we encourage you to submit a pull request so we can consider incorporating your improvements.

## Branching 

All development is happening on the *dev* branch and feature branches. Feature branches will be merged into *dev*. We will only merge into *master* when we are ready to release a stable version.

## Requirements
* A web server with the [npm](https://www.npmjs.com/) package manager installed


## Installation
1. Run "npm install" to fetch the required libraries.
2. On the command line type: "npm run watch-all" for browserify and css outputs

## Options

Watching:
* "npm run watch-css" to watch only the scss files and compile them into css
* "npm run watch-js" to watch only the js files and create the bundle.js automatically

Compiling: the watching calls these commands automatically. We list them just to be exhaustive:
* "npm run build-css" compile the scss (sass) files to css files
* "npm run build-js" compile the js files to bundle.js
* "npm run build-all" compile the scss (sass) files to css files and the js files to bundle.js

If you get a "no such file or directory" error when building the js, try building the css first, which will complete your directory structure.