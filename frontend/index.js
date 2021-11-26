import './style.css'
import axios from 'axios'
import gravatarUrl from 'gravatar-url'
import { format } from 'timeago.js'

const URI = window.location.href.split("#")[0]
const mainDiv = document.getElementById('murmur.moe')
const murmurHost = mainDiv.getAttribute('host')
const http = axios.create({ baseURL: murmurHost })

mainDiv.insertAdjacentHTML('beforeend', '<div id="murmur.moe-respond"></div>')
mainDiv.insertAdjacentHTML('beforeend', '<div id="murmur.moe-earlier-comments"></div>')

const respond = document.getElementById('murmur.moe-respond')
const earlierComments = document.getElementById('murmur.moe-earlier-comments')

respond.insertAdjacentHTML('beforeend', `
<div id="respond">

  <h3>Leave a comment</h3>
  <form id="murmur-form">
  <textarea  placeholder="Leave a comment" name="comment" id="comment" rows="2" tabindex="4"  required="required"></textarea>
  <div id="author-boxes">
    <input type="text" name="comment_author" id="comment_author" value="" tabindex="1" required="required" placeholder="Your name">
    <input type="email" name="email" id="email" value="" tabindex="2" required="required" placeholder="Email">
  </div>

  <input class="button-18" name="submit" type="submit" value="Post comment" id="murmur-submit"/>

  </form>

</div>
`)

const form = document.getElementById('murmur-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const author = formData.get('comment_author')
  const email = formData.get('email')
  const content = formData.get('comment')

  await http.put('/comment', {
    uri: URI,
    author,
    email,
    content,
    timestamp: Date.now()
  })

  form.reset()
  renderComments()
})

async function renderComments() {
  earlierComments.innerHTML = ''

  const res = await http.get(`/comments?uri=${encodeURIComponent(URI)}`)
  const commentsData = res.data

  const commentsHTMLs = commentsData.map(comment => {
    const { author, email, content, timestamp, website, twitter } = comment
    console.log(email)
    return `
      <div class='friend'>
        <img src='${gravatarUrl(email, { size: 60 })}'>
        <div>
          <p><strong>${author}</strong>&nbsp<small>${format(timestamp)}</small></p>
          <p>${content}</p>
        </div>
      </div>
    `
  })
  earlierComments.insertAdjacentHTML('afterbegin', `
  ${commentsHTMLs.join('')}
`)
}

renderComments()