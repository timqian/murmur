
## Design

1. server:

### API
  1. GET comments
  2. POST comments
  3. LIST URIs

### Dashboard
  Manage comments


2. database

Any database support key value storage and users can query the keys is capable.

  1. PUT key & value
  1. GET key & value
  1. GET all keys
  1. DEL key & value

3. notification

  1. How to notify users when there is a reply
  1. How to notify admin when there is a reply


### How to deploy to tencent cloud

1. Create bucket: https://console.cloud.tencent.com/cos5/bucket (not possible 因为 bucket name 会带上用户 ID)

### Comment structure


#### Comments for a URI
```json
[{
  "id": "",
  "parentId": "",
  "content": "",
  "author": "",
  "email": "",
  "link": "",
  "upvotes": ""
}]
```

### frontend script

1. render comment box
1. get comments from API
1. render comments


https://codepen.io/scottcn/pen/WNpRoZv comment list styles