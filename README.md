broccoli-svgstore
=================

A simple [Broccoli](https://github.com/broccolijs/broccoli) task to combine SVG files as described in [a recent CSS Tricks article](http://css-tricks.com/svg-sprites-use-better-icon-fonts/) for SVG sprite-based icon systems. Comparable to [grunt-svgstore](https://github.com/FWeinb/grunt-svgstore) and [gulp-svgstore](https://github.com/w0rm/gulp-svgstore). 


Installation
------------

```
npm install --save broccoli-svgstore 
```


Usage
-----

The filter accepts one input node full of SVG files and outputs a node with a single file as named by the `outputFile` option.

```javascript
var svgstore = require("broccoli-svgstore");

var outputNode = svgstore(inputNode, {
  outputFile: "/assets/icons.svg"
});
```

Inject the file into an HTML document and use `<svg><use xlink:href="icon-name"></svg>` to place an image on the page.

