module.exports = {
  apps: [
    {
      name: 'cdm-test-dev',
      script: 'npx',
      args: 'ts-node -T -P tsconfig.json src/main.ts',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
    },
  ],

  deploy: {
    production: {
      user: 'node',
      host: '212.83.163.1',
      ref: 'origin/master',
      repo: 'git@github.com:repo.git',
      path: '/var/www/production',
      'post-deploy':
        'npm install && pm2 reload ecosystem.config.js --env production',
    },
  },
};
