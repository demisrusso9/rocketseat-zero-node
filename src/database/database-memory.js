import { randomUUID } from 'node:crypto'

export class DatabaseMemory {
  #videos = new Map()

  async list() {
    return Array.from(this.#videos.entries()).map(array => {
      const id = array[0]
      const data = array[1]

      return {
        id,
        ...data
      }
    })
  }

  async create(video) {
    const id = randomUUID()

    this.#videos.set(id, video)
  }

  async update(id, video) {
    const videoExists = this.#videos.has(id)
    
    if (videoExists) {
      this.#videos.set(id, video)
      return
    } 
  }

  async delete(id) {
    this.#videos.delete(id)
  }
}
