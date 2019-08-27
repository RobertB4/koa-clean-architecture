module.exports = {
  apps: [
    {
      name: "API",
      script: "index.js",

      instances: 2,
      exec_mode: "cluster",
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    },
  ],
}
