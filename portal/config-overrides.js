const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
    alias({
        "~": "./src",
    })(config);

    return config;
}
