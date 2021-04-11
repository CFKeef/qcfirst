const withImages = require("next-images");
const withPlugins = require("next-compose-plugins");

module.exports = withPlugins([[withImages]], {
	i18n: {
		locales: ["en-US"],
		defaultLocale: "en-US",
	},
});
