describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function () {
    cy.contains('Log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('Login').click()
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.get('.error').should('contain', 'Wrong username or password')
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' })
    })

    it('A blog can be created', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-button').click()

      cy.get('.error').should('contain', 'Added test title')
    })

    it('A blog can be liked by user', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-button').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.wait(2000)
      cy.get('#like-button').click()
      cy.wait(2000)
      cy.contains('likes 2')
    })

    it('A blog can be deleted by user who created it', function () {
      cy.contains('create new blog').click()
      cy.get('#title').type('test title')
      cy.get('#author').type('test author')
      cy.get('#url').type('test url')
      cy.get('#submit-button').click()
      cy.get('#view-button').click()
      cy.get('#remove-button').click()

      cy.get('#title').not('test title')
    })

    describe('when logged in and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'author1',
          url: 'url1',
        })
        cy.createBlog({
          title: 'second blog',
          author: 'author2',
          url: 'url2',
        })
        cy.createBlog({
          title: 'third blog',
          author: 'author3',
          url: 'url3',
        })
      })
      it('Blogs are ordered with the most-liked blog first', function () {
        cy.get('.wrapper').each((item) => {
          item.find('#view-button').click()
        })
        // click second blog like second 2 times
        cy.contains('second blog')
          .parents('.wrapper')
          .find('#like-button')
          .click()
        cy.wait(2000)
        cy.contains('second blog')
          .parents('.wrapper')
          .find('#like-button')
          .click()
        cy.wait(2000)
        // click third blog like second 1 times
        cy.contains('third blog')
          .parents('.wrapper')
          .find('#like-button')
          .click()
        cy.wait(2000)

        cy.get('.wrapper').first().contains('likes 2')
      })
    })
  })
})
