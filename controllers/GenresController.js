const db = require('../database');
const GenresRepository = require('../repository/GenresRepository');

exports.genres_list = (req, res) => {
    const repo = new GenresRepository(db);
    repo.list()
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(500).json({ error: err.message });
        });
};

exports.genres_create = (req, res) => {
    const errors = [];
    ['name'].forEach((field) => {
        if (!req.body[field]) {
            errors.push(`Field '${field}' is missing from request body`);
        }
    });
    if (errors.length) {
        res.status(400).json({
            success: false,
            errors,
        });
        return;
    }

    const repo = new GenresRepository(db);

    repo.create({
        name: req.body.name
    })
        .then((result) => {
            res
                .status(201)
                .json({
                    success: true,
                    id: result,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.genres_delete = (req, res) => {

    const repo = new GenresRepository(db);

    db.get('SELECT films.* FROM films WHERE genre_id = ?',
        [req.params.id], 
        function (err, row) {
            if (row) {
                res.status(400).json({
                    success: false,
                    err: "genre present dans un ou plusieurs films",
                });
                return;
            }else{
                console.log(row);
            }
        },
    );

    repo.delete(req.params.id)
        .then(() => {
            res.status(204)
                .json({
                    success: true,
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};
