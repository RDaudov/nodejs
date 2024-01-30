const http  = require('http')
const fs = require('fs')
const path = require('path');
const PORT = 3001;
const createPath = (page) => path.resolve(`${page}.html`)
let basePath = ''


const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');

    switch(req.url) {
        case '/':
            basePath = createPath('index')
            break;
        case '/about':
            basePath = createPath('about')
            break;
        default:
            basePath = createPath('error');
            break
    }
    
        fs.readFile(basePath, (err, data) => {
            if (err) {
                console.log(err);
                res.end();
            }
            else {
                res.write(data);
                res.end();
            }
        })
        
    
})

server.listen(PORT, 'localhost', (error)  => {
    error ? console.log(error) : console.log(`listening port ${PORT}`)
})
