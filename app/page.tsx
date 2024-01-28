'use client';

import TodoList from '@/components/list/ToDoList';
import { useAuthStore } from '@/store/authStore';
import { Text } from '@chakra-ui/react';

export default function Home() {
  const { user } = useAuthStore();

  return user ? <TodoList /> : <Text align="center">Loading...</Text>;
}
