import { NotFoundException } from '@nestjs/common'

export abstract class AbstractService {
  constructor(
    protected defaultRepository,
    protected defaultRelationRepository?
  ) {}

  async alreadyExistsName(updateName: string, message = { error: 'Name already exists!' }): Promise<void> {
    const find = await this.defaultRepository.findOne({
      where: { name: updateName }
    })

    if (find) {
      throw new NotFoundException(message.error)
    }
  }

  async alreadyExistsRelationship(whereObject: object, message = { error: 'Relation already exists!' }): Promise<void> {
    const find = await this.defaultRelationRepository.findOne(whereObject)

    if (find) {
      throw new NotFoundException(message.error)
    }
  }

  async findAll(): Promise<any[]> {
    return this.defaultRepository.find()
  }

  async findOneOrFail(whereObject: object, message = { error: 'Not Found!' }): Promise<any> {
    const find = await this.defaultRepository.findOne(whereObject)

    if (!find) {
      throw new NotFoundException(message.error)
    }
    return find
  }
}
