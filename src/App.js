import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import "./App.css";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [newUrl, setNewUrl] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    if (user) {
      const getBlogs = async () => {
        const showAllBlog = await blogService.getAll();

        const showFilterBlog = showAllBlog.filter(
          (blog) => blog.user.username === user.username
        );

        setBlogs(showFilterBlog);
      };
      getBlogs();
    }
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username: newUsername,
        password: newPassword,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);

      setNewUsername("");
      setNewPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (event) => {
    event.preventDefault();

    try {
      const blog = {
        title: newTitle,
        author: newAuthor,
        url: newUrl,
        id: Math.random(),
      };

      const returnedBlog = await blogService.create(blog);
      setBlogs(blogs.concat(returnedBlog));
      setErrorMessage(`Added ${blog.title}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch (exception) {
      const responseErrorMessage = exception.response.data.error;
      setErrorMessage(`${responseErrorMessage}`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    setNewTitle("");
    setNewAuthor("");
    setNewUrl("");
  };

  const handleUsernameChange = ({ target }) => {
    setNewUsername(target.value);
  };

  const handlePasswordChange = ({ target }) => {
    setNewPassword(target.value);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value);
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setBlogs([]);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2> Log in to application </h2>
        <LoginForm
          handleLogin={handleLogin}
          newUsername={newUsername}
          handleUsernameChange={handleUsernameChange}
          newPassword={newPassword}
          handlePasswordChange={handlePasswordChange}
        />
      </div>
    );
  }

  return (
    <div>
      <Notification message={errorMessage} />
      <h2>blogs</h2>
      <div>
        {user.username} logged in
        <button onClick={handleLogOut}>Log out</button>
      </div>
      <br />
      <h2>Create new Blog</h2>

      <BlogForm
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
      />
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default App;
