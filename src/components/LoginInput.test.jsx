/**
 * test scenario for LoginInput component
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);

    const emailInput = screen.getByPlaceholderText('Email');

    // action
    await userEvent.type(emailInput, 'fauzanilham630@gmail.com');

    // assert
    expect(emailInput).toHaveValue('fauzanilham630@gmail.com');
  });

  it('should handle password typing correctly', async () => {
    // arrange
    render(<LoginInput login={() => {}} />);

    const passwordInput = screen.getByPlaceholderText('Password');

    // action
    await userEvent.type(passwordInput, 'password123');

    // assert
    expect(passwordInput).toHaveValue('password123');
  });

  it('should call login function when login button is clicked', async () => {
    // arrange
    const mockLogin = vi.fn();

    render(<LoginInput login={mockLogin} />);

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
      screen.getByRole('button', { name: 'Login' }),
    );

    // assert
    expect(mockLogin).toHaveBeenCalledWith({
      email: 'fauzanilham630@gmail.com',
      password: 'password123',
    });

    expect(mockLogin).toHaveBeenCalledTimes(1);
  });
});