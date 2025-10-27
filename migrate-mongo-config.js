require('dotenv').config();

const config = {
  mongodb: {
    url: process.env.MONGODB_URI || 'mongodb://localhost:27017/Phablo',

    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },

  },

  migrationsDir: 'migrations',
  changelogCollectionName: 'migrations_changelog',
};

module.exports = config;
