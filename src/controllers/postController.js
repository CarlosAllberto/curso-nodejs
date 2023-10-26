exports.index = (req, res) => {
    let id = req.params.id
    res.send(`post: ${id}`)
}