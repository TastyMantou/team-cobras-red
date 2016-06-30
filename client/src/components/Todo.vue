<template xmlns:v-bind="http://www.w3.org/1999/xhtml" xmlns:v-on="http://www.w3.org/1999/xhtml">
    <li v-bind:class="['todo', {'todo--active': todo.selected}, {'todo--deleted': todo.deleted}, {'todo--completed': todo.completed}]" @click.self="toggleTodo()">
        <input v-if="todo.editing" v-model="editedTodo.description" placeholder="todo.description"/>
        <span v-on:click.self="editTodoText">{{todo.description}}</span>
        <div v-bind:class="['todo__edit-options', {'todo__edit-options--active': todo.selected}]">
            <select v-if="todo.editing && todo.selected && !todo.completed" v-model="editedTodo.severity">
                <option v-for="option in severityOptions" v-bind:selected="option===todo.severity">{{option}}</option>
            </select>
            <span v-if="todo.completed">{{todo.severity}}</span>
            <i class="ion ion-android-cancel todo-list__action todo-list__action--cancel" @click.self="cancelTodo" v-if="!todo.completed"></i>
            <i class="ion ion-trash-b todo-list__action todo-list__action--delete" @click.self="deleteTodo"></i>
            <i class="ion ion-android-mail todo-list__action todo-list__action--save" @click.self="saveTodo" v-if="todo.selected && !todo.completed"></i>
            <i class="ion ion-android-done-all todo-list__action todo-list__action--complete" @click.self="completeTodo" v-if="!todo.completed"></i>
        </div>
    </li>
</template>

<script>
    export default {
        props: {
            todo: Object
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
            cancelTodo: function () {
                return this.toggleTodo(false, false);
            },
            editTodoText: function () {
                if (this.todo.completed) {
                    return;
                }

                this.editedTodo = this.todo;

                return this.toggleTodo(true, !this.todo.editing);
            },
            toggleTodo: function (selected, editing = false) {
                return this.todo = Object.assign({}, this.todo, {selected: selected || !this.todo.selected, editing: editing});
            },
            completeTodo: function () {
                this.toggleTodo();
                return this.todo = Object.assign({}, this.todo, {selected: false, editing: false, completed: true});
            },
            deleteTodo: function () {
                this.toggleTodo();
                return this.todo = Object.assign({}, this.todo, {deleted: true});
            },
            saveTodo: function () {
                this.toggleTodo();
                return [this.todo, this.editedTodo] = [this.editedTodo, null];
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

    .todo-list__action--cancel {
        color: red;
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

    .todo--deleted {
        display: none;
        visibility: hidden;
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
