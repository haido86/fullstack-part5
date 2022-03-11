import React from "react";

const BlogForm = ({
  addBlog,
  newTitle,
  handleTitleChange,
  newAuthor,
  handleAuthorChange,
  newUrl,
  handleUrlChange,
}) => {
  return (
    <div>
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
          <button type="submit">Create</button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
