import { Ref } from 'vue'

export type User = {
  email: string
}

export type PathOptions = {
  signIn: string
  signOut: string
}

export type SignInData = {
  email: string
  password: string
}

export type SignInResultData = {
  accessToken: string
  refreshToken: string
}

export type AuthError = {
  message: string
}

export type SignInResult = {
  data: Ref<SignInResultData | undefined>
  error: Ref<AuthError | undefined>
}

export type LastTokenRefreshAt = Date | undefined

export interface SharedAuthReturn<SignIn> {
  lastTokenRefreshAt: Readonly<Ref<LastTokenRefreshAt>>
  signIn: SignIn
}

export type SignInFunc = (data: SignInData) => Promise<SignInResult>