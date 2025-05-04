/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    cy.mount(<ZipFinder />)
    cy.get('[data-cy=inputCep]').as('inputCep')
    cy.get('[data-cy=submitCep]').as('submitCep')
  });

  const address = {
    street: 'Rua Joaquim Floriano',
    district: 'Itaim Bibi',
    city: 'São Paulo/SP',
    zipCode: '04534-011'
  }
  it('deve buscar um CEP na área de cobertura', () => {


    cy.get('@inputCep').type(address.zipCode)

    cy.get('[data-cy=submitCep]').click()

    cy.get('[data-cy=street]').should('have.text', address.street)
    cy.get('[data-cy=district]').should('have.text', address.district)
    cy.get('[data-cy=city]').should('have.text', address.city)
    cy.get('[data-cy=zipCode]').should('have.text', address.zipCode)
  })

  it('CEP deve ser obrigatório', () => {

    cy.get('@submitCep').click()

    cy.get('#swal2-title').should('have.text', 'Preencha algum CEP')
  })
})
