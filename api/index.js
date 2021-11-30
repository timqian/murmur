const express = require('express')
const cors = require('cors')
const store = require('./store.js')
const path = require('path')
const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

// Admin pannel
app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname, './public/index.html'))
})

// Get all URIs
app.get('/URIs', async (req, res) => {
  const URIs = await store.getURIs({
    after: req.query.after,
  })
  res.send(URIs)
})

// Get comments of URI
app.get('/comments', async (req, res) => {
  const { uri } = req.query
  if (!uri) {
    res.status(400).send('uri is required')
    return
  }
  try {
    const commentsOfURI = await store.getCommentsOfURI({ uri })
    res.send(commentsOfURI)
  } catch (error) {
    res.send([])
  }
})

// Add/Edit comment 
app.put('/comment', async (req, res) => {
  const { uri, parentId, author, content, email, website, likes, timestamp } = req.body
  if (!email || !author || !content) {
    res.status(400).send('email, author and content are required')
    return
  }
  const comment = await store.addComment({
    uri, parentId, content, author, email, website, likes, timestamp
  })
  res.send(comment)
})

app.delete('/comment', async (req, res) => {
  const {id, uri} = req.query
  if (!id || !uri) {
    res.status(400).send('id and uri are required')
    return
  }
  await store.deleteComment({uri, id})
  res.send('ok')
})

const port = process.env.PORT || 9000

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})