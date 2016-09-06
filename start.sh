#!/usr/bin/env bash

echo "This will build and start up the server for development"

CODE_DIR=/home/baohua/logoxy

#docker build -t yeasy/logoxy .

docker pull yeasy/logoxy

docker run --rm \
 --restart="unless-stopped" \
 -e LOGOXY_ES_SERVER="192.168.7.60:9200" \
 -v ${CODE_DIR}:/usr/src/app \
 -p 8080:8080 \
 yeasy/logoxy