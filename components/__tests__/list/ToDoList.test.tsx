import { render, screen } from '@testing-library/react';
import TodoList from '@/components/list/ToDoList';
import { TODO_DATA } from '@/data/todoData';
import { useTodoStore } from '@/store/todoStore';
import { setupEvents } from '@/utils/testUtils';

jest.mock('./../../../store/todoStore', () => ({
  useTodoStore: jest.fn(() => ({
    todos: TODO_DATA,
    addTodo: jest.fn(),
    toggleTodo: jest.fn(),
  })),
}));

describe('TodoList Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Add New Task button', () => {
    render(<TodoList />);
    const addNewTaskButton = screen.getByRole('button', {
      name: /add new task/i,
    });
    expect(addNewTaskButton).toBeInTheDocument();
  });

  it('renders list of todos', () => {
    render(<TodoList />);

    TODO_DATA.forEach((todo) => {
      const todoTask = screen.getByText(todo.task);
      expect(todoTask).toBeInTheDocument();
    });
  });

  it('toggles todo completion status when checkbox is clicked', async () => {
    const mockedToggle = jest.fn();
    (useTodoStore as unknown as jest.Mock).mockReturnValueOnce({
      todos: TODO_DATA,
      toggleTodo: mockedToggle,
    });

    const { user } = setupEvents(<TodoList />);

    const checkbox = screen.getByTestId(TODO_DATA[0].id);
    await user.click(checkbox);

    expect(mockedToggle).toHaveBeenCalledWith(TODO_DATA[0].id);
  });
});
