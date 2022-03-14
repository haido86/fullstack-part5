import React, { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, handleRefresh, user }) => {
  const [blogVisible, setBlogVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const hideWhenVisible = { display: blogVisible ? "none" : "" };
  const showWhenVisible = { display: blogVisible ? "" : "none" };

  const handleLikesBlog = async () => {
    await blogService.update(blog.id, { likes: +blog.likes + 1 });

    handleRefresh();
  };

  const handleRemoveBlog = async () => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author} `)) {
      await blogService.eliminate(blog.id);
      handleRefresh();
    }
  };

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
          <button onClick={handleLikesBlog}>like</button>
        </div>
        <p>
          <button
            style={{ backgroundColor: "lightblue" }}
            onClick={handleRemoveBlog}
            disabled={user.username !== blog.user.username}
          >
            Remove
          </button>
        </p>
      </div>
    </div>
  );
};

export default Blog;
