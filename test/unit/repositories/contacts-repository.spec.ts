import { createSandbox } from 'sinon'

import { loggerMock } from '../../support/mocks/logger-mock'
import { LoggerFactory } from '../../../src/factories/logger-factory'
import { mongoClientMock } from '../../support/mocks/mongo-client-mock'
import { ContactsRepository } from '../../../src/repositories/contacts-repository'
import { DatabaseConfiguration } from '../../../src/models/configuration/database-configuration'

import * as contact from '../../samples/repositories/contacts-repository/database-contact.json'
import * as rawContacts from '../../samples/repositories/contacts-repository/database-raw-contacts.json'

describe('ContactsRepository', () => {
  const sandbox = createSandbox()
  const logger = loggerMock(sandbox)

  const collectionName = 'contacts'
  const config = {
    name: 'some-database'
  } as DatabaseConfiguration

  let database: any
  let loggerFactory: any
  let contactsRepository: ContactsRepository

  beforeEach(() => {
    database = mongoClientMock(sandbox)
    loggerFactory = sandbox.createStubInstance(LoggerFactory)

    loggerFactory.getNamedLogger
      .returns(logger)

    database.db
      .onFirstCall()
      .returns(database)

    database.collection
      .onFirstCall()
      .returns(database)

    contactsRepository = new ContactsRepository(database, config, loggerFactory)
  })

  afterEach(() => {
    sandbox.restore()
  })

  describe('#getAllContacts', () => {
    beforeEach(() => {
      database.find
        .onFirstCall()
        .returns(database)
    })

    it('resolves when all the contacts are retrieved', () => {
      database.toArray
        .onFirstCall()
        .resolves(rawContacts)

      return contactsRepository.getAllContacts()
        .should.become(rawContacts)
        .then(() => {
          database.db.should.have.been.calledOnceWithExactly(config.name)
          database.collection.should.have.been.calledOnceWithExactly(collectionName)
          database.find.should.have.been.calledOnceWithExactly({})
          database.toArray.should.have.been.calledOnceWithExactly()
        })
    })

    it('resolves when no contacts are found and no error occurred', () => {
      database.toArray
        .onFirstCall()
        .resolves([])

      return contactsRepository.getAllContacts()
        .should.become([])
        .then(() => {
          database.db.should.have.been.calledOnceWithExactly(config.name)
          database.collection.should.have.been.calledOnceWithExactly(collectionName)
          database.find.should.have.been.calledOnceWithExactly({})
          database.toArray.should.have.been.calledOnceWithExactly()
        })
    })

    it('rejects when an error occurs whilst querying the database', () => {
      database.toArray
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return contactsRepository.getAllContacts()
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          database.db.should.have.been.calledOnceWithExactly(config.name)
          database.collection.should.have.been.calledOnceWithExactly(collectionName)
          database.find.should.have.been.calledOnceWithExactly({})
          database.toArray.should.have.been.calledOnceWithExactly()
        })
    })
  })

  describe('#getContactById', () => {
    const id = 'some-contact-id'
    const query = {
      userId: id
    }

    it('resolves when the contact is found with the specified ID', () => {
      database.findOne
        .onFirstCall()
        .resolves(contact)

      return contactsRepository.getContactById(id)
        .should.become(contact)
        .then(() => {
          database.db.should.have.been.calledOnceWithExactly(config.name)
          database.collection.should.have.been.calledOnceWithExactly(collectionName)
          database.findOne.should.have.been.calledOnceWithExactly(query)
        })
    })

    it('resolves empty when no contact is found with the specified ID', () => {
      database.findOne
        .onFirstCall()
        .resolves()

      return contactsRepository.getContactById(id)
        .should.be.fulfilled
        .then(() => {
          database.db.should.have.been.calledOnceWithExactly(config.name)
          database.collection.should.have.been.calledOnceWithExactly(collectionName)
          database.findOne.should.have.been.calledOnceWithExactly(query)
        })
    })

    it('rejects when an error occurs whilst querying the database', () => {
      database.findOne
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return contactsRepository.getContactById(id)
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
        .then(() => {
          database.db.should.have.been.calledOnceWithExactly(config.name)
          database.collection.should.have.been.calledOnceWithExactly(collectionName)
          database.findOne.should.have.been.calledOnceWithExactly(query)
        })
    })
  })

  describe('#insertContact', () => {
    it('resolves when a valid raw contact is supplied and the contact is inserted intp the database', () => {
      database.insertOne
        .onFirstCall()
        .resolves()

      return contactsRepository.insertContact(rawContacts[0])
        .should.become(rawContacts[0])
    })

    it('rejects when an error occurs whilst inserting the raw contact into the database', () => {
      database.insertOne
        .onFirstCall()
        .rejects(new Error('Something strange is afoot.'))

      return contactsRepository.insertContact(rawContacts[0])
        .should.be.rejectedWith(Error, 'Something strange is afoot.')
    })
  })
})
