#!/usr/bin/env bash

echo "This will start for development"

ES_SERVER="192.168.7.60:9200"

CODE_DIR=`pwd`

if [ $# -ne 1 ]; then
    echo "No input param, es server uses default value"
else
    ES_SERVER=$1
fi

echo "es_server=${ES_SERVER}"

#docker build -t yeasy/logoxy .

docker pull yeasy/logoxy

docker run --rm \
 #--restart="unless-stopped" \
 -e LOGOXY_ES_SERVER=${ES_SERVER} \
 -v ${CODE_DIR}:/usr/src/app \
 -p 8080:8080 \
 yeasy/logoxy