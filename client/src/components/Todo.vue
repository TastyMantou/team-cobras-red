<template>
    <div>
        <li v-bind:class="['todo', {'todo--active': selectedTodo && todo.id === selectedTodo.id}, {'todo--completed': todo.completed}]" @click.self="selectTodo(todo)">
            <input v-if="selectedTodo && selectedTodo.editing && selectedTodo.id === todo.id" v-model="editedTodo.description" placeholder="todo.description"/>
            <span v-on:click.self="editTodoText(todo)">{{*todo.description}}</span>
            <div v-bind:class="['todo__edit-options', {'todo__edit-options--active': selectedTodo && todo.id === selectedTodo.id}]">
                <select v-if="editedTodo" v-model="editedTodo.severity" v-if="!todo.completed">
                    <option v-for="option in severityOptions" v-bind:selected="option===todo.severity">{{option}}</option>
                </select>
                <span v-if="todo.completed">{{todo.severity}}</span>
                <i class="ion-trash-b todo-list__action todo-list__action--delete" @click.self="deleteTodo"></i>
                <i v-if="selectedTodo && !selectedTodo.completed" class="ion ion-android-mail todo-list__action todo-list__action--save" @click.self="saveTodo"></i>
                <i class="ion-android-done-all todo-list__action todo-list__action--complete" @click.self="completeTodo" v-if="!todo.completed"></i>
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
                ],
                editedTodo: null
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
            saveTodo: function () {
                this.todo = this.editedTodo
                this.selectTodo()
                return this.todo
            },
            selectTodo: function (todo) {
                this.editedTodo = (this.editedTodo === todo) ? null : todo
                return this.$parent.selectTodo(todo)
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
        padding: 5px;
        color: white;
    }

    .todo-list__action--delete {

    }

    .todo-list__action--complete {

    }

    .todo-list__action--save {

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
