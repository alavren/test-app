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
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

type LoginFormInputs = z.infer<typeof schema>;

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    mode: 'onBlur',
    resolver: zodResolver(schema),
  });

  const router = useRouter();

  const { login } = useAuthStore();

  const onSubmit: SubmitHandler<LoginFormInputs> = (
    values: LoginFormInputs,
  ) => {
    login(values.email);
    router.push('/');
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
      <FormControl isInvalid={!!errors.email} p="4" isRequired>
        <FormLabel>Email</FormLabel>
        <Input type="email" placeholder="Email" {...register('email')} />
        <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
      </FormControl>
      <FormControl isInvalid={!!errors.password} px="4" pb="4" isRequired>
        <FormLabel>Password</FormLabel>
        <Input
          {...register('password')}
          type="password"
          placeholder="Password"
          name="password"
        />
        <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
      </FormControl>
      <Button
        type="submit"
        p="4"
        mx="4"
        mt="6"
        w="330px"
        colorScheme="teal"
        disabled={!!errors.email || !!errors.password}
      >
        Login
      </Button>
    </form>
  );
}
