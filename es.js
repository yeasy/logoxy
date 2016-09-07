/**
 * Created by baohua on 9/5/16.
 */

var restify = require('restify');

var cfg = require('./config');

exports.query = function(req, res, next) {
  // console.log(req.params);
  var clusterId = req.params.cluster_id || null;
  var logType = req.params.log_type || 'peer';
  var nodeName = req.params.node_name || 'vp0';
  var logSize = parseInt(req.params.log_size, 10) || cfg.log.size;
  var sinceTs = req.params.since_ts || null;
  if (logSize > 20) {
    logSize = 20;
  }

  var result = {
    code: 0,
    message: '',
    data: {}
  };

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
    sinceTs.setUTCMinutes(0);
    sinceTs.setUTCSeconds(0);
    sinceTs = sinceTs.toISOString();
  }

  var client = restify.createJsonClient({
    url: 'http://' + cfg.es.server,
    accept: 'application/json',
    connectTimeout: 3000,
    requestTimeout: 3000,
    retry: {
      retries: 3
    }
  });

  var filter = [
    {match: {log_type: logType}},
    {match: {cluster_id: clusterId}},
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
          // order: "asc"
        }
      }
    ]
  };

  var index = sinceTs.substr(0, 10).split('-').join('.');

  // console.log(index, clusterId, logType, nodeName, sinceTs, logSize);

  var url = '/logstash-' + index + '/syslog/_search?';

  client.post(url, args, function(err, req, resp, obj) {
    // parsed response body as js object
    // console.log('%d -> %j', res.statusCode, res.headers);
    // console.log('%j', obj);

    if (err === null) {
      // var itemCount = data2.hits.total;  // total records that match
      var hits = obj.hits.hits;
      // console.log(hits);
      var lists = [];
      var rawLog;
      var processedLog;
      // result.data.cluster_id = clusterId;
      // result.data.log_type = logType;
      // result.data.node_name = nodeName;
      result.data.since_ts = sinceTs;
      result.data.latest_ts = sinceTs;
      result.data.log_size = logSize;
      result.data.size = hits.length;

      for (var i = 0; i < hits.length; i++) {
        rawLog = hits[i]._source;
        processedLog = {
          timestamp: rawLog.timestamp,
          log_level: rawLog.log_level,
          module: rawLog.module,
          log_data: rawLog.log_data
        };
        lists.push(processedLog);
      }
      if (lists.length > 0) {
        // console.log("not empty", lists[0].timestamp);
        result.data.latest_ts = lists[0].timestamp;
      }
      result.data.logs = lists;
    } else {
      result.code = 1;
      result.message = err;
      console.log(err);
    }
    res.send(result);
    return next();
  });
};
