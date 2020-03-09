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
  /**
   * Token used for authentication on loggly
   */
  logglyToken: string
  /**
   * The subdomain address used to deliver logs to
   */
  logglySubdomain: string
}

export { LoggerConfiguration }
