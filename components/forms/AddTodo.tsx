'use client';

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
} from '@chakra-ui/react';
import { z } from 'zod';
import { SubmitHandler, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTodoStore } from '@/store/todoStore';
import { useRouter } from 'next/navigation';

const schema = z.object({
  task: z.string().min(5).max(100),
});

type TodoFormInputs = z.infer<typeof schema>;

export default function AddTodo() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TodoFormInputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const router = useRouter();
  const { addTodo } = useTodoStore();

  const onSubmit: SubmitHandler<TodoFormInputs> = (values: TodoFormInputs) => {
    addTodo(values.task);
    router.replace('/');
  };

  return (
    <form
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '360px',
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <FormControl isInvalid={!!errors.task} p="4" isRequired>
        <FormLabel>Task</FormLabel>
        <Input
          type="text"
          placeholder="Enter task"
          {...register('task')}
          autoFocus
        />
        <FormErrorMessage>{errors.task?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        p="4"
        mx="4"
        mt="6"
        w="90%"
        colorScheme="teal"
        disabled={!!errors.task}
      >
        Add Todo
      </Button>
    </form>
  );
}
