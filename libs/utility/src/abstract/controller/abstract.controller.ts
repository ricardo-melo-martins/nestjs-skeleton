import { toSlug } from '@rmm/utility'

export abstract class AbstractController {
  protected controllerName = this.constructor.name
  constructor() {}

  set name(name: string) {
    this.controllerName = name
  }

  get name(): string {
    return this.controllerName
  }

  get nameSlug(): string {
    return toSlug(this.controllerName)
  }
}
