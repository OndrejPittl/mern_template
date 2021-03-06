const config = require('./config.json');

const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = { ...defaultConfig, ...environmentConfig };
global.gConfig = finalConfig;

export default finalConfig;
