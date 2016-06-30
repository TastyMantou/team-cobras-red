<template>
    <div class="todo-list__container">
        <h2 class="todo-list__title">Todo List</h2>
        <ul class="todo-list">
            <todo v-for="todo in todos" :todo="todo"></todo>
        </ul>
        <div class="todo-list__actions-container">
            <div v-if="!itemSelected" class="todo-list__todo-list__container todo-list__todo-list__container-action--add" @click="addTodo"><i class="ion ion-plus"></i> Add New Todo</div>
        </div>
    </div>
</template>

<script>
    function randomGuid () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;

            return v.toString(16);
        });
    }

    import Todo from './Todo'
    export default {
        components: {
            Todo
        },
        methods:    {
            addTodo: function () {
                let todo = { id: randomGuid(), description: 'New Todo', severity: 'low', selected: false, editing: false, completed: false, deleted: false };
                return this.todos.push(todo);
            }
        },
        props:      {
            todos: Array
        }
    }
</script>

<style>
    .todo-list__container {

    }

    .todo-list__todo-list__container {
        width: 100%;
        padding: 5px;
    }

    .todo-list__todo-list__container-action--cancel {
        background-color: #943724;
    }

    .todo-list__todo-list__container-action--add {
        background-color: #006600;
        text-align: center;
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
