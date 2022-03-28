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
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title}
          <button onClick={() => setBlogVisible(true)}>View</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div>
          {blog.title}
          <button onClick={() => setBlogVisible(false)}>Hide</button>
        </div>
        <div>{blog.author}</div>
        <div>{blog.url}</div>
        <div>
          likes {blog.likes}
          <button data-testid={blog.id} onClick={() => handleLikesBlog(blog)}>
            like
          </button>
        </div>
        <p>
          <button
            style={{ backgroundColor: 'lightblue' }}
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
