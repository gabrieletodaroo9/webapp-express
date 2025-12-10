const express = require('express')
const app = express()
const PORT = 3000

app.use(express.static("public"))
app.use(express.json())

app.listen(PORT, () => {
    console.log(`App listening on localhost:${PORT}`)
})

app.get('/', (req, res) => {
    res.send('This is the entry point of the server')
})