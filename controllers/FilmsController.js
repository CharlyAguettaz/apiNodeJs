const db = require('../database');
const FilmsRepository = require('../repository/FilmsRepository');

exports.films_list = (req, res) => {
    const repo = new FilmsRepository(db);
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

exports.films_get = (req, res) => {
    const repo = new FilmsRepository(db);
    repo.get(req.params.id)
        .then((result) => {
            res.json({
                success: true,
                data: result,
            });
        })
        .catch((err) => {
            res.status(404).json({ error: err.message });
        });
};

exports.films_create = (req, res) => {
    var errors = [];
    ['name', 'synopsis', 'release_year', 'genre_id', 'actors'].forEach((field) => {
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

    var isactor = true;

    req.body["actors"].forEach(actor => {
        db.get(`SELECT * FROM actors WHERE id = ?`,
            [actor],
            (err, row) => {
                if (row) {
                    
                } else {
                    isactor = false;
                    return;
                }
            }
        )
    });

    if(isactor){
        db.get('SELECT genres.* FROM genres WHERE id = ?',
            [req.body["genre_id"]], 
            function (err, row) {
                if (row) {
                    const repo = new FilmsRepository(db);

                    repo.create({
                        name: req.body.name,
                        synopsis: req.body.synopsis,
                        release_year: req.body.release_year,
                        genre_id: req.body.genre_id,
                        actors: req.body.actors
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
                }else{
                    res.status(400).json({
                        success: false,
                        err: "id genre inconnu",
                    });
                    return;
                }
            },
        );
    }else{
        console.log(123456789);
    }

    
};

exports.films_update = (req, res) => {
    const errors = [];
    ['name', 'synopsis', 'release_year', 'genre_id', 'actors'].forEach((field) => {
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

    const repo = new FilmsRepository(db);

    repo.update(
        req.params.id,
        {
            name: req.body.name,
            synopsis: req.body.synopsis,
            release_year: req.body.release_year,
            genre_id: req.body.genre_id,
            actors: req.body.actors
        },
    )
        .then(() => {
            repo.get(req.params.id)
                .then((result) => {
                    res.json({
                        success: true,
                        data: result,
                    });
                });
        })
        .catch((err) => {
            res.status(400).json({ error: err.message });
        });
};

exports.films_delete = (req, res) => {
    const repo = new FilmsRepository(db);

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
