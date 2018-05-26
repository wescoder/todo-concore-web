/* eslint-disable camelcase */
module.exports = {
  apps: [
    {
      name: 'todo-concore-web-dev',
      script: './node_modules/next/dist/bin/next',
      env: {
        NODE_ENV: 'development'
      },
      node_args: [
        '--inspect=9230'
      ],
      watch: [
        './ecosystem.config.js',
        '../config',
        '../next.config.js',
        '../server.js'
      ]
    }
  ]
}
