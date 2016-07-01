<template>
   <div class="container">
        <div class="col-sm-6 col-sm-offset-3">

            <h1><span class="fa fa-sign-in"></span> Signup</h1>

            <!-- if error from server then show here -->
            <div class="alert alert-danger" v-show='serverMessage'> {{ serverMessage }}</div>

            <form>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" name="email">
                </div>
                <div class="form-group">
                    <label>Password</label>
                    <input type="password" class="form-control" name="password">
                </div>

                <button type="submit" class="btn btn-warning btn-lg" v-on:click="signup()">Signup</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data () {
        return {
            user: {
                email: '',
                password: ''
            },
            serverMessage: ''
        }
    },
    methods: {
        signup: function () {
            // stop default event
            // call http vue-resource method to authenticate
            // pass response up to home component - ie username, isauthenticated
            // user router.go to go to user todo list after authentication success
        }
    }
}
</script>

<style>
</style>
