import * as Logger from 'bunyan'

import { FilterQuery, MongoClient, MongoError, ObjectId } from 'mongodb'

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
   * The database that will be queried
   */
  private readonly databaseName: string
  /**
   * The collection that will be queried
   */
  private readonly collectionName: string

  /**
   * @constructor
   */
  constructor(protected database: MongoClient, configuration: DatabaseConfiguration, loggerFactory: LoggerFactory) {
    this.logger = loggerFactory.getNamedLogger('contact-repository')

    this.databaseName = configuration.name
    this.collectionName = 'contacts'
  }

  /**
   * Retrieve all contact data from the database
   */
  public getAllContacts(): Promise<RawContact[]> {
    const query = {}

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

    this.logger.debug('Attempting to retrieve all contacts', {
      collection: this.collectionName,
      database: this.databaseName
    })
    return this.database.db(this.databaseName)
      .collection(this.collectionName)
      .find<RawContact>(query)
      .toArray()
      .then(tapResponse)
      .catch(tapError)
  }

  /**
   * Retrieve a specific contact's details from the database
   */
  public getContactById(id: string): Promise<RawContact> {
    const objectId = new ObjectId(id)
    const query: FilterQuery<any> = {
      _id: {
        $in: [objectId]
      }
    }


    /**
     * Tap and log the response and return the raw contact data
     */
    const tapResponse = (result: RawContact): RawContact => {
      this.logger.debug('Successfully retrieved specific contact', { result })
      return result
    }

    /**
     * Tap and log the error and rethrow to let it bubble up
     */
    const tapError = (error: MongoError): never => {
      this.logger.error('Error occurred whilst retrieving specific contact', { message: error.errmsg })
      throw error
    }

    this.logger.debug('Attempting to retrieve specific contact', { contactId: id, query })
    return this.database.db(this.databaseName)
      .collection(this.collectionName)
      .findOne<RawContact>(query)
      .then(tapResponse)
      .catch(tapError)
  }

  /**
   * Insert a new contact into the database
   */
  public insertContact(rawContact: RawContact): Promise<RawContact> {
    /**
     * Tap log the response of inserting a contact and return the raw contact
     */
    const tapResponse = () => {
      this.logger.debug('Successfully inserted raw contact into the database', { rawContact })
      return rawContact
    }

    /**
     * Tap log and rethrow the error to bubble up
     */
    const tapError = (error: MongoError): never => {
      this.logger.error('Error occurred whilst inserting a raw contact into the database', { message: error.errmsg })
      throw error
    }

    this.logger.debug('Attempting to insert raw contact into the database', { rawContact })
    return this.database.db(this.databaseName)
      .collection<RawContact>(this.collectionName)
      .insertOne(rawContact)
      .then(tapResponse)
      .catch(tapError)
  }
}

export { ContactsRepository }
