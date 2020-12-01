const path = require('path')
const OUTPUT_PATH = path.resolve(__dirname, '..', 'output', 'renderer')

module.exports = {
    webpack: function(config, env) {
        // 修改输出目录
        config.output.path = OUTPUT_PATH
        // 修改publicPath，否则静态资源文件会引用失败
        config.output.publicPath = './'

        return config;
    },
    devServer: function(configFunction) {
        return function(proxy, allowedHost) {
            const config = configFunction(proxy, allowedHost);

            // 将文件输出到硬盘
            config.writeToDisk = true
            // 修改sock相关配置保证热更新功能正常
            config.host = process.env.HOST || '0.0.0.0';
            config.sockHost = process.env.WDS_SOCKET_HOST;
            config.sockPath = process.env.WDS_SOCKET_PATH; // default: '/sockjs-node'
            config.sockPort = process.env.WDS_SOCKET_PORT;

            return config;
        };
    },
    paths: function(paths, env) {
        // 修改build下的输出目录
        paths.appBuild = OUTPUT_PATH
        return paths;
    },
}