module.exports = {
    api: {
        port: process.env.API_PORT || 3000,
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'secretNote!'
    },

    //env variables configuration for mysql
    mysql: {
        host: process.env.MYSQL_HOST || 'remotemysql.com',
        user: process.env.MYSQL_USER || 't9e39O1weq',
        password: process.env.MYSQL_PASS || 'kfNOm8TsTQ',
        database: process.env.MYSQL_DB || 't9e39O1weq',
    },

    mysqlService: {
        host: process.env.MYSQL_SRV_HOST || 'localhost',
        port: process.env.MYSQL_SRV_PORT || 3001
    }
}