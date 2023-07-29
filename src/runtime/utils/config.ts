import { ModuleOptions } from "../../module"
import { useRuntimeConfig } from "#imports"

export const getTypedConfig = () => {
  return useRuntimeConfig().public.auth as ModuleOptions
}

export const getSignInUrl = () => {
  const config = getTypedConfig()

  // remove duplicate slashes
  return `${config.baseUrl}${config.paths.signIn}`.replace(/([^:]\/)\/+/g, "$1")
}