<template>
<div class="well well-sm">
    <div class="comment" >  
    <h5>
    {{commentData.name}} 
    <button class="fa fa-trash" aria-hidden="true" @click="removeComments(commentData)"></button>
    </h5>
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
    background-color: #ccffee;
}
h5{
  color: black;
}
button{
  color: black;
}
</style>