import { randomUUID } from 'node:crypto'
import { client } from '../../db.js'

export class Database {
  async list(search) {
    let videos

    if (search) {
      videos = await client.query(`SELECT * FROM videos WHERE title ilike "%${search}%"`)
    } else {
      videos = await client.query('SELECT * FROM videos')
    }

    return videos.rows
  }

  async create(video) {
    const id = randomUUID()

    const { title, description, duration } = video

    const query = `
      INSERT INTO videos (id, title, description, duration) 
      VALUES ('${id}', '${title}', '${description}', '${duration}')
    `

    try {
      await client.query(query)
    } catch (err) {
      throw err
    }
  }

  async update(id, video) {
    const { title, description, duration } = video

    const query = `
      UPDATE videos 
      SET 
        title = '${title}', 
        description = '${description}', 
        duration = '${duration}'
      WHERE
        id = '${id}'
    `

    try {
      await client.query(query)
    } catch (err) {
      throw err
    }
  }

  async delete(id) {
    const query = `
      DELETE from videos 
      WHERE
        id = '${id}'
    `

    try {
      await client.query(query)
    } catch (err) {
      throw err
    }
  }
}
