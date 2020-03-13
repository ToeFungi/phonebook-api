import { Request, Response } from 'express'

import { Controller } from '../types/controller'
import { Contact } from '../models/contacts/contact'
import { LoggerFactory } from '../factories/logger-factory'
import { ContactsService } from '../services/contacts-service'

/**
 * Contacts controller handles requests relating to the contacts
 */
class ContactsController extends Controller {
  /**
   * @constructor
   */
  constructor(protected contactsService: ContactsService, loggerFactory: LoggerFactory) {
    super(loggerFactory.getNamedLogger('contacts-controller'))
  }

  /**
   * @inheritDoc
   */
  public setRoutes(): void {
    this.logger.info('Setting up routes for controller')
    this.router.get('/', this.getContacts.bind(this))
    this.router.get('/:contactId', this.getContact.bind(this))
    this.router.post('/', this.createContact.bind(this))
  }

  /**
   * Get all the contacts
   */
  public getContacts(request: Request, response: Response): Promise<Response> {
    /**
     * Send the response back to the client
     */
    const sendResponse = (contacts: object) => response.json(contacts)
      .status(200)

    /**
     * Handles thrown errors and return appropriate status and payload
     */
    const handleError = (error: Error) => {
      const payload = {
        message: error.message
      }

      return response.json(payload)
        .status(400)
    }

    this.logger.debug('Getting all contacts')
    return this.contactsService.getContacts()
      .then(sendResponse)
      .catch(handleError)
  }

  /**
   * Get a specific contact
   */
  public getContact(request: Request, response: Response): Promise<Response> {
    const contactId = request.params.contactId

    /**
     * Send the response back to the client
     */
    const sendResponse = (contact: Contact) => response.json(contact)
      .status(200)

    /**
     * Handles thrown errors and return appropriate status and payload
     */
    const handleError = (error: Error) => {
      const payload = {
        message: error.message
      }

      return response.json(payload)
        .status(400)
    }

    this.logger.debug('Getting a specific contact', { contactId })
    return this.contactsService.getContact(contactId)
      .then(sendResponse)
      .catch(handleError)
  }

  /**
   * Create a new contact
   */
  public createContact(request: Request, response: Response): Promise<Response> {
    const contact = request.body as Contact

    /**
     * Send the newly created contact back to the client
     */
    const sendResponse = (contact: Contact) => {
      this.logger.info('Successfully created a new client', { contact })
      return response.json(contact)
        .status(201)
    }

    /**
     * Handle thrown errors and return an appropriate status and payload
     */
    const handleError = (error: Error): Response => {
      const payload = {
        message: error.message
      }

      this.logger.info('Error occurred whilst creating a new contact', { contact, payload })
      return response.json(payload)
        .status(400)
    }

    this.logger.info('Attempting to create a new contact', { contact })
    return this.contactsService.createContact(contact)
      .then(sendResponse)
      .catch(handleError)
  }
}

export { ContactsController }
