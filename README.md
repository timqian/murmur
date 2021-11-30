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

- [Deploy to AWS]()
- [Deploy to Tencent cloud]()
- [Deploy to Vercel]()
- [Self-deploy]()

## Contribute
- [Write a store plugin]()
- [Write a notification plugin]()
- [Write a theme]()