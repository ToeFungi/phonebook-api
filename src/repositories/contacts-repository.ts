import * as Logger from 'bunyan'

import { MongoClient, MongoError } from 'mongodb'

import { RawContact } from '../models/contacts/raw-contact'
import { LoggerFactory } from '../factories/logger-factory'
import { DatabaseConfiguration } from '../models/configuration/database-configuration'

/**
 * Contacts Repository handles the retrieval and setting of data relating to contacts within the database
 */
class ContactsRepository {
  /**
   * The child logger used in this repository
   */
  private logger: Logger

  /**
   * @constructor
   */
  constructor(protected database: MongoClient, protected config: DatabaseConfiguration, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('contact-repository')
  }

  /**
   * Retrieve all contact data from the database
   */
  public getContacts(): Promise<RawContact[]> {
    const query = {}
    const collectionName = 'contacts'
    const databaseName = this.config.name

    /**
     * Tap and log the response and return the raw contact data
     */
    const tapResponse = (result: RawContact[]): RawContact[] => {
      this.logger.debug('Successfully retrieved contacts data', { count: result.length })
      return result
    }

    /**
     * Tap and log the error and rethrow to let it bubble up
     */
    const tapError = (error: MongoError): never => {
      this.logger.error('Error occurred whilst retrieving contacts data', { message: error.errmsg })
      throw error
    }

    this.logger.debug('Attempting to retrieve all contacts', { collectionName, databaseName })
    return this.database.db(databaseName)
      .collection(collectionName)
      .find(query)
      .toArray()
      .then(tapResponse)
      .catch(tapError)
  }
}

export { ContactsRepository }
