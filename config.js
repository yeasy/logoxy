var config = {
  es: {
    server: process.env.ES_SERVER | "192.168.7.60",
    port: process.env.ES_PORT | 9200
  }
};

module.exports = config;
