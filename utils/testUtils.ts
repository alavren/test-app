import React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '@testing-library/react';

export function setupEvents(jsx: React.ReactElement) {
  return {
    user: userEvent.setup(),
    ...render(jsx),
  };
}
