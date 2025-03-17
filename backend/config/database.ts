export default ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('DATABASE_HOST', 'localhost'),
      port: env.int('DATABASE_PORT', 5432),
      database: env('DATABASE_NAME', 'strapi_db'),
      user: env('DATABASE_USERNAME', 'strapi_uname'),
      password: env('DATABASE_PASSWORD', '23650189'),
      ssl: env.bool('DATABASE_SSL', false),
    },
    debug: false,
  },
});