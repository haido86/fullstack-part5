import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import "./App.css";
import Toggable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    if (user) {
      const getBlogs = async () => {
        const showAllBlog = await blogService.getAll();

        const sortedBlogByLikes = showAllBlog.sort(
          (firstItem, secondItem) => secondItem.likes - firstItem.likes
        );

        setBlogs(sortedBlogByLikes);
      };
      getBlogs();
    }
  }, [user, refresh]);

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
        username: username,
        password: password,
      });

      window.localStorage.setItem("loggedBlogappUser", JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);

      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong username or password");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const addBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      setRefresh();
      setErrorMessage(`Added ${blogObject.title}`);
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
  };

  const handleLogOut = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    setUser(null);
    setBlogs([]);
  };

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <h2> Log in to application </h2>
        <Toggable buttonLabel="login">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            handleUsernameChange={({ target }) => {
              setUsername(target.value);
            }}
            password={password}
            handlePasswordChange={({ target }) => {
              setPassword(target.value);
            }}
          />
        </Toggable>
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
      <Toggable buttonLabel="create new blog">
        <BlogForm createBlog={addBlog} />
      </Toggable>
      <br />
      <div>
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleRefresh={handleRefresh}
            user={user}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
