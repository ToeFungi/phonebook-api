import { Request, Response } from 'express'

import { Controller } from '../types/controller'
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

    this.logger.debug('Getting all contacts')
    return this.contactsService.getContacts()
      .then(sendResponse)
  }

  /**
   * Get a specific contact
   */
  public getContact(request: Request, response: Response): Promise<Response> {
    const contactId = request.params.contactId

    /**
     * Send the response back to the client
     */
    const sendResponse = (contacts: object) => response.json(contacts)
      .status(200)

    this.logger.debug('Getting a specific contact', { contactId })
    return this.contactsService.getContact(contactId)
      .then(sendResponse)
  }
}

export { ContactsController }
