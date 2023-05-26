describe('Site', () => {
  it('works', () => {
    cy.visit('/')
    cy.findByText(/home page/i)
    cy.findByRole('link', { name: /styleguide/i }).click({ force: true })
    cy.findByText(/text styles/i)
  })
})
