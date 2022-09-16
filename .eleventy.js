const pluginTOC = require("eleventy-plugin-toc");
const pluginRss = require("@11ty/eleventy-plugin-rss");

module.exports = function (eleventyConfig) {
	eleventyConfig.addPassthroughCopy("./src/style.css");
	eleventyConfig.addPassthroughCopy("./src/common.js");
	eleventyConfig.addPassthroughCopy("./img/");

	eleventyConfig.addPlugin(pluginTOC); // TOC = Table of Contents
	eleventyConfig.addPlugin(pluginRss);

	eleventyConfig.addFilter("rssdate", _date2rssDate);

	return {
		dir: {
			input: "src",
			output: "public"
		}
	};
};


// =========================================

function _date2rssDate(date) {
	if (typeof date === 'undefined') {
		date = new Date();
	}

	var pieces = date.toString().split(' '),
		offsetTime = pieces[5].match(/[-+]\d{4}/),
		offset = (offsetTime) ? offsetTime : pieces[5],
		parts = [
			pieces[0] + ',',
			pieces[2],
			pieces[1],
			pieces[3],
			pieces[4],
			offset
		];

	return parts.join(' ');
}