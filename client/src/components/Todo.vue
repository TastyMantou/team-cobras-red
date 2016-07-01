<template>
    <li>

        <span>{{ todo.description }}</span><span>change icon</span>
        <span>{{ todo.importance }}</span><span>change icon</span>
        <span>delete icon</span>
        <span>done icon</span>
    </li>
</template>

<script>
    export default {
        props: {
            todo: Object
        },
        events: {
            editTodo: function () {
                // send whole todo object - parentcomponent/server can update by id
                //this.$http.post(...)
                // emit to parent TodoList component using $dispatch()
            }
        }
    }
</script>

<style>
</style>
