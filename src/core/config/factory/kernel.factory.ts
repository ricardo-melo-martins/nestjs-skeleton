// TODO:
// import { FactoryProvider } from '@nestjs/common'
// import { KernelService } from 'src/kernel.service'

// export const kernelFactory: FactoryProvider<Promise<any>> = {
//   provide: 'KERNEL_CONFIG',
//   inject: KernelService
// }

// export const kernelFactory: FactoryProvider<Promise<object>> = {
//   provide: 'KERNEL_CONFIG',
//   // useFactory: async (kernelService: KernelService): Promise<object> => {
//   //   try {
//   //     const config = { teste: 'AZU' }
//   //     return config
//   //   } catch (e) {
//   //     throw e
//   //   }
//   // },
//   inject: [KernelService]
// }
