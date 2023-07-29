import { defineNuxtModule, addPlugin, createResolver, addImports } from '@nuxt/kit'
import { fileURLToPath } from 'url'
import { PathOptions } from './module'
import { defu } from 'defu'

export * from './runtime/types'

// Module options TypeScript interface definition
export interface ModuleOptions {
  baseUrl: string
  paths: PathOptions
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: 'nuxt-auth-module',
    configKey: 'auth',
    compatibility: {
      nuxt: '^3.0.0'
    },
    version: require('../package.json').version
  },
  // Default configuration options of the Nuxt module
  defaults: {
    baseUrl: 'http://localhost:5000',
    paths: {
      signIn: '/auth/signIn',
      signOut: '/auth/signOut'
    }
  },
  setup(options, nuxt) {
    // expose options to the runtime
    nuxt.options.runtimeConfig = nuxt.options.runtimeConfig || { public: {} }

    //@ts-ignore
    nuxt.options.runtimeConfig.public.auth = defu(nuxt.options.runtimeConfig.public.auth, options)

    const { resolve } = createResolver(import.meta.url)
    const runtimeDir = fileURLToPath(new URL('./runtime', import.meta.url))

    addImports(
      [
        'useAuth',
        'useAuthFetch',
      ].map(name => ({
        name,
        from: resolve(runtimeDir, `composables/${name}`)
      }))
    )

    // Do not add the extension since the `.ts` will be transpiled to `.mjs` after `npm run prepack`
    addPlugin(resolve(runtimeDir, 'plugin'))
  }
})
