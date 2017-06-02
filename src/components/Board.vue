<template>
<div class="well">
    Active Board: {{board.name}}
    <h5><button type="button"><router-link :to="'/boards/'">go back to boards list...</router-link></button></h5>
      <form @submit.prevent="createLists(list)">
        <input type="text" v-model="name" required placeholder="Create List">
        <button type="submit">+</button>
      <span @submit.prevent="removeLists(list)">x</span>
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
    data(){
      return {
        name: ''
      }
    },
  mounted(){
    this.$store.dispatch('getBoard', this.$route.params.id)
    this.$store.dispatch('getLists', this.$route.params.id)
  },
  computed:{
    board(){
      return this.$store.state.activeBoard
    },
    lists(){
      return this.$store.state.activeLists
    }
  },
  methods:{
      createLists() {
        this.$store.dispatch('createLists',{
          name: this.name,
          description: this.description,
          boardId: this.$route.params.id
        })
        this.name = ''
      },
    removeLists(list){
      this.$store.dispatch('removeLists', list)
  }
  },
  components: {
    List
  }
}
</script>

<style scoped>
.well{
 color: black;
}
span{
  color: red;
}
</style>