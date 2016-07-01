<template>
   <div class="container">
        <div class="col-sm-6 col-sm-offset-3">

            <h1><span class="fa fa-sign-in"></span>Recover Password</h1>

            <!-- if error from server then show here -->
            <div class="alert alert-danger" v-show='serverMessage'> {{ serverMessage }}</div>

            <form>
                <div class="form-group">
                    <label>Email</label>
                    <input type="text" class="form-control" name="email">
                </div>

                <button type="submit" class="btn btn-warning btn-lg" v-on:click="login()">Send Email</button>
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
            },
            serverMessage: ''
        }
    },
    methods: {
        recoverypassword: function () {
            // post data to server route

        }
    }
}
</script>

<style>
</style>
