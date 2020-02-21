/**
 * Representation of the configuration required by a database connection
 */
interface DatabaseConfiguration {
  url: string
  engine: string
  username: string
  password: string
}

export { DatabaseConfiguration }
