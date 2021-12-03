<p></p>

<p align="center">
  <a href="https://murmur.moe">
    <img src="https://user-images.githubusercontent.com/5512552/143565305-3625e6a9-2a31-4af0-94a6-ac73c7ade6bc.png" width="100">
  </a>
<p align="center"><strong>A serverless, customizable comment system</strong></p>
</p>

<p></p>

## Features

- Serverless & Self-deployable
- Fully customizable, you decide
  - 💾 Where to store data
  - 💅 How the comments look like
  - ⚡️ How you deploy this service
  - 🔔️ How to get notified

## Usage

#### 1. Add murmur style and script to the `<head>`

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/murmur.moe@0/style.css"/>
<script defer src="https://cdn.jsdelivr.net/npm/murmur.moe@0/dist/murmur.umd.js"></script>
```

#### 2. Add a `<div>` to the place you want to display comments

```html
<div id="murmur" host="https://api.murmur.moe"></div>
```

**Note**: You can change the `host` to use your owen backend.

## Deploy backend

### Deploy to tencent cloud

#### 1. Open this repo in codespace or clone it to your computer
<img src="https://user-images.githubusercontent.com/5512552/144537250-f89d28f2-1cfd-4861-85a0-fe73fe471edf.png" width="100">

#### 2. Add `.env` file in `backend` folder
```bash
STORE_PLUGIN=s3
STORE_END_POINT=https://cos.ap-hongkong.myqcloud.com
STORE_SECRET_ID=****
STORE_SECRET_KEY=****

## Choose a bucket
STORE_BUCKET=serverless-comment-1303103251
STORE_REGION=ap-hongkong
SERVERLESS_PLATFORM_VENDOR=tencent
```
#### 3. Add `serverless.yml` file in `backend` folder
```yaml
# serverless.yml
component: http
name: serverless-comment-api
inputs:
  src: ./
  faas:
    runtime: Nodejs12.16
    framework: express
    name: ${name}
  apigw:
    protocols:
      - http
      - https
```

#### 4. Enter `backend` dir
```bash
cd backend
```

#### 5. Install `serverless` framework and Deploy
```bash
# Install serverless cli
npm i serverless -g

# Enter backend dir
cd backend

# Install dependencies
npm install --production

# Deploy to tencent scf
serverless deploy
```

### Deploy to other cloud (TODO)
- [Deploy to AWS]()
- [Deploy to Tencent cloud]()
- [Deploy to Vercel]()
- [Self-deploy]()

## Contribute
- [Write a store plugin]()
- [Write a notification plugin]()
- [Write a theme]()
