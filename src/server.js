import { app } from './app.js'

app.listen({ host: '0.0.0.0', port: process.env.PORT ?? 3333 }, () => {
  console.log('Hello')
})