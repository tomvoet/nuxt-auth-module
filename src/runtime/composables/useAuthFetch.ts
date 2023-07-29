import { useFetch } from "nuxt/app";
import { defu } from "defu";
import { useAuthAccessToken } from "../utils/state";

export const useAuthFetch: typeof useFetch = (request, opts?) => {
  opts ||= {}

  opts.headers = defu(opts?.headers, {
    'Authorization': `Bearer ${useAuthAccessToken().value}`
  })

  return useFetch(request, opts)
}