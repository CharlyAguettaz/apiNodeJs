/* eslint-disable no-console */
/* eslint-disable func-names */
class FilmsRepository {


    constructor(database) {
        this.database = database;
        this.filmLastId = 0;
    }

    list() {
        return new Promise((resolve, reject) => {
            const req = `SELECT films.*, genres.name as nomGenre FROM films, genres WHERE films.genre_id = genres.id`

            this.database.all(req, [], (err, rows) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        rows.map((row) => row),
                    );
                }
            });
        });
    }

    get(id) {
        return new Promise((resolve, reject) => {
            this.database.get('SELECT * FROM films WHERE id = ?', [id], (err, row) => {
                if (err) {
                    console.error(err.message);
                    reject(err);
                } else {
                    resolve(
                        row,
                    );
                }
            });
        });
    }

    create(data) {

        return new Promise((resolve, reject) => {
            this.database.run(
                'INSERT INTO films (name, synopsis, release_year, genre_id) VALUES (?,?,?,?)',
                [data.name, data.synopsis, data.release_year, data.genre_id],
                function (err) {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(this.lastID);
                        setLastId(this.lastID);
                    }
                },
            );

            

            data.actors.forEach(actor => {
                this.database.run(
                    `INSERT INTO films_actors (film_id, actor_id) values (?,?)`,
                    [this.filmLastId, actor],
                    (err) => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                )
            });

        });
    }

    update(id, data) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `UPDATE films
                 SET name = ?,
                     synopsis = ?,
                     release_year = ?,
                     genre_id = ?
                 WHERE id = ?`,
                [data.name, data.synopsis, data.release_year, data.genre_id, id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                },
            );

            this.database.run(
                `DELETE FROM films_actors
                WHERE film_id = ? `,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve();
                    }
                }
            )

            data.actors.forEach(actor => {
                this.database.run(
                    `INSERT INTO films_actors (film_id, actor_id) values (?,?)
                    `,
                    [id, actor],
                    (err) => {
                        if (err) {
                            console.error(err.message);
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                )
            });


        });
    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.run(
                `DELETE FROM films
                 WHERE id = ?`,
                [id],
                (err) => {
                    if (err) {
                        console.error(err.message);
                        reject(err);
                    } else {
                        resolve(true);
                    }
                },
            );
        });
    }

    // eslint-disable-next-line class-methods-use-this
    /*decorator(Films) {
        return {
            ...Films,
            done: Films.done === 1,
        };
    }*/
}

module.exports = FilmsRepository;
