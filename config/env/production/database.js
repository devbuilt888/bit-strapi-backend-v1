const path = require('path');
const parse = require('pg-connection-string').parse;

module.exports = ({ env }) => {
  if (env('NODE_ENV') === 'production') {
    const databaseUrl = env('DATABASE_URL', '');
    if (databaseUrl) {
      const config = parse(databaseUrl);
      return {
        connection: {
          client: 'postgres',
          connection: {
            host: config.host,
            port: config.port,
            database: config.database,
            user: config.user,
            password: config.password,
            ssl: {
              rejectUnauthorized: false
            },
          },
          debug: false,
        },
      };
    } else {
      // Assume Strapi Cloud handles the database configuration
      return {
        connection: {
          client: 'postgres',
          connection: {
            host: env('DATABASE_HOST', 'localhost'),
            port: env.int('DATABASE_PORT', 5432),
            database: env('DATABASE_NAME', 'strapi'),
            user: env('DATABASE_USERNAME', 'strapi'),
            password: env('DATABASE_PASSWORD', 'strapi'),
            ssl: {
              rejectUnauthorized: false
            },
          },
          debug: false,
        },
      };
    }
  } else {
    return {
      connection: {
        client: 'sqlite',
        connection: {
          filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
        },
        useNullAsDefault: true,
      },
    };
  }
};