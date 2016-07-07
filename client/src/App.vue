<template>
    <div id="app">
        <todo-list v-if="authenticated" :todos="todos"></todo-list>
        <login v-else></login>
    </div>
</template>

<script>
    import Login from './components/Login'
    import TodoList from './components/TodoList'
    import Store from './store'

    export default {
        components: {
            Login,
            TodoList
        },
        data () {
            return Store.state
        }
    }
</script>

<style>
    html {
        height: 100%;
    }

    body {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    #app {
        color: #2c3e50;
        margin-top: -100px;
        width: 600px;
        font-family: Source Sans Pro, Helvetica, sans-serif;
        text-align: center;
    }

    #app a {
        color: #42b983;
        text-decoration: none;
    }
</style>
