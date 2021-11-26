# [murmur](https://murmur.moe)

A serverless, customizable comment system

## Features

- Serverless & Self-deployable
- Fully customizable, you decide
  - 💾 Where to store data
  - 💅 How the comments look like
  - ⚡️ How you deploy this service
  - ✉️ How to get notified

### Usage

#### 1. Add murmur `css` and `js` to the `<head>`

```html
<head>
  <link
    rel="stylesheet"
    href="https://cdn.jsdelivr.net/npm/murmur.moe@0/style.css"
  />
  <script
    defer
    src="https://cdn.jsdelivr.net/npm/murmur.moe@0/dist/murmur.umd.js"
  ></script>
</head>
```

#### 2. Embed murmur to the place you want to display comments

```html
<body>
  <div id="murmur.moe" host=""></div>
  <!--
  <div id="murmur.moe" host="https://URL-of-your-murmur-api.com"></div>
  -->
</body>
```
