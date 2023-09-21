import { Database } from './database/database-postgres.js'
import z from 'zod'

const database = new Database()

export async function appRoutes(app) {
  app.get('/videos', async (req, reply) => {
    const result = await database.list()

    return { 
      total: result.length,
      result
    }
  })

  app.post('/videos', async (req, reply) => {
    const schema = z.object({
      title: z.string(),
      description: z.string(),
      duration: z.number()
    })

    const { title, description, duration } = schema.parse(req.body)

    try {
      await database.create({
        title,
        description,
        duration
      })

      return reply.status(201).send({ message: 'Video Created' })
    } catch {
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  })

  app.put('/videos/:id', async (req, reply) => {
    const params = z.object({
      id: z.string().uuid()
    })

    const schema = z.object({
      title: z.string(),
      description: z.string(),
      duration: z.number()
    })

    const { id } = params.parse(req.params)
    const { title, description, duration } = schema.parse(req.body)

    const videoUpdated = {
      title,
      description,
      duration
    }

    try {
      await database.update(id, videoUpdated)

      return reply.status(204).send()
    } catch {
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  })

  app.delete('/videos/:id', async (req, reply) => {
    const params = z.object({
      id: z.string().uuid()
    })

    const { id } = params.parse(req.params)

    try {
      await database.delete(id)

      return reply.status(204).send()
    } catch {
      return reply.status(500).send({ message: 'Internal Server Error' })
    }
  })
}
