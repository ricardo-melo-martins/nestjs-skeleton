import { registerAs } from '@nestjs/config'

export default registerAs('server', () => ({
  host: process.env.SERVER_ADDRESS || '127.0.0.1',
  port: process.env.SERVER_PORT || 3000
}))
