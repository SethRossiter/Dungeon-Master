<template>
  <div class="well">
    <button @click="createBoard">Add Board</button>
    <ul>
      <li v-for="board in boards">
        <router-link :to="'/boards/'+board._id">
          <div class="well">
            {{board.name}}
            <button class="fa fa-trash" aria-hidden="true" @click="removeBoard()"></button>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'boards',
    mounted() {
      this.$store.dispatch('getBoards')
    },
    computed: {
      boards() {
        return this.$store.state.boards
      }
    },
    methods: {
      createBoard() {
        this.$store.dispatch('createBoard', {
          name: 'Testing board creation',
          description: 'blarg'
        })
      },
      removeBoard(board) {
        this.$store.dispatch('removeBoard', board)
      },
    }
  }

</script>

<style scoped>
  ul li a {
    color: black;
  }

  ul li {
    color: black;
    list-style: none;
  }

  button {
    color: black;
    margin-bottom: 10px; 
  }
.well{
    color: black;
    text-align: left;
    font-family: 'Asap', sans-serif;
    font-weight: bolder;
}
.well .well{
    background-color: #fbfbfb;
}
</style>