<template>
    <div id="app">
        <task-list v-if="authenticated" :tasks="tasks"></task-list>
        <login v-else></login>
    </div>
</template>

<script>
import Login from './components/Login'
import TaskList from './components/TaskList'
import Store from './store'

export default {
    components: {
        Login,
        TaskList
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
    max-width: 600px;
    font-family: Source Sans Pro, Helvetica, sans-serif;
    text-align: center;
}

#app a {
    color: #42b983;
    text-decoration: none;
}
</style>
