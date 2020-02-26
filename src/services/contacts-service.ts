import * as Logger from 'bunyan'

import { Contact } from '../models/contacts/contact'
import { RawContact } from '../models/contacts/raw-contact'
import { LoggerFactory } from '../factories/logger-factory'
import { ContactsRepository } from '../repositories/contacts-repository'

/**
 * Contacts Service handles the manipulation of contact related data
 */
class ContactsService {
  /**
   * The logger for the contact service
   */
  private logger: Logger

  /**
   * @constructor
   */
  constructor(protected contactsRepository: ContactsRepository, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('contacts-service')
  }

  /**
   * Get all contacts
   */
  public getContacts(): Promise<Contact[]> {
    /**
     * Format the returned raw contact data and return a new array with the appropriately formatted contact data
     */
    const formatResponse = (rawContacts: RawContact[]) => rawContacts.map((rawContact: RawContact): Contact => ({
      email: rawContact.email,
      firstname: rawContact.firstname,
      lastname: rawContact.lastname,
      mobile: rawContact.mobile,
      mobileIDC: rawContact.mobileIDC,
      nickname: rawContact.nickname,
      userId: rawContact.userId
    }))

    /**
     * Tap and log the response
     */
    const tapResponse = (contacts: Contact[]): Contact[] => {
      this.logger.debug('Successfully retrieved all contacts', { count: contacts.length })
      return contacts
    }

    /**
     * Tap and log error and rethrow to bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('Error occurred whilst retrieving contacts data', { message: error.message })
      throw error
    }

    this.logger.debug('Attempting to retrieve all contacts')
    return this.contactsRepository.getContacts()
      .then(formatResponse)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { ContactsService }
