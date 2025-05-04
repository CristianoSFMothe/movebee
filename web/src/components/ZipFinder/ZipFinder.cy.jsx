/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import React from 'react'
import ZipFinder from './ZipFinder'

describe('<ZipFinder />', () => {

  beforeEach(() => {
    cy.mount(<ZipFinder />)

    cy.viewport(1200, 768)

    cy.get('[data-cy=inputCep]').as('inputCep')
    cy.get('[data-cy=submitCep]').as('submitCep')
  });

  it('deve buscar um CEP na área de cobertura', () => {
    const address = {
      street: 'Rua Joaquim Floriano',
      district: 'Itaim Bibi',
      city: 'São Paulo/SP',
      zipCode: '04534-011'
    }

    cy.zipFinder(address, true)

    cy.get('[data-cy=street]').should('have.text', address.street)
    cy.get('[data-cy=district]').should('have.text', address.district)
    cy.get('[data-cy=city]').should('have.text', address.city)
    cy.get('[data-cy=zipCode]').should('have.text', address.zipCode)
  })

  it('CEP deve ser obrigatório', () => {

    cy.get('@submitCep').click()

    cy.get('#swal2-title').should('have.text', 'Preencha algum CEP')
    cy.get('.swal2-confirm').should('be.visible')
    cy.get('.swal2-confirm').click()
  })

  it('CEP inválido', () => {
    const address = {
      zipCode: '0000000',
    }

    cy.zipFinder(address)

    cy.get('[data-cy="notice"]').should('be.visible')
    cy.get('[data-cy="notice"]').should('have.text', 'CEP no formato inválido.')
  })

  it('CEP fora da área de cobertura', () => {
    const address = {
      zipCode: '06150000',
    }

    cy.get('@inputCep').type(address.zipCode)

    cy.get('@submitCep').click()

    cy.get('[data-cy="notice"]').should('be.visible')
    cy.get('[data-cy="notice"]').should('have.text', 'No momento não atendemos essa região.')
  })
})


