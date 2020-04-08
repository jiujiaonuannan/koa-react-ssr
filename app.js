/**
 * koa 服务启动文件
 */
console.log(process.argv);
global.__SERVER__=true;
global.__CLIENT__ = false;

var app = require('./dist/server/server/zz-base/app/server.js');
var http = require('http');
var config = require('./dist/server/src/config/project-config').default;
/**
 * Get port from environment and store in Express.
 */

var port = normalizePort(process.env.PORT || config.nodeServerPort);

/**
 * Create HTTP server.
 */

var server = http.createServer(app.callback());

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', onError);
console.log('node server will start ......  http://localhost:' + port);
/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    var port = parseInt(val, 10);
    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    var bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
}




//TODO:设置内存监控入口
if (process.env.NODE_ENV === 'development') {

    //https://github.com/JerryC8080/Memeye/blob/master/README_zh.md
    //ask http://localhost:23333 
    // const memeye = require('memeye');
    // memeye();
    //无法启动服务

    //开发环境设置本机 ip

    require('./server/zz-base/common/other/local-ip');
}
