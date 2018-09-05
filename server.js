const morgan = require('morgan')
const restify = require('restify')

const server = restify.createServer()

const port = process.env.PORT || 3000

server.use(morgan((tokens, req, res) => {
    return [
        '[',
        tokens.method(req, res),
        ' - ',
        tokens.status(req, res),
        '] => ',
        tokens.url(req, res),
        tokens.res(req, res, 'body'),
        ' - ',
        tokens.res(req, res, 'content-length'),
        ' ',
        tokens['response-time'](req, res),
        'ms'
    ].join('')
}))

server.get('/', (req, res, next) => {
    console.log('[Restify] => Getting home JSON')
    res.send('<h1>Heroku Logs!!!</h1>')
    next()
})

server.listen(port, () => {
    console.log(`Server running, to access it go to http://localhost:${port}`)
    console.log('Use CTRL+C to stop it')
})
