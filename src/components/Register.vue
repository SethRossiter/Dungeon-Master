<template>
    <div class="register">
        <div class="container-fluid">
        <h1>Create Your Account</h1>
            <div class="well well-sm custom-well-small">
            <form @submit.prevent="register">
                <div class="input-group">
                      <span class="input-group-addon fa fa-user-circle" aria-hidden="true"></span>
                    <div class="col-10">
                    <input type="text" class="form-control" v-model="user.name" required placeholder="First Name">
                </div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon fa fa-envelope-open" aria-hidden="true"></span>
                      <div class="col-10">
                    <input type="email" class="form-control" v-model="user.email" required placeholder="vail.is@superawesome.com">
                </div>
                </div>
                <div class="input-group">
                    <span class="input-group-addon fa fa-star" aria-hidden="true"></span>
                      <div class="col-10">
                    <input type="password" class="form-control" v-model="user.password" required placeholder="password">
                </div>
                </div>
                <div class="form group row">
                      <div class="col-10">
                    <button class="btn btn-default" type="submit">submit</button>
                </div>
                </div>
            </form>
            </div>
        </div>
    </div>
</template>


<script>
    export default {
        name: 'register',
        data() {
            return {
                user: {}
            }
        },
        computed: {},
        methods: {
            register() {
                this.$store.dispatch('register', this.user)
            }
        },
        components: {}
    }

</script>


<style scoped>
h1{
    color: black;
    text-align: center;
    font-family: 'Asap', sans-serif;
    font-weight: bold;
    text-shadow: 1px 1px 1px black; 
}
button{
    margin-top: 10px;
    font-weight: bold;
}
span{
    color: black;
    text-align: left;
}
.well.custom-well-small { 
    width: 335px; 
    margin: 0 auto; 
    text-align: center;
    background-color: #fbfbfb;
}
</style>