import { computed, ref } from "vue"
import { defineStore } from "pinia"

const API_URL = "http://localhost:3000"

const useUserStore = defineStore("UserStore", () => {
  // state
  const user = ref(null)
  const bearerToken = ref(null)

  // getters
  const isLoggedIn = computed(() => bearerToken.value !== null)

  // actions
  const login = formData => postRequest("/users/sign_in",  formData)
  const signup = formData => postRequest("/users", formData)
  const postRequest = async(endPoint, formData) => {
    try {
       const params = { user: Object.fromEntries(formData) }
       const response = await fetch(`${API_URL}${endPoint}`, {
         method: "POST",
         body: JSON.stringify(params),
         headers:{ "Content-Type": "application/json" }
       })
 
       const isSuccessful = response.ok
       const data = await response.json()
 
       if(!isSuccessful) {
        throw new Error(data.messages)
       }
 
       user.value = data.user
       bearerToken.value = Object.fromEntries(response.headers).authorization
       localStorage.bearerToken = bearerToken.value
    } catch (error) {
       return { error }
    }
   }
 
   const loginWithToken = async () => {
    const token = localStorage.bearerToken
    const tokenExists = token !== undefined && token !== null
 
    if(tokenExists) {
       try {
        const response = await fetch(`${API_URL}/current_user`, {
           headers: { Authorization: token }
        })
 
        if(!response.ok) {
           throw new Error("Invalid Bearer Token")
        }
 
        const data = await response.json()
        user.value = data.user
        bearerToken.value = token
       } catch (error) {
         console.log(error)
       }
     }
   }
 
   const logout =  async () => {
    try {
       const response = await fetch(`${API_URL}/users/sign_out`, {
        method: "DELETE",
        headers: { Authorization: bearerToken.value }
       })
 
       if(!response.ok) {
        const data = await response.json()
        throw new Error(data.messages)
       }
 
       user.value = null
       bearerToken.value = null
       localStorage.removeItem("bearerToken")
    } catch (error) {
       console.log(error)
     }
   }

  return { user, bearerToken, isLoggedIn, login, signup, loginWithToken, logout }
})

export default useUserStore
