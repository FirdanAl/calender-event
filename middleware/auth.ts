// middleware/auth.js
export default defineNuxtRouteMiddleware((to, _from) => {
  const user = useSupabaseUser()
  const publicPages = ['/login', '/','reports']

  if (!user.value && !publicPages.includes(to.path)) {
    return navigateTo('/login')  
  }
})
