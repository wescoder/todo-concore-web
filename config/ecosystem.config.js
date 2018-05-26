/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: 'todo-concore-web-dev',
      script: './server.js',
      env: {
        NODE_ENV: 'development'
      },
      node_args: [
        '--inspect=9213'
      ],
      watch: [
        './config/*.js',
        './config',
        './next.config.js',
        './server.js'
      ]
    }
  ]
}
