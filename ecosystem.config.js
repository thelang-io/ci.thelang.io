module.exports = {
  apps: [{
    name: 'app',
    script: './app.js',
    time: true,
    cwd: __dirname,
    env_production: {
      NODE_ENV: 'production'
    },
    env_development: {
      NODE_ENV: 'development'
    }
  }]
}
