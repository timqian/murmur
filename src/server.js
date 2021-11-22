import express from 'express'
import store from './store.js'

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

// Admin pannel
app.get('/', async (req, res) => {
  const URIs = await store.getURIs({
    after: req.query.after,
  });
  res.send(URIs);
})

// Get all URIs
app.get('/URIs', async (req, res) => {
  const URIs = await store.getURIs({
    after: req.query.after,
  });
  res.send(URIs);
})

// Get comments of URI
app.get('/URI/:uri', async (req, res) => {
  const { uri } = req.params;
  const commentsOfURI = await store.getCommentsOfURI({ uri })
  res.send(commentsOfURI)
})

// Add/Edit comment 
app.put('/comment', async (req, res) => {
  const { uri, parentId, author, content, email, link, likes } = req.body
  const comment = await store.addComment({
    uri, parentId, content, author, email, link, likes
  })
  res.send(comment)
})

app.delete('/comment/:uri', async (req, res) => {
  const {uri} = req.params;
  const {id} = req.query;
  console.log(uri, id)
  await store.deleteComment({uri, id})
  res.send('ok')
})

const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})