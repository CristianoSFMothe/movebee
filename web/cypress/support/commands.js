/* eslint-disable no-undef */
Cypress.Commands.add('zipFinder', (address, mock = false) => {

  if (mock) {
    cy.intercept({
      method: 'GET',
      url: '/zipcode/*'
    }, {
      statusCode: 200,
      body: {
        cep: address.zipCode,
        logradouro: address.street,
        bairro: address.district,
        cidade_uf: address.city,
      }
    }).as('getZipCode')
  }

  cy.get('@inputCep').type(address.zipCode)
  cy.get('@submitCep').click({ force: true })

  if (mock) {
    cy.wait('@getZipCode')
  }

});