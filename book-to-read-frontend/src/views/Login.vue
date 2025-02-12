<template>
    <div>
      <nav>
        <router-link :to="{ name: 'Login' }">Login</router-link>
        <router-link :to="{ name: 'Signup' }">Sign up</router-link>
      </nav>
  
      <form @submit.prevent="handleFormSubmit">
        <label for="email">Email:</label>
        <input type="text" name="email">
        <label for="password">Password:</label>
        <input type="password" name="password">
        <input type="submit" value="Sign in">
      </form>
    </div>
  </template>
  
  <script setup>
    import { useRouter } from "vue-router"
    import useUserStore from "../stores/UserStore.js"
  
    const router = useRouter()
    const userStore = useUserStore()
  
    const handleFormSubmit = async event => {
      const form = event.target
      const formData = new FormData(form)
      const response = await userStore.login(formData)
  
      if (response?.error) {
        console.log(response.error)
      } else {
        router.push("/")
        form.reset()
      }
    }
  </script>
  
  <style scoped>
  </style>
  