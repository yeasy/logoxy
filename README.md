# logoxy
Simple log query proxy.

## Installation

### Use Container

```sh
$ bash start.sh
```

### Local Installation

```sh
$ npm install
$ npm start
```

## Usage

Example.

```sh
$ curl logoxy:8080/v1/log?cluster_id= 57bd5b33414b050c55051e12&log_type=peer&node_name=vp0&last_ts=2016-09-05T12:41:42Z
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