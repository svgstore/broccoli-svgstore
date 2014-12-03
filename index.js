var Writer = require("broccoli-writer");

module.exports = SvgProcessor;
SvgProcessor.prototype = Object.create(Writer.prototype);
SvgProcessor.prototype.constructor = SvgProcessor;

function SvgProcessor (inputTree, options) {

	if (!(this instanceof SvgProcessor)) return new SvgProcessor(inputTree, options);

};

SvgProcessor.prototype.write = function (readTree, destDir) {

};
