<template>
    <div id="characters_view">
        <div class="loading" v-if="loading">Loading...</div>
        <template v-else>
            <ul v-if="characters.length" class="list-group">
                <li v-for="character in characters">
                    <a href="#" @click.stop.prevent="toggleCurrentCharacter(character.url)">{{ character.name }}</a>
                    <template v-if="currentCharId === character.url">
                        <hr />
                        <dl class="character-traits">
                            <dt>Birth year</dt>
                            <dd>{{ character.birth_year }}</dd>
                            <dt>Gender</dt>
                            <dd>{{ character.gender }}</dd>
                            <dt>Homeworld</dt>
                            <dd>{{ character.homeworldName }}</dd>
                            <dt>Species</dt>
                            <dd>{{ character.speciesName }}</dd>
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
  import { fetchCachedData } from '../utils'

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

        fetchCachedData(
          'http://swapi.co/api/people/', {page}
        ).then(data => {
          this.next = data.next ? page + 1 : null
          this.prev = data.previous ? page - 1 : null
          this.characters = data.results
          this.loading = false
        })
      },
      toggleCurrentCharacter (url) {
        if (this.currentCharId === url) {
          this.currentCharId = null
        } else {
          // Fetching the additional info
          let currentCharacter = this.characters.find(e => e.url === url)
          let promises = []
          if (currentCharacter.homeworld) {
            promises.push(
              fetchCachedData(currentCharacter.homeworld).then(data => {
                currentCharacter.homeworldName = data.name
              })
            )
          }
          if (currentCharacter.species.length) {
            promises.push(
              fetchCachedData(currentCharacter.species[0]).then(data => {
                currentCharacter.speciesName = `${data.name} [${data.classification}/${data.designation}]`
              })
            )
          }
          Promise.all(promises).then(() => { this.currentCharId = url })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
 .character-traits {
     padding: .5em;

     dt {
         font-weight: bold;
     }

     dd {
         margin-left: .5em;
     }
     
     dd, dt {
         display: inline;
     }

     dd + dt::before {
         content: '\000A';
         white-space: pre;
     }
 }
</style>
