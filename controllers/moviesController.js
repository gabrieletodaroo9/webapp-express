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
    const reviewSql = `SELECT * FROM reviews WHERE movie_id = ?`

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

const storeReview = (req, res) => {
    const movieId = Number(req.params.id)
    const { name, text, vote } = req.body
    const userVote = Number(vote);
    if (!name || typeof name !== 'string' || name.length > 255) {
        return res.status(400).json({
            error: true,
            message: "The name field must contain a string with max 255 characters."
        });
    }
    if (isNaN(userVote) || userVote < 1 || userVote > 5) {
        return res.status(400).json({
            error: true,
            message: "The rating field must contain a number between 1 and 5!"
        });
    }
    if (!text || typeof text !== 'string' || text.length > 1500) {
        return res.status(400).json({
            error: true,
            message: "The review field is required and must contain a string with max 1500 characters."
        });
    }

    const sql = `INSERT INTO reviews(movie_id,name,text,vote) VALUES(?,?,?,?)`
    console.log(movieId, name, text, vote);

    connection.query(sql, [movieId, name, text, vote], (err, results) => {
        if (err)
            return res.status(500).json({
                error: true,
                message: err.message
            })
        res.status(201).json({
            message: "Review created"
        })
    })

}



module.exports = {
    index,
    show,
    storeReview
}