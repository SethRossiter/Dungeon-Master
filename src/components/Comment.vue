<template>
<div class="well well-sm">
    <div class="comment" >  
    {{commentData.name}} <button class="delete" @click="removeComments(commentData)">x</button>
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
span{
  color: red;
}
</style>