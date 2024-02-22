import { AbstractEntity } from './abstract.entity'
import { UpdateDateColumn } from 'typeorm'

export class AuditableEntity extends AbstractEntity {
  @UpdateDateColumn({ nullable: true, type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  last_update: string
}
