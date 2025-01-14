const server = require('server');
const { get, post } = server.router;

console.log("hello world");
// Handle requests to the url "/" ( http://localhost:3000/ )
server( ctx => 'Hello world!');