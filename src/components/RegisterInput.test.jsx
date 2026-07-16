/**
 * test scenario for RegisterInput component
 *
 * - RegisterInput component
 *   - should handle username typing correctly
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call register function when register button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle username typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);

    const usernameInput = screen.getByPlaceholderText('Username');

    // action
    await userEvent.type(usernameInput, 'ilham fauzan');

    // assert
    expect(usernameInput).toHaveValue('ilham fauzan');
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'fauzanilham630@gmail.com');

    // assert
    expect(emailInput).toHaveValue('fauzanilham630@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<RegisterInput register={() => {}} />);

    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call register function when register button is clicked', async () => {
    // arrange
    const mockRegister = vi.fn();

    render(<RegisterInput register={mockRegister} />);

    await userEvent.type(
      screen.getByPlaceholderText('Username'),
      'ilham fauzan',
    );

    await userEvent.type(
      screen.getByPlaceholderText('Email'),
      'fauzanilham630@gmail.com',
    );

    await userEvent.type(
      screen.getByPlaceholderText('Password'),
      'password123',
    );

    // action
    await userEvent.click(
      screen.getByRole('button', { name: 'Register' }),
    );

    // assert
    expect(mockRegister).toHaveBeenCalledWith({
      name: 'ilham fauzan',
      email: 'fauzanilham630@gmail.com',
      password: 'password123',
    });

    expect(mockRegister).toHaveBeenCalledTimes(1);
  });
});