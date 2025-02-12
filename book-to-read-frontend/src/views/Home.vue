<template>
  <div>
    <h1>&#128173; book to read</h1>

    <form @submit.prevent="handleFormSubmit">
      <input type="text" name="title" placeholder="got a new book to read?">
      <input type="submit" value="add it!">
    </form>

    <ul>
      <li v-for="(book, index) in sortedBooks" :key="book.id">
        <p :class="['book-title', { finished: book.completed }]">{{ book.title }}</p>
        <p class="book-status">
          <span :class="{ finished: book.completed }">
            {{ book.completed ? 'Finished' : 'Not Finished' }}
          </span>
        </p>
       <!-- Button container for side-by-side layout -->
       <div class="btn-container">
        <button 
          v-if="!book.completed" 
          @click="completeBook(book.id, index)" 
          class="btn btn-primary">
          finished?
        </button>
      
        <button v-else @click="undoCompleteBook(book.id, index)" class="btn btn-warning">
          undo
        </button>
      
        <button @click="deleteBook(book.id, index)" class="btn btn-danger">
          delete
        </button>
      </div>
      
      </li>
    </ul>

    <router-link :to="{ name: 'Logout' }"  class="logout">log out</router-link>
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

  const undoCompleteBook = async (id, index) => {
    await fetch(`${API_URL}/books/${id}/undo_complete`, {
      method: "PATCH",
      headers: { Authorization: bearerToken.value }
    })

    books.value[index].completed = false
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

<style scoped>
/* 💎 Chic & Elegant iPhone-Like Style */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

body {
  background: #f9f9f9;
  font-family: 'Inter', sans-serif;
  color: #222;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.container {
  background: white;
  border-radius: 20px;
  box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
  padding: 24px;
  width: 90%;
  max-width: 400px;
  text-align: center;
}

h1 {
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

input[type="text"] {
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 12px;
  background: #f3f3f3;
  text-align: center;
  transition: 0.3s;
}

input[type="text"]:focus {
  background: white;
  outline: 2px solid #007aff;
}

input[name="title"]::placeholder {
  font-size: 12px; /* Makes only the placeholder text smaller */
  color: #888; /* Optional: Slightly dim the text for a softer look */
}

input[type="submit"] {
  font-size: 16px;
  background: #007aff;
  color: white;
  border: none;
  border-radius: 12px;
  padding: 12px;
  cursor: pointer;
  transition: 0.3s;
}

input[type="submit"]:hover {
  background: #005ecb;
}

ul {
  list-style: none;
  padding: 0;
  margin-top: 20px;
}

li {
  background: #f8f8f8;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  text-align: left;
}

.book-title {
  font-size: 16px;
  font-weight: 500;
}

.book-title.finished {
  text-decoration: line-through;
}

.book-status span {
  font-size: 14px;
  font-weight: 500;
  color: #666;
}

.book-status .finished {
  color: #34c759;
}

.btn-container {
  display: flex;
  gap: 10px; /* Adds space between the buttons */
  margin-top: 10px;
}

.btn {
  font-size: 14px;
  padding: 10px;
  border: none;
  border-radius: 12px;
  cursor: pointer;
  transition: 0.3s;
  flex: 1; /* Makes buttons equally sized */
  text-align: center;
}

.btn-primary {
  background: #34c759;
  color: white;
}

.btn-primary:hover {
  background: #2db551;
}

.btn-danger {
  background: #ff3b30;
  color: white;
}

.btn-danger:hover {
  background: #e62e27;
}

.logout {
  display: block;
  margin-top: 20px;
  text-decoration: none;
  color: #007aff;
  font-size: 14px;
  font-weight: 500;
  transition: 0.3s;
}

.logout:hover {
  color: #005ecb;
}
</style>