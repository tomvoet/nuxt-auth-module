import { AuthError, SignInFunc, SignInResultData } from "../types"
import { getSignInUrl } from "../utils/config"
import { Ref, ref } from 'vue'
import { useAuthAccessToken, useAuthLastTokenRefreshAt, useAuthRefreshToken, useAuthUser } from "../utils/state"
import { ComputedRef, computed } from "#imports"

const signIn: SignInFunc = async (input) => {
  const error: Ref<AuthError | undefined> = ref(undefined)
  const data: Ref<SignInResultData | undefined> = ref(undefined)

  data.value = await $fetch(getSignInUrl(), {
    method: 'POST',
    body: input,
    onResponse: async (res) => {
      if (!res.response.ok) {
        if (res.response.bodyUsed) {
          error.value = res.response._data.message
        } else {
          error.value = await res.response.json()
        }
      } else {
        useAuthLastTokenRefreshAt().value = new Date()

        if (res.response.bodyUsed) {
          const cleanRes = res.response._data as SignInResultData
          useAuthAccessToken().value = cleanRes.accessToken ?? ''
          useAuthRefreshToken().value = cleanRes.refreshToken ?? ''
        } else {
          const cleanRes = await res.response.json() as SignInResultData

          useAuthAccessToken().value = cleanRes.accessToken ?? ''
          useAuthRefreshToken().value = cleanRes.refreshToken ?? ''
        }
      }
    },
  }) as SignInResultData | undefined



  return Promise.resolve({
    data, //vielleicht eher direkt die usestates zurückgeben?
    error
  })
}

interface UseAuthReturn {
  accessToken: Readonly<ReturnType<typeof useAuthAccessToken>>
  refreshToken: Readonly<ReturnType<typeof useAuthRefreshToken>>
  lastTokenRefreshAt: Readonly<ReturnType<typeof useAuthLastTokenRefreshAt>>
  user: Readonly<ReturnType<typeof useAuthUser>>
  isLoggedIn: ComputedRef<boolean>
  signIn: SignInFunc
}

export const useAuth = (): UseAuthReturn => {
  const getters = {
    accessToken: useAuthAccessToken(),
    refreshToken: useAuthRefreshToken(),
    lastTokenRefreshAt: useAuthLastTokenRefreshAt(),
    user: useAuthUser(),
    isLoggedIn: computed(() => !!useAuthAccessToken().value)
  }

  const actions = {
    signIn
  }

  return {
    ...getters,
    ...actions
  }
}