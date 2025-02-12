<template>
    <div>
      <nav>
        <router-link :to="{ name: 'Login' }">login</router-link>
        <router-link :to="{ name: 'Signup' }">sign up</router-link>
      </nav>
  
      <form @submit.prevent="handleFormSubmit">
        <label for="email">email:</label>
        <input type="text" :class="{ 'input-error': errorFields.email }" name="email">
        <label for="password">password:</label>
        <input type="password" :class="{ 'input-error': errorFields.email }" name="password">
        <label for="password_confirmation">password confirmation:</label>
        <input type="password" :class="{ 'input-error': errorFields.email }" name="password_confirmation">
        <input type="submit" value="sign up">
      </form>
    </div>
  </template>
  
  <script setup>
    import { ref } from "vue";
    import { useRouter } from "vue-router"
    import useUserStore from "../stores/UserStore.js"
  
    const router = useRouter()
    const userStore = useUserStore()
    const errorFields = ref({ email: false, password: false });
  
    const handleFormSubmit = async event => {
      const form = event.target
      const formData = new FormData(form)
      const response = await userStore.signup(formData)
  
      if (response?.error) {
        errorFields.value.email = true;
        errorFields.value.password = true;
        console.log(response.error)
      } else {
        router.push("/")
        form.reset()
      }
    }
  </script>
  
  <style scoped>
  /* General Styling */
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #333;
  }
  
  /* Navigation */
  nav {
    display: flex;
    gap: 16px;
    margin-bottom: 20px;
  }
  
  nav a {
    text-decoration: none;
    color: #007bff;
    font-weight: 500;
    transition: 0.3s;
  }
  
  nav a:hover {
    color: #0056b3;
  }

  nav a.router-link-active {
    font-weight: 700; /* Bold */
    color: #0056b3; /* Darker shade */
    border-bottom: 2px solid #0056b3; /* Underline effect */
    padding-bottom: 2px;
  }
  
  /* Form Styling */
  form {
    background: white;
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    width: 320px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  
  label {
    font-size: 14px;
    font-weight: 500;
  }
  
  input[type="text"], input[type="password"], input[type="submit"] {
    font-size: 14px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
  }
  
  input[type="submit"] {
    background-color: #007bff;
    color: white;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s;
  }
  
  input[type="submit"]:hover {
    background-color: #0056b3;
  }

  .input-error {
    border: 2px solid #b00020 !important; /* Red border for errors */
    background-color: #fdd; /* Light red background */
  }  
  </style>
  