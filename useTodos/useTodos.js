import { useEffect, useReducer } from "react";
import { todoReducer } from './todoReducer';

const init = () => {
    return JSON.parse(localStorage.getItem('todos')) || [];
};

export const useTodos = (initialState = []) => {

    const [todos, dispatchTodo] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        return () => { };
    }, [todos]);

    const handleNewTodo = (todo) => {
        const action = { type: 'Add Todo', payload: todo };
        dispatchTodo(action);
    };

    const handleDeleteTodo = (id) => {
        dispatchTodo({
            type: 'Remove Todo',
            payload: id
        });
    };

    const handleToggleTodo = (id) => {
        console.log({ id });
        dispatchTodo({
            type: 'Toggle Todo',
            payload: id
        });
    };

    return {
        todos,
        todosCount: todos.length,
        pendingTodosCount: todos.filter((todo) => !todo.done).length,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo
    }
}
