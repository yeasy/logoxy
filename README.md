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
```

###  Response

```json
{
  "code": 0,
  "message": "",
  "data": {
    "cluster_id": " 57bd5b33414b050c55051e12",
    "log_type": "peer",
    "node_name": "vp0",
    "since_ts": "2016-09-06T00:33:04.724Z",
    "log_size": 283486,
    "logs": [
      {
        "timestamp": "2016-09-06T05:32:10Z",
        "log_level": "DEBU",
        "module": "peer",
        "log_data": "Sending message to stream of type: DISC_HELLO \n"
      },
      {
        "timestamp": "2016-09-06T05:32:10Z",
        "log_level": "DEBU",
        "module": "peer",
        "log_data": "Sending message to stream of type: DISC_HELLO \n"
      }
    ]
  }
}
```