import { create } from 'zustand';
import { TODO_DATA } from '@/data/todoData';

type Todo = {
  id: number;
  task: string;
  completed: boolean;
};

type TodoStore = {
  todos: Todo[];
  addTodo: (task: string) => void;
  toggleTodo: (id: number) => void;
};

const initialState: Todo[] = TODO_DATA;

export const useTodoStore = create<TodoStore>((set) => ({
  todos: initialState,
  addTodo: (task: string) => {
    const newTodo: Todo = {
      id: Date.now(),
      task,
      completed: false,
    };
    set((state) => ({ todos: [...state.todos, newTodo] }));
  },
  toggleTodo: (id: number) => {
    set((state) => ({
      todos: state.todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    }));
  },
}));
