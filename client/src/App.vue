<template>
    <div class='container-fluid'>
        <div class="row">
            <div class="col-xs-12">
                <nav>
                     <ul>
                        <li><a v-link="'/home'">Home</a></li>
                        <span v-show="authenticated">
                            <li><a v-link="'/todo'">Todo List</a></li>
                            <li><a v-link="'/account'">Account</a></li>
                            <li><a>{{ username }}</a></li>
                        </span>
                        <span v-show="!authenticated">
                            <li><a v-link="'/signup'">Signup</a></li>
                            <li><a v-link="'/login'">Login</a></li>
                        </span>
                    </ul>
                </nav>  
            </div>
        </div>

        <div class="row">
            <div class="col-xs-12">
                <router-view ></router-view>
            </div>
        </div>

        <login v-else></login>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                authenticated: true,
                username: 'Testuser'
            }
        }
    }
</script>

<style>
    nav {
        border-bottom: solid 1px black;
        width: 100%;
        height: 40px;
    }
    nav ul {
        list-style: none;
        margin: 0;
        padding: 0;
        float: right;
    }
    nav li {
        display: inline-block;
    }
    nav a {
        display: block;
        padding: 10px 20px 10px 10px;
        text-decoration: none;

    }
    nav span li:last-of-type a{
        padding-right: 50px;
    }

</style>
