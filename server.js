const express = require('express')
const app = express()
const PORT = 3000
const cors = require('cors')
const moviesRouter = require('./routers/movies')
const serverError = require('./middlewares/serverError')
const notFound = require('./middlewares/notFound')

app.use(cors({
    origin: 'http://localhost:5173'
}))
app.use(express.static('public'))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`App listening on localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('This is the entry point of the server')
})

app.use('/api/movies', moviesRouter)

app.use(serverError)
app.use(notFound)