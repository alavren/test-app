'use client';

import { Button, Flex, Stack, useColorModeValue, Text } from '@chakra-ui/react';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';

export default function NavBar() {
  const { user, logout } = useAuthStore();

  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace('/login');
    }
  }, [user]);

  return (
    <Flex
      as="nav"
      justify="space-between"
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={2}
      px={4}
      borderBottom={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}
    >
      <Text as="h1">Nav Bar Title</Text>

      {!user ? (
        <Link href="/login">
          <Button fontSize="sm" colorScheme="teal">
            Login
          </Button>
        </Link>
      ) : (
        <Stack direction="row" alignItems="center">
          <Text as="span">{user.email}</Text>
          <Button onClick={logout} fontSize="sm" colorScheme="teal">
            Logout
          </Button>
        </Stack>
      )}
    </Flex>
  );
}
