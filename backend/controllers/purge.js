
module.exports = {
    purge: (req, res) => {
        req.db.dropDatabase()
        res.json({message: "Database purged"})
    }
}