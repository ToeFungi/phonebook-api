/**
 * Representation of the logging specific configuration required
 */
interface LoggerConfiguration {
  /**
   * The level of logging that is required i.e debug/info/trace
   */
  level: string
  /**
   * The base name of the service
   */
  service: string
}

export { LoggerConfiguration }
