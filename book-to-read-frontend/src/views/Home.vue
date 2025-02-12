<template>
  <div>
    <h1>book to read</h1>

    <form @submit.prevent="handleFormSubmit">
      <input type="text" name="title" placeholder="got a new book to read?">
      <input type="submit" value="add it!">
    </form>

    <ul>
      <li v-for="(book, index) in sortedBooks" :key="book.id">
        <p>{{ book.title }}</p>
        <p>book is {{ book.completed ? '' : 'not ' }}finished</p>
        <button @click="completeBook(book.id, index)">finished</button>
        <button @click="deleteBook(book.id, index)">delete</button>
      </li>
    </ul>

    <router-link :to="{ name: 'Logout' }">log out</router-link>
  </div>
</template>

<script setup>
  import { computed, onBeforeMount, ref, toRefs } from "vue"
  import useUserStore from "../stores/UserStore.js"

  const API_URL = "http://localhost:3000"

  const userStore = useUserStore()
  const { bearerToken } = toRefs(userStore)

  const books = ref([])
  const sortedBooks = computed(() => books.value.sort((a, b) => b.id - a.id))

  const completeBook = async (id, index) => {
    await fetch(`${API_URL}/books/${id}/complete`, {
      method: "PATCH",
      headers: { Authorization: bearerToken.value }
    })

    const book = books.value[index]
    book.completed = true
  }

  const deleteBook = async (id, index) => {
    await fetch(`${API_URL}/books/${id}`, {
      method: "DELETE",
      headers: { Authorization: bearerToken.value }
    })

    books.value.splice(index, 1)
  }

  const handleFormSubmit = async event => {
    const form = event.target
    const formData = new FormData(form)
    const params = { book: Object.fromEntries(formData) }

    try {
      const response = await fetch(`${API_URL}/books`, {
        method: "POST",
        body: JSON.stringify(params),
        headers: {
          Authorization: bearerToken.value,
          "Content-type": "application/json"
        }
      })

      const isSuccessful = response.ok
      const data = await response.json()

      if(!isSuccessful) {
        throw new Error(data.messages)
      }

      books.value.push(data.book)
      form.reset()
    } catch (error) {
      console.log(error)
    }
  }

  onBeforeMount(async () => {
    const response = await fetch(`${API_URL}/books`, {
      headers: { Authorization: bearerToken.value }
    })

    const data = await response.json()
    books.value = data.books
  })
</script>
