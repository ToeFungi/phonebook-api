/**
 * Implementations of an HTTP server
 */
interface Server {
  /**
   * Begin the instance
   */
  run(): Promise<void>

  /**
   * Stop the instance
   */
  shutdown(): Promise<void>
}

export { Server }
