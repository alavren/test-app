'use client';

import {
  Stack,
  Text,
  ButtonGroup,
  IconButton,
  useColorModeValue,
  Flex,
} from '@chakra-ui/react';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

export default function Footer() {
  return (
    <Flex
      as="nav"
      justify="space-between"
      bg={useColorModeValue('white', 'gray.800')}
      color={useColorModeValue('gray.600', 'white')}
      minH={'60px'}
      py={{ base: 2 }}
      px={{ base: 4 }}
      borderTop={1}
      borderStyle={'solid'}
      borderColor={useColorModeValue('gray.200', 'gray.900')}
      align={'center'}
    >
      <Stack justify={'flex-start'} direction={'row'} spacing={6}>
        <Text as="span">Footer text</Text>
      </Stack>

      <Stack
        flex={{ base: 1, md: 0 }}
        justify="flex-end"
        direction="row"
        spacing={6}
      >
        <ButtonGroup variant="tertiary">
          <IconButton
            as="a"
            href="https://www.linkedin.com/"
            aria-label="LinkedIn"
            icon={<FaLinkedin />}
          />
          <IconButton
            as="a"
            href="https://github.com/"
            aria-label="GitHub"
            icon={<FaGithub />}
          />
          <IconButton
            as="a"
            href="https://twitter.com/"
            aria-label="Twitter"
            icon={<FaTwitter />}
          />
        </ButtonGroup>
      </Stack>
    </Flex>
  );
}
