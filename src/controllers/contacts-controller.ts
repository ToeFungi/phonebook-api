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
  }

  /**
   * Get all the contacts
   */
  public getContacts(request: Request, response: Response) {
    /**
     * Send the response back to the client
     */
    const sendResponse = (contacts: object) => response.json(contacts)
      .status(200)

    return this.contactsService.getContacts()
      .then(sendResponse)
  }
}

export { ContactsController }
