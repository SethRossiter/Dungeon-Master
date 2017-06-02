<template>
<div class="well well-sm">
    <div class="comment" >  
    {{commentData.name}}
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
 
  }
  
</script>


<style scoped>
.well{
  background-color: green;
}
</style>