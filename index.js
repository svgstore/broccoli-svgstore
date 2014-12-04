var fs = require("fs"),
	path = require("path"),
	mkdirp = require("mkdirp"),
	Writer = require("broccoli-writer"),
	helpers = require("broccoli-kitchen-sink-helpers"),
	cheerio = require("cheerio");

module.exports = SvgProcessor;
SvgProcessor.prototype = Object.create(Writer.prototype);
SvgProcessor.prototype.constructor = SvgProcessor;

function SvgProcessor (inputTree, options) {

	if (!(this instanceof SvgProcessor)) return new SvgProcessor(inputTree, options);

	this.inputTree = inputTree;

	this.options = {
		outputFile: "images.svg"
	};

	for (key in options) {
		if (options.hasOwnProperty(key)) {
			this.options[key] = options[key];
		}
	}

};

SvgProcessor.prototype.write = function (readTree, destDir) {

	var self = this;

	return readTree(this.inputTree).then(function (srcDir) {

		var output = ["<svg xmlns='http://www.w3.org/2000/svg' style='display: none'>"];

		try {

			var inputFiles = helpers.multiGlob(["**/*.svg"], { cwd: srcDir });
			for (var i = 0; i < inputFiles.length; i++) {
				var stat = fs.statSync(srcDir + "/" + inputFiles[i]);
				if (stat && stat.isFile()) {
					var fileContents = fs.readFileSync(srcDir + "/" + inputFiles[i], { encoding: "utf8" });
					output.push(parseSvg(fileContents));
				}
			}

		} catch (error) {
			if (!error.message.match("did not match any files")) {
				throw error;
			}
		}

		output.push("</svg>");

		helpers.assertAbsolutePaths([self.options.outputFile]);
		mkdirp.sync(path.join(destDir, path.dirname(self.options.outputFile)));
		var concatenatedOutput = output.join("\n");
		fs.writeFileSync(path.join(destDir, self.options.outputFile), concatenatedOutput);

	});

};

function parseSvg (fileContents) {

	var $fileContents = cheerio.load(fileContents),
		$svg = $fileContents("svg"),
		viewBox = $svg.attr("viewBox"),
		$outputContents = cheerio.load("<symbol viewBox='" + viewBox + "'></symbol>"),
		$symbol = $outputContents("symbol");

	$symbol.html($svg.html());

	return $outputContents.html();

};
