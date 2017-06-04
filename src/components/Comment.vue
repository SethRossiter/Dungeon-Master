<template>
<div class="well well-sm">
    <div class="comment" >  
    {{commentData.name}} 
    <button class="fa fa-trash" aria-hidden="true" @click="removeComments(commentData)"></button>
    </div>
  </div>
</template>


<script>
export default {
  name: 'comment',
  //props recieves data
  props: ['comment-data'],
  methods: {
    
  },
  mounted(){
  },
  methods:{
  removeComments(comments){
    this.$store.dispatch('removeComments', comments)
  }
  }
 
  }
  
</script>


<style scoped>
.well{
  background-color: green;
}
button{
  color: black;
}
</style>