<template>
    <div class="todo-list__container">
        <h2 class="todo-list__title">Todo List</h2>
        <ul class="todo-list">
            <todo v-for="todo in todos" :todo="todo" :selectedTodo="selectedTodo"></todo>
        </ul>
    </div>
</template>

<script>
    import Todo from './Todo'
    export default {
        components: {
            Todo
        },
        data: function () {
            return {
                selectedTodo: null
            }
        },
        props: {
            todos: Array
        }
    }
</script>

<style>
    .todo-list__container {

    }

    .todo-list {
        display: flex;
        padding: 0;
        margin: 0;
        justify-content: center;
        flex-direction: column;
    }

    .todo-list__title {
        text-decoration: underline;
    }
</style>
