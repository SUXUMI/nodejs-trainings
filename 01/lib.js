let http = require('http')
const url = require('url')

const routingList = {
    // get => path => callback
}

class myRouter {
    async handleRequest(req, res) {
        try {
            let body = ''

            let path = url.parse(req.url).pathname

            let method = req.method

            if (req.method === 'POST') {
                await req.on('data', chunk => {
                    body += chunk.toString()
                });
        
                await req.on('end', () => {
                    // do nothing
                    // ? not works applying by reference.. why => `req.body = body`
                });
            }

            let callRoute = function(method, path, req, res) {
                if (!routingList[method]) {
                    throw new Error('Invalid request method')
                }
                
                if (!routingList[method][path]) {
                    throw new Error('Invalid request path')
                }
                
                routingList[method][path]({
                    req,
                    res
                })
            }

            // define body
            req.body = body

            res.json = function(data) {
                res.writeHead(res.statusCode, {
                    'Content-Type': 'application/json'
                });

                res.write(JSON.stringify(data))
            }

            await callRoute(method, path, req, res)
        }
        catch(e) {
            res.writeHead(500, {
                'Content-Type': 'text/html'
            });

            res.write('Error: ' + e.message)
        }
        
        res.end('');
    }

    registerRoute(method, path, callback) {
        routingList[method] = { [path]:callback }
    }

    // ? how to call this from handleRequest
    // callRoute(method, path, res) {}

    get(path, callback) {
        this.registerRoute('GET', path, callback)
    }

    post(path, callback) {
        this.registerRoute('POST', path, callback)
    }

    listen(port, callback) {
        http.createServer(this.handleRequest).listen(port, callback);
    }
}

module.exports = myRouter;