/**
 * Representation of the database specific configuration required
 */
interface DatabaseConfiguration {
  /**
   * The url to the database for the connection
   */
  url: string
  /**
   * The name of the database to access
   */
  name: string
  /**
   * The type of database engine that will be used
   */
  engine: string
  /**
   * Username credential for database access
   */
  username: string
  /**
   * Password credential for database access
   */
  password: string
}

export { DatabaseConfiguration }
