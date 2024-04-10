module.exports = {
  apps: [
    {
      name: 'cdm-test',
	  script: './dist/main.js',
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
