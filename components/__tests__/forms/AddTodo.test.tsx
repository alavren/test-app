import { render, screen } from '@testing-library/react';
import AddTodo from '@/components/forms/AddTodo';
import { useTodoStore } from '@/store/todoStore';
import { TODO_DATA } from '@/data/todoData';
import { useRouter } from 'next/navigation';
import { setupEvents } from '@/utils/testUtils';

jest.mock('next/navigation', () => ({
  __esModule: true,
  useRouter: jest.fn(() => ({
    replace: jest.fn(),
  })),
}));

jest.mock('./../../../store/todoStore', () => ({
  useTodoStore: jest.fn(() => ({
    todos: TODO_DATA,
    addTodo: jest.fn(),
    toggleTodo: jest.fn(),
  })),
}));

describe('AddTodo', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders form with task input and submit button', async () => {
    render(<AddTodo />);

    const taskInput = screen.getByPlaceholderText('Enter task');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    expect(taskInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it('displays error message if task input is empty on form submission', async () => {
    const { user } = setupEvents(<AddTodo />);

    await user.click(screen.getByRole('button', { name: /add todo/i }));

    const errorMessage = screen.getByText(
      /string must contain at least 5 character/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('displays error message if task input is less than 5 characters on form submission', async () => {
    const { user } = setupEvents(<AddTodo />);
    const taskInput = screen.getByPlaceholderText('Enter task');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    const shortStr = 'abc';

    await user.type(taskInput, shortStr);
    await user.click(submitButton);

    const errorMessage = screen.getByText(
      /string must contain at least 5 character/i,
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it('calls addTodo after typing valid task on form submission', async () => {
    const mockAddTodo = jest.fn();
    const mockReplace = jest.fn();

    (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace });

    (useTodoStore as unknown as jest.Mock).mockReturnValue({
      addTodo: mockAddTodo,
    });

    const { user } = setupEvents(<AddTodo />);
    const taskInput = screen.getByPlaceholderText('Enter task');
    const submitButton = screen.getByRole('button', { name: /add todo/i });

    const todoItem = 'Write poem';

    await user.type(taskInput, todoItem);
    await user.click(submitButton);

    expect(mockAddTodo).toHaveBeenCalledWith(todoItem);
    expect(mockReplace).toHaveBeenCalledWith('/');
  });
});
