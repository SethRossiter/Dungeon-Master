<template>
<div class="well">
  <div class="list" droppable="true" v-on:drop.capture="createTasks" ondragover="event.preventDefault()">
    <h5>Active List: {{listData.name}}  ---- {{listData.description}} ---- {{listData._id}}
      <button class="fa fa-trash" aria-hidden="true" @click="removeLists(listData)"></button></h5>
    <form @submit.prevent="createNewTask()">
      <input type="text" v-model="name" required placeholder="Create Tasks">
      <button type="submit">+</button>
    </form>
    <div v-for="(task, i) in tasks" :key="i" :id="i" class="tasks" draggable="true" v-on:dragstart.capture="moving">
      <task :taskData="task"></task>
      <div @click="getDets" v-on:dragend="moveTasks">
      </div>
    </div>
  </div>
</div>
</template>


<script>
  import Task from './task'
  import draggable from 'vuedraggable'
  export default {
    name: 'list',
    data(){
      return {
        name: ''
      }
    },
    //props recieves data
    props: ['listData'],
    mounted() {
      this.$store.dispatch('getTasks', this.listData)
        },
    computed: {
      tasks() {
       return this.$store.state.activeTasks[this.listData._id]
    }
    },
    methods: {
      getDets() {
        console.log(this.task.description)
      },
      createTasks(event) {
        var task = JSON.parse(event.dataTransfer.getData('text/javascript'))
        task.listId = this.listData._id
        this.$store.dispatch('moveTasks', task)
      },
      createNewTask() {
        this.$store.dispatch('createNewTask',{
          name: this.name,
          listId: this.listData._id,
          boardId: this.$route.params.id
        })
        this.name = ''
      },
      moving(event) {
        console.log(event.target, event.target.id)
        var task = this.tasks[event.target.id]
        event.dataTransfer.setData('text/javascript', JSON.stringify(task))
        console.log('We are moving')
      },
      moveTasks() {
        let i = this.tasks.indexOf(this.tasks)
        this.tasks.splice(i, 1)
        this.$store.dispatch('moveTasks', tasks)
      },
    removeLists(list){
      this.$store.dispatch('removeLists', list)
  }
    },
    components: {
      Task,
      draggable
    },
  }
</script>


<style scoped>
button{
  color: black;
}

.well {
  background-color: #e1e1e1;
}

h5 {
  color: black;
}
</style>