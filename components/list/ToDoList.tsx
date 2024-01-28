import { VStack, Box, Text, Checkbox, Button, Center } from '@chakra-ui/react';
import { useTodoStore } from '@/store/todoStore';
import Link from 'next/link';

export default function TodoList() {
  const { todos, toggleTodo } = useTodoStore();

  const handleCheck = (id: number) => {
    return () => toggleTodo(id);
  };

  return (
    <>
      <Center>
        <Link href="/addTodo">
          <Button fontSize="sm" colorScheme="teal" mb={4}>
            Add New Task
          </Button>
        </Link>
      </Center>
      <VStack align="start" spacing={4}>
        {todos.map((todo) => (
          <Box key={todo.id} borderWidth="1px" borderRadius="md" p={4} w="100%">
            <Checkbox
              defaultChecked={todo.completed}
              onChange={handleCheck(todo.id)}
              data-testid={todo.id}
            >
              <Text textDecoration={todo.completed ? 'line-through' : 'none'}>
                {todo.task}
              </Text>
            </Checkbox>
          </Box>
        ))}
      </VStack>
    </>
  );
}
