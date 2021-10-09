const fs = require('fs');
const { DateTime } = require("luxon");
const readingTime = require('eleventy-plugin-reading-time');
const excerpt = require('eleventy-plugin-excerpt');
const svgSprite = require("eleventy-plugin-svg-sprite");

module.exports = function (eleventyConfig) {
    // Enable data deep marge
    eleventyConfig.setDataDeepMerge(true);

	//plugins
	eleventyConfig.addPlugin(readingTime);
	eleventyConfig.addPlugin(excerpt);
	eleventyConfig.addPlugin(svgSprite, {
		path: "./src/assets/svg",
	});

	// filters
	eleventyConfig.addFilter("readableDate", dateObj => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat("dd LLL, yyyy");
	});
	// https://html.spec.whatwg.org/multipage/common-microsyntaxes.html#valid-date-string
	eleventyConfig.addFilter('htmlDateString', (dateObj) => {
		return DateTime.fromJSDate(dateObj, { zone: 'utc' }).toFormat('yyyy-LL-dd');
	});
	// Function to filter tags array. Removes the tags we don't show 
	function filterTagList(tags) {
		const tagsToRemove = ["all", "posts"]
		return (tags || []).filter(tag => tagsToRemove.indexOf(tag) === -1);
	}
	// returns the fitst tag from tag array after filturing the tags array
	eleventyConfig.addFilter('primaryTag', (tags) => {
		return filterTagList(tags)[0];
	});
	// Returns all available tags
	eleventyConfig.addCollection("tagList", function(collection) {
		let tagSet = new Set();
		collection.getAll().forEach(item => {
		  (item.data.tags || []).forEach(tag => tagSet.add(tag));
		});
	
		return filterTagList([...tagSet]);
	});

	eleventyConfig.addPassthroughCopy('src/assets/images');


	// browsersync settings override
	eleventyConfig.setBrowserSyncConfig({
		callbacks: {
			ready: function (err, browserSync) {
				const content_404 = fs.readFileSync('_site/404.html');

				browserSync.addMiddleware("*", (req, res) => {
					// Provides the 404 content without redirect.
					res.writeHead(404, { "Content-Type": "text/html; charset=UTF-8" });
					res.write(content_404);
					res.end();
				});
			},
		},
		ui: false,
		ghostMode: false
	});

	return {
		markdownTemplateEngine: 'njk',
		htmlTemplateEngine: 'njk',
		dir: {
			input: 'src',
		},
	};
};
