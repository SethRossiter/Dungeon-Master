<template>
    <div class="login">
        <div class="form-group">
        <form @submit.prevent="login">
            <input type="text" v-model="user.email" required placeholder="user name">
            <input type="password" v-model="user.password" require placeholder="password">
            <button type="submit">login</button>
        </form>
        </div>

    </div>
</template>


<script>
export default {
    name: 'login',
    data(){
        return {
            user:{}
        }
    },
    computed:{},
    methods:{
        login(){
            this.$store.dispatch('login', this.user)
        }
    },
    components:{}
}
</script>


<style scope>
form{
    color: black;
}

</style>