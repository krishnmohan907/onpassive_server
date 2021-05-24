var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'new_db'
    },

    userParams: {
        userParam1: '451'
    }
});

module.exports = knex