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
    "since_ts": "2016-09-06T00:37:30.637Z",
    "log_size": 2,
    "size": 2,
    "logs": [
      {
        "timestamp": "2016-09-06T05:36:30Z",
        "log_level": "DEBU",
        "module": "peer",
        "log_data": "Received PeersMessage with Peers: peers:<ID:<name:\"vp2\" > address:\"172.19.0.17:30303\" type:VALIDATOR > peers:<ID:<name:\"vp5\" > address:\"172.19.0.16:30303\" type:VALIDATOR > peers:<ID:<name:\"vp3\" > address:\"172.19.0.19:30303\" type:VALIDATOR > peers:<ID:<name:\"vp1\" > address:\"172.19.0.21:30303\" type:VALIDATOR > peers:<ID:<name:\"vp0\" > address:\"172.19.0.18:30303\" type:VALIDATOR > \n"
      },
      {
        "timestamp": "2016-09-06T05:36:30Z",
        "log_level": "DEBU",
        "module": "peer",
        "log_data": "Handling Message of type: DISC_PEERS \n"
      }
    ]
  }
}
```


## Debug
Start the container with mapping your local code, and run `nodemon` as default command.

```sh
$ docker run \
    --rm \
    --restart="unless-stopped" \
    -e LOGOXY_ES_SERVER="192.168.7.60:9200" \
    -p 8080:8080 \
    -v Your_CODE:/usr/src/app
    yeasy/logoxy nodemon
```
