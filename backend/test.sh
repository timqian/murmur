# scripts used to test backend
curl -H 'Content-Type: application/json' -X PUT -d '{"uri": "fakeURI", "content": 3}' localhost:9000/comment

curl localhost:9000/comments?uri=fakeURI

curl -X "DELETE" localhost:9000/comment/dataoan?id=cisMAz0aBi