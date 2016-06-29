<template>
    <div>
        <li v-bind:class="['todo', {'todo--active': selectedTodo && todo.id === selectedTodo.id}, {'todo--completed': todo.completed}]">
            <input v-if="selectedTodo && selectedTodo.editing && selectedTodo.id === todo.id" v-model="todo.description" placeholder="*todo.description"/>
            <span v-on:click.self="editTodoText(todo)">{{todo.description}}</span>
            <div v-bind:class="['todo__edit-options', {'todo__edit-options--active': selectedTodo && todo.id === selectedTodo.id}]">
                <select v-model="todo.severity" v-if="!todo.completed">
                    <option v-for="option in severityOptions" v-bind:selected="option===todo.severity">{{option}}</option>
                </select>
                <span v-if="todo.completed">{{todo.severity}}</span>
                <i class="ion-trash-b todo-list__action todo-list__action--delete" v-on:click.self="deleteTodo"></i>
                <i class="ion-android-done-all todo-list__action todo-list__action--complete" v-on:click.self="completeTodo" v-if="selectedTodo && !selectedTodo.completed"></i>
            </div>
        </li>
    </div>
</template>

<script>
    export default {
        props: {
            todo: Object,
            selectedTodo: Object
        },
        data: function () {
            return {
                severityOptions: [
                    'low',
                    'moderate',
                    'high'
                ]
            }
        },
        methods: {
            editTodoText: function (todo) {
                let selectedTodo = this.selectedTodo
                if (!todo.completed) {
                    if (!selectedTodo || selectedTodo.id !== todo.id) {
                        selectedTodo = this.$parent.selectTodo(todo)
                    }
                    this.selectedTodo = Object.assign({}, selectedTodo, {editing: !selectedTodo.editing})
                    return this.selectedTodo
                }
            },
            deleteTodo: function () {
                return this.$parent.deleteTodo()
            },
            completeTodo: function () {
                return this.$parent.completeTodo()
            }
        }
    }
</script>

<style>
    .todo-list__actions-container {
        display: flex;
        justify-content: space-between;
        color: #E4E4E4;
    }

    .todo-list__action {
        width: 100%;
        padding: 5px;
    }

    .todo-list__action--add {
        background-color: #006600;
        text-align: center;
    }

    .todo-list__action--delete {
        color: white;
    }

    .todo-list__action--complete {
        color: white;
    }

    .todo-list__action--save {
        background-color: #000066;
        text-align: right;
    }

    .todo-list__action--cancel {
        background-color: #943724;
    }

    .todo {
        display: flex;
        justify-content: space-between;
        list-style: none;
        padding: 5px;
        background-color: teal;
    }

    .todo--active {
        background-color: #3CB3AE;
    }

    .todo--completed {
        text-decoration: line-through;
    }

    .todo__edit-options {
        display: none;
    }

    .todo__edit-options--active {
        display: inline;
    }
</style>
