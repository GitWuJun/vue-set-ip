const configArgv = JSON.parse(process.env.npm_config_argv)


const original = configArgv.original.slice(1);


const ip = original[1] ? original[1].replace(/-/g,''):''

module.exports = ip;