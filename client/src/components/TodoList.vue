<template>
    <div class="container-fluid">
        <div class="row">
            <div class="col-xs-12 col-md-6 col-md-offset-3">
                <div class="card">
                    <div class="row card-header">
                        <div class="col-xs-12">

                            <h2 class='text-center'>Todo List</h2>
                        </div>
                    </div>
                    <div class="row card-body">
                        <div class="col-xs-12">
                            <ul>
                                <todo v-for="todo in todoList" :todo="todo"></todo>
                            </ul>
                        </div>
                    </div>
                    <div class="row card-footer">
                        <div class="col-xs-12">
                            <form class="text-center">
                                <div class="form-group">
                                    <input type="text" class="form-control" placeholder='description'>
                                </div>
                                <div class="form-group">
                                    <select class="form-control">
                                        <option>Importance</option>
                                        <option>low</option>
                                        <option>medium</option>
                                        <option>high</option>
                                    </select>
                                </div>
                                <button type="button" class="btn btn-primary"  v-on:click="addTodo()">Add new item</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                todoList: [],
                todo: {
                    description: '',
                    done: false,
                    importance: '',
                    id: 0,
                },
                importance: ['low','medium','high']
            }
        },
        methods: {
            addTodo: function () {
                // generate id for todo item
                this.todo.id = this.randomGuid()

                // get description and options importance -------------------

                // store in to array
                this.todos.push(todo);
                // update server side
                this.syncToServer()

                // reset default todo item
                todo.description = ''
                todo.done = false
                todo.importance = ''
                todo.id = 0
            },
            randomGuid: function () {
                return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                    let r = Math.random() * 16 | 0, v = c === 'x' ? r : r & 0x3 | 0x8;

                    return v.toString(16);
                })
            },
            syncToServer: function () {
                // use vue-resource module to update server side info
                // send todo item and server saves by id
                // maybe check to make sure it went okay?
            }
        },
        events: {
            updateTodoItem () {
                // create event to catch child event that a todo item has changed using $on()
                // replace todo item in todoList by id
                syncToServer()
            }
        }
    }
</script>

<style>
    .card {
        border: solid 1px black;
        margin-top: 100px;
    }
    .card-header, .card-footer {
        background-color: #f1f1f1;
        padding: 20px;
        margin: 0;
    }
    .card-body {
        padding: 30px 10px 30px 10px;
    }
</style>
