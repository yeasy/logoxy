const config = {
  es: {
    server: process.env.LOGOXY_ES_SERVER || "192.168.7.60",
    port: process.env.LOGOXY_ES_PORT || 9200
  },
  log: {
    size: 10
  }
};

module.exports = config;
