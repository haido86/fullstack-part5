import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new Blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <p>
            title: <input value={newTitle} onChange={handleTitleChange} />
          </p>
          <p>
            author: <input value={newAuthor} onChange={handleAuthorChange} />
          </p>
          <p>
            url: <input value={newUrl} onChange={handleUrlChange} />
          </p>
        </div>
        <div>
          <button type='submit'>Create</button>
        </div>
      </form>
    </div>
  )
}

export default BlogForm
