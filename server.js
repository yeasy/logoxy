'use strict';

var restify = require('restify');
var config = require('./config');
var es = require('./es');

var server = restify.createServer({
  name: 'logoxy',
  version: '0.0.1'
});
server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

// GET /restful/api/v2/cluster/monitor/log?cluster_id={cluster_id}&log_type=peer&node_id=vp3&log_size=10&gt=2016-08-25T04:09:02Z
server.get('/v1/log', es.query);

server.listen(8080, function() {
  console.log('%s listening at %s', server.name, server.url);
  console.log(config);
});
