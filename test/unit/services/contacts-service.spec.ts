import { createSandbox } from 'sinon'

import { loggerMock } from '../../support/mocks/logger-mock'
import { LoggerFactory } from '../../../src/factories/logger-factory'
import { ContactsService } from '../../../src/services/contacts-service'
import { ContactsRepository } from '../../../src/repositories/contacts-repository'

import * as contact from '../../samples/services/contacts-service/contact-repository-contact.json'
import * as contacts from '../../samples/services/contacts-service/contacts-repository-contacts.json'
import * as rawContact from '../../samples/services/contacts-service/contact-repository-raw-contact.json'
import * as rawContacts from '../../samples/services/contacts-service/contacts-repository-raw-contacts.json'

describe('ContactsService', () => {
  const sandbox = createSandbox()
  const logger = loggerMock(sandbox)

  let loggerFactory: any
  let contactsRepository: any
  let contactsService: ContactsService

  beforeEach(() => {
    loggerFactory = sandbox.createStubInstance(LoggerFactory)
    contactsRepository = sandbox.createStubInstance(ContactsRepository)

    loggerFactory.getNamedLogger
      .returns(logger)

    contactsService = new ContactsService(contactsRepository, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getAllContacts', () => {
    it('resolves with a list of contacts when no error occur', () => {
      contactsRepository.getAllContacts
        .onFirstCall()
        .resolves(rawContacts)

      return contactsService.getContacts()
        .should.become(contacts)
        .then(() => {
          contactsRepository.getAllContacts.should.have.been.calledOnceWithExactly()
        })
    })

    it('resolves with an empty list when no contacts exist for the user', () => {
      contactsRepository.getAllContacts
        .onFirstCall()
        .resolves([])

      return contactsService.getContacts()
        .should.become([])
        .then(() => {
          contactsRepository.getAllContacts.should.have.been.calledOnceWithExactly()
        })
    })

    it('rejects when an error occurs whilst querying the repository', () => {
      contactsRepository.getAllContacts
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return contactsService.getContacts()
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          contactsRepository.getAllContacts.should.have.been.calledOnceWithExactly()
        })
    })
  })

  describe('#getContactById', () => {
    const contactId = 'some-contact-id'

    it('resolves with a contact when the specified contact exists with the correct ID', () => {
      contactsRepository.getContactById
        .onFirstCall()
        .resolves(rawContact)

      return contactsService.getContact(contactId)
        .should.become(contact)
        .then(() => {
          contactsRepository.getContactById.should.have.been.calledOnceWithExactly(contactId)
        })
    })

    it('rejects with an appropriate error message when no user can be found with the ID specified', () => {
      contactsRepository.getContactById
        .onFirstCall()
        .resolves()

      return contactsService.getContact(contactId)
        .should.be.rejectedWith(Error, 'Contact not found with specified ID')
        .then(() => {
          contactsRepository.getContactById.should.have.been.calledOnceWithExactly(contactId)
        })
    })

    it('rejects when an error occurs whilst querying the repository', () => {
      contactsRepository.getContactById
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return contactsService.getContact(contactId)
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          contactsRepository.getContactById.should.have.been.calledOnceWithExactly(contactId)
        })
    })
  })
})
