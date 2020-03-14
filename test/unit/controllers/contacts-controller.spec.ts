import { createSandbox } from 'sinon'
import { Request, Response } from 'express'
import { MockRequest, MockResponse, createResponse, createRequest } from 'node-mocks-http'

import { loggerMock } from '../../support/mocks/logger-mock'
import { ContactsController } from '../../../src/controllers/contacts-controller'
import { LoggerFactory } from '../../../src/factories/logger-factory'
import { ContactsService } from '../../../src/services/contacts-service'

import * as contactData from '../../samples/controllers/contacts-controller/contacts-service-contact.json'
import * as contactsData from '../../samples/controllers/contacts-controller/contacts-service-contacts.json'

describe('ContactsController', () => {
  const sandbox = createSandbox()
  const logger = loggerMock(sandbox)

  let request: MockRequest<Request>
  let response: MockResponse<Response>

  let loggerFactory: any
  let contactsService: any
  let contactsController: ContactsController

  beforeEach(() => {
    request = createRequest()
    response = createResponse()

    loggerFactory = sandbox.createStubInstance(LoggerFactory)
    contactsService = sandbox.createStubInstance(ContactsService)

    loggerFactory.getNamedLogger
      .returns(logger)

    contactsController = new ContactsController(contactsService, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getContacts', () => {
    it('resolves with appropriate status code and list of contact data', () => {
      contactsService.getContacts
        .onFirstCall()
        .resolves(contactsData)

      return contactsController.getContacts(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(200)
          response._getJSONData()
            .should.deep.equal(contactsData)
        })
    })

    it('resolves with appropriate status code and error message when contacts could not be retrieved', () => {
      const errorMessage = {
        message: 'Something strange is afoot.'
      }

      contactsService.getContacts
        .onFirstCall()
        .rejects(new Error(errorMessage.message))

      return contactsController.getContacts(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(400)
          response._getJSONData()
            .should.deep.equal(errorMessage)
        })
    })
  })

  describe('#getContact', () => {
    it('resolves with appropriate status code and the specified contact', () => {
      contactsService.getContact
        .onFirstCall()
        .resolves(contactData)

      return contactsController.getContact(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(200)
          response._getJSONData()
            .should.deep.equal(contactData)
        })
    })

    it('resolves with appropriate status code and error message when the specified contact could not be found', () => {
      const errorMessage = {
        message: 'Something strange is afoot.'
      }

      contactsService.getContact
        .onFirstCall()
        .rejects(new Error(errorMessage.message))

      return contactsController.getContact(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(400)
          response._getJSONData()
            .should.deep.equal(errorMessage)
        })
    })
  })

  describe('#createContact', () => {
    it('resolves with appropriate status code and the newly created contact', () => {
      contactsService.createContact
        .onFirstCall()
        .resolves(contactData)

      return contactsController.createContact(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(201)
          response._getJSONData()
            .should.deep.equal(contactData)
        })
    })

    it('resolves with appropriate status code and error message when the contact could not be created', () => {
      const errorMessage = {
        message: 'Something strange is afoot.'
      }

      contactsService.createContact
        .onFirstCall()
        .rejects(new Error(errorMessage.message))

      return contactsController.createContact(request, response)
        .should.become(response)
        .then(() => {
          response.statusCode.should.deep.equal(400)
          response._getJSONData()
            .should.deep.equal(errorMessage)
        })
    })
  })
})
