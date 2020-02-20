import * as express from 'express'

const server = express()

server.listen(8080, () => {
  console.log('server running on port 8080')
})
