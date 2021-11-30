import './style.css'
import axios from 'axios'
import gravatarUrl from 'gravatar-url'
import { format } from 'timeago.js'

const URI = window.location.href.split("#")[0]
const mainDiv = document.getElementById('murmur')
const murmurHost = mainDiv.getAttribute('host')
const http = axios.create({ baseURL: murmurHost })

/**
 * Render comment box
 */
mainDiv.insertAdjacentHTML('beforeend', `<form id="murmur-form">
  <textarea
    placeholder="Leave a comment"
    id="murmur-form-content"
    name="murmur-form-content"
    rows="2"
    required="required"
  ></textarea>
  <div id="murmur-form-author">
    <input
      type="text"
      name="murmur-form-name"
      id="murmur-form-name"
      required="required"
      placeholder="Your name"
    >
    <input
      type="email"
      name="murmur-form-email"
      id="murmur-form-email"
      required="required"
      placeholder="Email"
    >
    <input
      type="url"
      name="murmur-form-website"
      id="murmur-form-website"
      placeholder="Your website (optional)"
    >
  </div>
  <input
    id="murmur-form-submit"
    name="submit" type="submit" value="Post comment"
  >
</form>`)

mainDiv.insertAdjacentHTML('beforeend', '<div id="murmur-comment-list"></div>')

const form = document.getElementById('murmur-form')

form.addEventListener('submit', async (e) => {
  e.preventDefault()
  const formData = new FormData(e.target)
  const author = formData.get('murmur-form-name')
  const email = formData.get('murmur-form-email')
  const content = formData.get('murmur-form-content')
  const website = formData.get('murmur-form-website')

  await http.put('/comment', {
    uri: URI,
    author,
    email,
    content,
    website,
    timestamp: Date.now()
  })

  form.reset()
  renderComments()
})


/**
 * Render comment list
 */
const earlierComments = document.getElementById('murmur-comment-list')

async function renderComments() {
  earlierComments.innerHTML = ''

  const res = await http.get(`/comments?uri=${encodeURIComponent(URI)}`)
  const commentsData = res.data

  const commentsHTMLs = commentsData.map(comment => {
    const { author, email, content, timestamp, website, twitter } = comment
    let gravatarURL;
    try {
      gravatarURL = gravatarUrl(email, { size: 60 })
    } catch (e) {
      gravatarURL = '';
    }
    return `
      <div class='murmur-comment'>
        <img
          class='murmur-comment-avatar'
          src='${gravatarURL}'
        >
        <div class="murmur-comment-details">
          <p class="murmur-comment-meta">
            ${website 
              ? `<a href="${website}" target="_blank" class="murmur-comment-author-name">`
              : '<span class="murmur-comment-author-name">'
            } 
            ${author}
            ${website 
              ? `</a>`
              : '</span>'
            }
            <span class="murmur-comment-time">${format(timestamp)}</span>
          </p>
          <p class="murmur-comment-content">${content}</p>
        </div>
      </div>
    `
  })
  earlierComments.insertAdjacentHTML('afterbegin', `${commentsHTMLs.join('')}`)
}

renderComments()

/**
 * Toggle display of comment meta info
 */
const murmurFormContent = document.getElementById('murmur-form-content')
const murmurFormAuthor = document.getElementById('murmur-form-author')
const murmurFormSubmitBtn = document.getElementById('murmur-form-submit')

murmurFormAuthor.style.display = "none"
murmurFormSubmitBtn.style.display = "none"

murmurFormContent.addEventListener('click', () => {
  murmurFormAuthor.style.display = "flex"
  murmurFormSubmitBtn.style.display = "inline-flex"
})