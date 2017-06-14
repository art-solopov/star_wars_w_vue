<template>
    <div id="characters_view">
        <div class="loading" v-show="loading">Loading...</div>
        <ul v-if="characters.length">
            <li v-for="character in characters">{{ character.name }}</li>
        </ul>

        <router-link :to="{name: 'Characters', params: {page: prev}}" v-if="prev">Previous</router-link>
        <router-link :to="{name: 'Characters', params: {page: next}}" v-if="next">Next</router-link>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Characters',
    props: ['page', 'film_id'],
    data: () => { return { characters: [], next: null, prev: null, loading: false } },
    created () { this.fetchData() },
    watch: {
      '$route': 'fetchData'
    },
    methods: {
      fetchData () {
        this.loading = true

        if (this.film_id) {
          // TODO fetch data for films
        }

        let page = Number(this.page || 1)
        axios.get(
          'http://swapi.co/api/people/',
          {params: {page}}
        ).then(res => {
          let data = res.data
          this.next = data.next ? page + 1 : null
          this.prev = data.previous ? page - 1 : null
          this.characters = res.data.results
          this.loading = false
        })
      }
    }
  }
</script>
