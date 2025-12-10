const connection = require('../database/connection.js')

const index = (req, res) => {
    const sql = 'SELECT * FROM movies'
    connection.query(sql, (err, results) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        res.json(results)
    })
}

const show = (req, res) => {

    const id = req.params.id
    const moviesSql = 'SELECT * FROM movies WHERE id = ?'
    const reviewSql = `SELECT id,text AS 'review',vote FROM reviews WHERE movie_id = ?`

    connection.query(moviesSql, [id], (err, moviesResults) => {
        if (err) return res.status(500).json({ error: 'Database query failed' })
        if (moviesResults.length === 0) return res.status(404).json({ error: 'Movie not found' })

        const movie = moviesResults[0]

        connection.query(reviewSql, [id], (err, reviewResults) => {
            if (err) return res.status(500).json({ error: 'Database query failed' })

            movie.reviews = reviewResults
            res.json(movie)
        })
    })
}


module.exports = {
    index,
    show
}