<template>
    <div class="register">
        <div class="form-group">
          <form @submit.prevent="register">
            <input type="text" v-model="user.name" required placeholder="name">
            <input type="email" v-model="user.email" required placeholder="email">
            <input type="password" v-model="user.password" required placeholder="set password">
            <button type="submit">submit!</button>
          </form>
        </div>

    </div>
</template>


<script>
export default {
    name: 'register',
    data(){
        return {
            user:{}
        }
    },
    computed:{},
    methods:{
        register(){
            this.$store.dispatch('register', this.user)
        }
    },
    components:{}
}
</script>


<style scoped>

</style>