# Phonebook API
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=phonebook-rest-api&metric=alert_status)](https://sonarcloud.io/dashboard?id=phonebook-rest-api)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=phonebook-rest-api&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=phonebook-rest-api)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=phonebook-rest-api&metric=code_smells)](https://sonarcloud.io/dashboard?id=phonebook-rest-api)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=phonebook-rest-api&metric=coverage)](https://sonarcloud.io/dashboard?id=phonebook-rest-api)

This simple application was created for the sole purpose of being a portfolio application. It serves no real world
purpose outside of this scope. The application takes the form of a NodeJS application that utilises TypeScript and
provides a RESTful Express API. It integrates with MongoDB as the datasource of choice and is hosted on Heroku.
Deployments are automated on a push to master through Travis CI and code analysis is provided through SonarCloud. All
logging is centralised on Loggly with appropriate correlation ID's, either provided or generated, to trace requests 
through the system.

## Table of Contents
- [Get Started](#get-started)
- [Endpoints](#endpoints)
    - [Insomnia and Postman Workspaces](#insomnia-and-postman-workspaces)
    - [Contacts](#contacts)
        - [Get a Contact](#get-a-contact)
        - [Get All Contacts](#get-all-contacts)
    - [Health](#health)
        - [Get Health](#get-health)
- [Follow Development](#follow-development)
- [Environment Variables](#environment-variables)
- [Testing](#testing)
- [Logging](#logging)

## Get Started
You can get started with your own locally hosted instance of this application quite quickly and painlessly.
```bash
$ git clone https://github.com/ToeFungi/phonebook-api.git
$ cd phonebook-api
$ npm i
```
You'll need to setup your environment variables in a `.env` file that should be at the top level of your application.
You can find precisely what the required environment variables are documented further down in the README OR you can
[jump there now.](#environment-variables)

## Endpoints
There are a number of endpoints that are available through this API. In essence, a user should be able to create an
account, login with that account, create, get, update and delete their private contacts list as will as query the health
status of the API. Below is a more descriptive explanation on each endpoint.

#### Insomnia and Postman Workspaces
You can find workspaces for both Insomnia and Postman within the repository under `collections`. You'll be able to
import these workspaces and test the below API endpoints for yourself. Alternatively, if you are cloning this repository
then you can use the local workspace instead and test everything locally!

#### Contacts
The contacts endpoints are everything to do with how contacts are handled. The create, read, update and delete endpoints
will be documented here and briefly explained. Please use the workspaces to test these endpoints.

#### Get a Contact
The retrieval of a specific contact by ID is available on a GET endpoint and the contact's ID should be provided in the
path. This will then return a JSON object along with a 200. If no contact can be found corresponding to the given ID,
then a status of 404 will be returned with a JSON body that includes a message indicating that the contact could not be
found.

`[GET] /contacts/:contactId`

Response 200
```json
{
  "email": "john.smith@gmail.com",
  "mobile": "0828097121",
  "contactId": "5e4fe9c61c9d440000f3af57",
  "nickname": "Johnny",
  "lastname": "Smith",
  "firstname": "John",
  "mobileIDC": "+27"
}
```

Response 404
```json
{
  "error": "NOT_FOUND",
  "message": "Contact could not be found with the provided ID"
}
```

#### Get All Contacts
You can retrieve all of the contacts available by not specifying an ID and this will return a JSON body that contains
an array of contacts available. The response code will be a 200.

`[GET] /contacts`

Response 200
```json
[
  {
    "email": "john.smith@gmail.com",
    "mobile": "0828097121",
    "contactId": "5e4fe9c61c9d440000f3af57",
    "nickname": "Johnny",
    "lastname": "Smith",
    "firstname": "John",
    "mobileIDC": "+27"
  }
]
```

#### Health
The objective of the health endpoint is to ensure that the external dependencies of the application are healthy and be
reached. As such, the application is considered healthy if the database and health endpoint can be reached.

#### Get Health
You can query the health status of the application conveniently on the following endpoint.

`[GET] /health/health`

Response 200
```json
{
  "healthController": "healthy",
  "databaseConnection": "healthy"
}
```

## Follow Development
This project has a Trello board! You can follow development, see what's blocked and what's in progress. See what the
upcoming features are and the work required to complete each task along with it's relevant acceptance criteria.

[Trello Board](https://trello.com/b/TspFnVQw/phb-phonebook-api)

## Environment Variables
The following table represents the variables that are required to be in the environment for the application to use at
run time. 

| Name              | Description                                                                                    |
|-------------------|------------------------------------------------------------------------------------------------|
| PORT              | The port that the application will be exposed on once hosted.                                  | 
| DATABASE_URL      | The URL to be used to connect to the given database.                                           |
| DATABASE_NAME     | The name of the database that will be used.                                                    |
| DATABASE_ENGINE   | The database engine that the application will be connecting to.                                |
| DATABASE_USERNAME | The username credential to access the database.                                                |
| DATABASE_PASSWORD | The password credential to access the database.                                                |
| LOGGER_LEVEL      | The level of logging required. info/debug/trace are most common.                               |
| LOGGER_SERVICE    | The name for the basic application level logger which will be used to spawn all child loggers. |
| LOGGER_LOGGLY_TOKEN     | The token used for authentication on Loggly                                              |
| LOGGER_LOGGLY_SUBDOMAIN | The subdomain used for authentication on Loggly                                          |

## Testing
This project uses the `mocha` testing framework to run all tests. It makes use of the `chai` assertion library as well
as `chai-as-promised` for all asynchronous assertions. For stubbing, the project makes use of `sinon`. All of these
libraries are configured in `test/support/setup.spec.ts`. This README includes a badge indicating the current total
code coverage and more details are available on Sonar itself.

To run these tests locally, the below commands can be used.

```bash
$ npm audit
$ npm run test
$ npm run coverage
$ npm run lint
```

## Logging
This application has centralised logging using [Loggly](http://loggly.com/) and all production logs by default are sent
through to it.

## License
MIT License

Copyright (c) 2019 Alex Pickering
