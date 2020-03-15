# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.4.0] - 2020-03-15
### Added
- Added linting to CI to ensure code consistency
- Added auditing to CI to prevent known vulnerabilities from being deployed into production

### Updated
- Updated the README to include the new test suites

## [0.3.0] - 2020-03-12
### Added
- Added an MIT license for anyone to use the application
- Added `/collections` directory which includes postman and insomnia workspaces for accessing the API
- Implemented `Loggly` into the logger factory for centralised logging on production
- Added `sonarcloud` analysis in the CI for code quality and vulnerability checks
- Created unit tests for several classes
  - express-server
  - contacts-service
  - health-controller
  - contacts-repository
  - contacts-controller
  - correlation-id-middleware
  - database-connection-factory
  - stream-correlation-id-decorator
- Implemented correlation ID with middleware to requests and logs
- Add coverage tests to CI for code analysis

### Updated
- Fleshed out the README a bit more. Documented the endpoints, environment etc...

## [0.2.0] - 2020-02-26
### Added
- Implemented endpoint to retrieve specific contact data
- Added a changelog 😍
