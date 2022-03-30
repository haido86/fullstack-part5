import React, { useState } from 'react'

const Blog = ({ blog, user, handleLikesBlog, handleRemoveBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const hideWhenVisible = { display: blogVisible ? 'none' : '' }
  const showWhenVisible = { display: blogVisible ? '' : 'none' }

  return (
    <div className='wrapper' style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          <span>{blog.title}</span>
          <button id='view-button' onClick={() => setBlogVisible(true)}>
            View
          </button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          <span>{blog.title}</span>
          <button onClick={() => setBlogVisible(false)}>Hide</button>
        </div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          likes <span id='like'>{blog.likes}</span>
          <button id='like-button' onClick={() => handleLikesBlog(blog)}>
            like
          </button>
        </div>
        <p>
          <button
            style={{ backgroundColor: 'lightblue' }}
            id='remove-button'
            onClick={() => handleRemoveBlog(blog)}
            disabled={user.username !== blog.user.username}
          >
            Remove
          </button>
        </p>
      </div>
    </div>
  )
}

export default Blog
