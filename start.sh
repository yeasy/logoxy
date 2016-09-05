#!/usr/bin/env bash

docker build -t yeasy/logoxy .

docker run --rm \
 --restart="unless-stopped" \
 -e LOGOXY_ES_SERVER="192.168.7.60" \
 -e LOGOXY_ES_PORT=9200 \
 -v /home/baohua/logoxy:/usr/src/app \
 -p 8080:8080 \
 yeasy/logoxy