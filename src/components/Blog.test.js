import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import Blog from './Blog'

test('renders blog title and author', () => {
  const user = {
    username: 'liam',
  }
  const blog = {
    title: 'I want to go home',
    author: 'Son J.',
    user: { username: 'liam' },
  }

  render(<Blog blog={blog} user={user} />)

  expect(screen.getAllByText('I want to go home')).toBeDefined()
  expect(screen.getAllByText('Son J.')).toBeDefined()
})

test('the blog url and number of likes are shown when the button controlling the shown details has been clicked', () => {
  const user = {
    username: 'liam',
  }
  const blog = {
    id: 1,
    title: 'I want to go home',
    author: 'Son J.',
    url: 'home',
    likes: '12',
    user: { username: 'liam' },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} handleLikesBlog={mockHandler} />)

  const button = screen.getByTestId('1')
  userEvent.click(button)

  expect(screen.getAllByText('home')).toBeDefined()
  expect(screen.getAllByText('likes 12')).toBeDefined()
})

test('like button is clicked twice, the event handler the component received as props is called twice', async () => {
  const user = {
    username: 'liam',
  }
  const blog = {
    id: 1,
    title: 'I want to go home',
    author: 'Son J.',
    url: 'home',
    likes: '12',
    user: { username: 'liam' },
  }

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} handleLikesBlog={mockHandler} />)

  const button = screen.getByTestId('1')
  userEvent.click(button)
  userEvent.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls submit  ', () => {
  const createBlog = jest.fn()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('write here title')
  const authorInput = screen.getByPlaceholderText('write here author')
  const urlInput = screen.getByPlaceholderText('write here url')

  const sendButton = screen.getByText('Create')

  userEvent.type(titleInput, 'testing a title...')
  userEvent.type(authorInput, 'testing an author...')
  userEvent.type(urlInput, 'testing an url...')
  userEvent.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0]).toEqual({
    author: 'testing an author...',
    title: 'testing a title...',
    url: 'testing an url...',
  })
})
