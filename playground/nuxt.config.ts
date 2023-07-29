export default defineNuxtConfig({
  modules: ['../src/module'],
  auth: {
    baseUrl: 'http://localhost:5000/api/v1/', paths: {
      signIn: '/auth/login',
      signOut: '/auth/logout'
    }
  },
  devtools: { enabled: true }
})
