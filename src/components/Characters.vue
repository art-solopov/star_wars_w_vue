<template>
    <div id="characters_view">
        <div class="loading" v-if="loading">Loading...</div>
        <template v-else>
            <ul v-if="characters.length" class="list-group">
                <li v-for="character in characters">
                    <a href="#" @click.stop.prevent="toggleCurrentCharacter(character.url)">{{ character.name }}</a>
                    <template v-if="currentCharId === character.url">
                        <hr />
                        <dl>
                            <dl>Birth year</dl>
                            <dd>{{ character.birth_year }}</dd>
                            <dl>Gender</dl>
                            <dd>{{ character.gender }}</dd>
                        </dl>
                    </template>
                </li>
            </ul>

            <ul class="flat-list">
                <li v-if="prev"><router-link :to="{name: 'Characters', params: {page: prev}}">Previous</router-link></li>
                <li v-if="next"><router-link :to="{name: 'Characters', params: {page: next}}">Next</router-link></li>
            </ul>
        </template>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'Characters',
    props: ['page', 'film_id'],
    data: () => {
      return {
        characters: [],
        next: null,
        prev: null,
        loading: false,
        currentCharId: null
      }
    },
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
      },
      toggleCurrentCharacter (id) {
        if (this.currentCharId === id) {
          this.currentCharId = null
        } else {
          this.currentCharId = id
        }
      }
    }
  }
</script>
