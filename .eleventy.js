const pluginTOC = require("eleventy-plugin-toc");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/style.css");
	eleventyConfig.addPassthroughCopy("./src/common.js");
	eleventyConfig.addPassthroughCopy("./img/");

	eleventyConfig.addPlugin(pluginTOC);

	return {
		dir: {
			input: "src",
			output: "public"
		}
	};
};
