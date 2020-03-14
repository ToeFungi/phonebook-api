import * as Logger from 'bunyan'
import * as moment from 'moment'

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
     * Format the retrieved raw contact data and return a new array with the appropriately formatted contact data
     */
    const formatResponse = (rawContacts: RawContact[]): Contact[] => {
      if (!rawContacts.length) {
        this.logger.warn('No contacts could be found for the user', { rawContacts })
        return []
      }

      this.logger.debug('Formatting retrieved contacts for the user')
      return rawContacts.map((rawContact: RawContact): Contact => ({
        userId: rawContact._id,
        email: rawContact.email,
        mobile: rawContact.mobile,
        nickname: rawContact.nickname,
        lastname: rawContact.lastname,
        firstname: rawContact.firstname,
        mobileIDC: rawContact.mobileIDC
      }))
    }

    /**
     * Tap and log the response
     */
    const tapResponse = (contacts: Contact[]): Contact[] => {
      this.logger.debug('Successfully retrieved all contacts', { contacts, count: contacts.length })
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
    return this.contactsRepository.getAllContacts()
      .then(formatResponse)
      .then(tapResponse)
      .catch(tapError)
  }

  /**
   * Get a specific contact's data
   */
  public getContact(contactId: string): Promise<Contact> {
    /**
     * Format the retrieved raw contact data and return appropriately formatted contact
     */
    const formatResponse = (rawContact: RawContact): Contact => {
      if (!rawContact) {
        this.logger.error('No contact could be found with the ID specified', { contactId })
        throw new Error('Contact not found with specified ID')
      }

      this.logger.debug('Formatting retrieved client')
      return {
        userId: rawContact._id,
        email: rawContact.email,
        mobile: rawContact.mobile,
        nickname: rawContact.nickname,
        lastname: rawContact.lastname,
        firstname: rawContact.firstname,
        mobileIDC: rawContact.mobileIDC
      }
    }

    /**
     * Tap and log the response
     */
    const tapResponse = (contact: Contact): Contact => {
      this.logger.debug('Successfully retrieved the specific contact', { contact, contactId })
      return contact
    }

    /**
     * Tap and log error and rethrow to bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('Error occurred whilst retrieving the specific contact data', {
        message: error.message,
        contactId
      })
      throw error
    }

    this.logger.debug('Attempting to retrieve a specific contact', { contactId })
    return this.contactsRepository.getContactById(contactId)
      .then(formatResponse)
      .then(tapResponse)
      .catch(tapError)
  }

  /**
   * Create a new contact, format it appropriately and attempt to insert it into the database
   */
  public createContact(contact: Contact): Promise<Contact> {
    const createdAt = moment()
      .utc()
      .format()

    const formattedContact = {
      ...contact,
      createdAt,
      updatedAt: createdAt
    } as RawContact

    /**
     * Formatting the newly created raw contact
     */
    const formatResponse = (rawContact: RawContact): Contact => {
      this.logger.debug('Formatting newly created raw contact')
      return {
        userId: rawContact._id,
        email: rawContact.email,
        mobile: rawContact.mobile,
        nickname: rawContact.nickname,
        lastname: rawContact.lastname,
        firstname: rawContact.firstname,
        mobileIDC: rawContact.mobileIDC
      }
    }

    /**
     * Tap log the response and return the contact
     */
    const tapResponse = (contact: Contact): Contact => {
      this.logger.debug('Successfully created a new contact', { contact })
      return contact
    }

    /**
     * Tap log and rethrow the error to bubble up
     */
    const tapError = (error: Error): never => {
      this.logger.error('An error occurred whilst attempting to create a newly formatted contact', {
        message: error.message
      })
      throw error
    }

    this.logger.debug('Attempting to create newly formatted contact', { formattedContact })
    return this.contactsRepository.insertContact(formattedContact)
      .then(formatResponse)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { ContactsService }
