curl -H 'Content-Type: application/json' -X PUT -d '{"uri": "dataoan", "content": 3}' localhost:9000/comment

curl localhost:9000/uri/dataoan

curl -X "DELETE" localhost:9000/comment/dataoan?id=cisMAz0aBi