const config = {
  es: {
    server: process.env.LOGOXY_ES_SERVER || "localhost:9200"
  },
  log: {
    size: 10
  }
};

module.exports = config;
