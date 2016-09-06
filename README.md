# logoxy
Simple log query proxy, query given filter log from ES.

## Installation

### Use Container


```sh
$ docker run \
    --rm \
    --restart="unless-stopped" \
    -e LOGOXY_ES_SERVER="192.168.7.60:9200" \
    -p 8080:8080 \
    yeasy/logoxy
```

For development.

```sh
$ bash start.sh
```

### Local Installation

```sh
$ npm install
$ npm start
```

## Usage


### Request

Supported params are:

* `cluster_id` (MUST): The id of the cluster to query.
* `log_type` (Optional): `peer` (default) or `chaincode`.
* `node_name` (Optional): name of the node, default to `vp0`.
* `since_ts` (Optional): Only query logs newer than timestamp, default to hour 0 UTC.
* `log_size` (Optional): Maximum number of log entries to return, default to `10`.

```sh
$ curl logoxy:8080/v1/log?cluster_id= 57bd5b33414b050c55051e12&log_type=peer&node_name=vp0&since_ts=2016-09-05T12:41:42Z&log_size=10
{
  "code": 0,
  "message": "",
  "data": [
    {
      "log_type": "peer",
      "node_name": "vp0",
      "timestamp": "2016-09-05T13:17:05Z",
      "log_data": "2016/09/03 09:14:19 grpc: ClientConn.resetTransport failed to create client transport: connection error: desc = \"transport: dial tcp 172.19.0.12:30303: getsockopt: no route to host\"; Reconnecting to \"172.19.0.12:30303\"\n"
    },
    {
      "log_type": "peer",
      "node_name": "vp0",
      "timestamp": "2016-09-05T13:17:05Z",
      "log_level": "DEBU",
      "module": "peer",
      "log_data": "Received DISC_PEERS, grabbing peers message\n"
    }
  ]
}
```