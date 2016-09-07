#!/usr/bin/env bash

echo "This will start in production"

ES_SERVER="192.168.7.60:9200"

if [ $# -ne 1 ]; then
    echo "No input param, es server use default value"
else
    ES_SERVER=$1
fi

echo "es_server = ${ES_SERVER}"

#docker build -t yeasy/logoxy .

docker pull yeasy/logoxy

docker run \
    --rm \
    --restart="unless-stopped" \
    -e LOGOXY_ES_SERVER=${ES_SERVER} \
    -p 8080:8080 \
    yeasy/logoxy

