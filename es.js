/**
 * Created by baohua on 9/5/16.
 */

var restify = require('restify');

var cfg = require('./config');

var result = {
  code: 0,
  message: '',
  data: {}
};

exports.query = function(req, res, next) {
  // console.log(req.params);
  var clusterId = req.params.cluster_id || null;
  var logType = req.params.log_type || 'peer';
  var nodeName = req.params.node_name || 'vp0';
  var logSize = parseInt(req.params.log_size, 10) || cfg.log.size;
  var sinceTs = req.params.since_ts || null;

  if (clusterId === null) {
    console.log("clusterId === null");
    result.code = 1;
    result.message = "Unkown cluster_id in params";
    res.send(result);
    return next();
  }

  if (sinceTs === null) {
    sinceTs = new Date();
    sinceTs.setUTCHours(0);
    sinceTs = sinceTs.toISOString();
    console.log(sinceTs);
  }

  var client = restify.createJsonClient({
    url: 'http://' + cfg.es.server,
    accept: 'application/json',
    requestTimeout: 3000
  });

  var filter = [
    {match: {log_type: logType}},
    {match: {cluster_id: clusterId}},
    {match: {log_type: logType}},
    {match: {node_name: nodeName}}
  ];

  var args = {
    query: {
      bool: {
        must: filter
      }
    },
    filter: {
      range: {
        timestamp: {
          gt: sinceTs
        }
      }
    },
    size: logSize,
    sort: [
      {
        "@timestamp": {
          order: "desc"
        }
      }
    ]
  };

  var url = '/logstash-' + sinceTs.substr(0, 10).split('-').join('.') +
    '/syslog/_search?';

  client.post(url, args, function(err, req, resp, obj) {
    // parsed response body as js object
    // console.log('%d -> %j', res.statusCode, res.headers);
    // console.log('%j', obj.hits);

    if (err === null) {
      // var itemCount = data2.hits.total;  // total records that match
      var hits = obj.hits.hits;
      // console.log(hits);
      var lists = [];
      var rawLog;
      var processedLog;

      for (var i = 0; i < hits.length; i++) {
        rawLog = hits[i]._source;
        processedLog = {
          log_type: rawLog.log_type,
          node_name: rawLog.node_name,
          timestamp: rawLog.timestamp,
          log_level: rawLog.log_level,
          module: rawLog.module,
          log_data: rawLog.log_data
        };
        lists.push(processedLog);
      }
      result.data = lists;
    } else {
      result.code = 1;
      result.message = err;
    }
    res.send(result);
  });

  return next();
};
