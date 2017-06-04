<template>
  <div class="well">
    <button type="button">
        <router-link :to="'/boards/'"><h6>go back to boards list...</h6></router-link>
        </button>
    <br><br>    
    Active Board: {{board.name}}
    <br>
    <form @submit.prevent="createLists(list)">
      <input type="text" v-model="name" required placeholder="Create List">
      <button type="submit">+</button>
    </form>
    <div class="well">
      <li v-for="list in lists">
        <list :listData="list"></list>
      </li>
    </div>
  </div>
</template>

<script>
  import List from './list'
  export default {
    name: 'boards',
    data() {
      return {
        name: ''
      }
    },
    mounted() {
      console.log('sail away saily away')
      this.$store.dispatch('getBoard', this.$route.params.id)
      this.$store.dispatch('getLists', this.$route.params.id)
    },
    computed: {
      board() {
        return this.$store.state.activeBoard
      },
      lists() {
        return this.$store.state.activeLists
      }
    },
    methods: {
      createLists() {
        this.$store.dispatch('createLists', {
          name: this.name,
          description: this.description,
          boardId: this.$route.params.id
        })
        this.name = ''
      }
    },
    components: {
      List
    }
  }

</script>

<style scoped>
  .well {
    color: black;
    background-color: #fbfbfb;
    font-family: 'Asap', sans-serif;
  }

  h6 {
    color: black;
  }
</style>