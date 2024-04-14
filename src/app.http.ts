import http from 'http';
import fs from 'fs';
import path from 'path';
const server = http.createServer((req, res) => {
    // res.writeHead(200, {
    //     'Content-Type': 'text/html'
    // });
    // res.write('<h1>hello</h1>');
    // res.end();

    // const data = { name : 'John', age : 33, email : 'lkasd@gmail.com' };
    // res.writeHead(200, {
    //     'Content-Type': 'application/json'
    // });
    // res.end(JSON.stringify(data));
    if(req.url === '/'){
        const htmlFile = fs.readFileSync(path.join(__dirname, '/public/index.html'), 'utf8');
        // const cssFile = fs.readFileSync(
            
            res.writeHead(200, {
                'Content-Type': 'text/html',
            });
            res.end(htmlFile);
            return;
        }
        
        if( req.url?.endsWith('.js')){
            res.writeHead(200, {'Content-Type': 'text/javascript'});
        }
        else if( req.url?.endsWith('.css') ){
            res.writeHead(200, { 'Content-Type': 'text/css' });
        }
        const jsFile = fs.readFileSync(path.join(__dirname, `/public${ req.url }`), 'utf8');
        res.end(jsFile);

});

server.listen(3000, () => {
    console.log('Server running on port 3000');
});