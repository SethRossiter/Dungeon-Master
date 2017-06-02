<template>
<div class="well well-sm">
    <div class="task">  
    {{taskData.name}}<button class="delete" @click="removeTasks(taskData)">x</button>
    <form @submit.prevent="createComments()">
      <input type="text" v-model="name" required placeholder="Create Comment">
      <button type="submit">+</button>
    </form>
    <ul>
     <li v-for="comment in comments">
      <comment :commentData="comment"></comment>
    </li>
    </ul>
    </div>
  </div>
</template>


<script>
import Comment from './comment'
export default {
  name: 'task',
  data(){
      return {
        name: ''
      }
    },
  //props recieves data
  props: ['taskData'],
 mounted(){
    this.$store.dispatch('getComments', this.taskData)
  },  
  computed: {
    comments(){
      return this.$store.state.activeComments[this.taskData._id]
    }
  },
  methods:{
  createComments(){
    this.$store.dispatch('createComments', {
      name: this.name,
      taskId: this.taskData._id,
      listId: this.$route.params.id,
      boardId: this.$route.params.id
    })
    this.name = ''
  },
      removeTasks(tasks){
      this.$store.dispatch('removeTasks', tasks)
      }
  },
  components:{
    Comment
  }
}
  
</script>


<style scoped>
.well{
  background-color: purple;
}
span{
  color: red;
}
</style>