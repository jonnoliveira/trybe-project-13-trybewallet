import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Test the "Login" page', () => {
  const EMAIL = 'jonnutri@trybe.com';
  const PASS = '123456';

  it('checks if the "Login" page is rendered', () => {
    renderWithRouterAndRedux(<App />);

    const image = screen.getByRole('img', {
      name: /login/i,
      src: 'https://cdn.pixabay.com/photo/2018/10/03/11/31/wallet-3721156_1280.png',
    });
    const headingEl = screen.getByRole('heading', {
      name: /faça seu login:/i,
      level: 1,
    });
    const inputEmail = screen.getByText(/email:/i);
    const inputPass = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(headingEl).toBeDefined();
    expect(image).toBeDefined();
    expect(inputEmail).toBeDefined();
    expect(inputPass).toBeDefined();
    expect(button).toBeDefined();
  });

  it('checks if the button is enabled when the e-mail and password are entered in the correct format', () => {
    renderWithRouterAndRedux(<App />);

    const labelEmail = screen.getByText(/email:/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const labelPass = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    act(() => {
      userEvent.type(labelEmail, EMAIL);
      userEvent.type(labelPass, PASS);
    });

    expect(inputEmail).toHaveValue(EMAIL);
    expect(button).toBeEnabled();
  });

  it('checks if the button is disabled when the e-mail are entered in wrong format', () => {
    renderWithRouterAndRedux(<App />);

    const email1 = 'jonnutri@trybe-com';
    const password1 = '123456';
    const labelEmail = screen.getByText(/email:/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const labelPass = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    act(() => {
      userEvent.type(labelEmail, email1);
      userEvent.type(labelPass, password1);
    });

    expect(inputEmail).toHaveValue(email1);
    expect(button).toBeDisabled();

    act(() => {
      userEvent.clear(inputEmail);
    });

    expect(inputEmail).toHaveValue('');

    // ============================ //

    const email2 = 'jonnutritrybe.com';

    act(() => {
      userEvent.type(labelEmail, email2);
      userEvent.type(labelPass, password1);
    });

    expect(inputEmail).toHaveValue(email2);
    expect(button).toBeDisabled();

    act(() => {
      userEvent.clear(inputEmail);
    });

    expect(inputEmail).toHaveValue('');

    // ============================ //

    const email3 = 'jonnutri@trybecom';

    act(() => {
      userEvent.type(labelEmail, email3);
      userEvent.type(labelPass, password1);
    });

    expect(inputEmail).toHaveValue(email3);
    expect(button).toBeDisabled();
  });

  it('checks if the button is disabled when the password is smaller than expected length', () => {
    renderWithRouterAndRedux(<App />);

    const email1 = 'jonnutri@trybe-com';

    const labelEmail = screen.getByText(/email:/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const labelPass = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    act(() => {
      userEvent.type(labelEmail, email1);
      userEvent.type(labelPass, PASS);
    });

    expect(inputEmail).toHaveValue(email1);
    expect(button).toBeDisabled();
  });

  it('checks if the email is saved in the store', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const labelEmail = screen.getByText(/email:/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const labelPass = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    act(() => {
      userEvent.type(labelEmail, EMAIL);
      userEvent.type(labelPass, PASS);
    });

    expect(inputEmail).toHaveValue(EMAIL);
    expect(button).toBeEnabled();

    act(() => {
      userEvent.click(button);
    });

    const { user: { email } } = store.getState();
    expect(email).toBe(EMAIL);
  });

  it('checks whether the user is redirected to the "/carteira" URL page when the "Entrar" button is clicked.', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const labelEmail = screen.getByText(/email:/i);
    const inputEmail = screen.getByRole('textbox', {
      name: /email:/i,
    });
    const labelPass = screen.getByText(/senha:/i);
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    act(() => {
      userEvent.type(labelEmail, EMAIL);
      userEvent.type(labelPass, PASS);
    });

    expect(inputEmail).toHaveValue(EMAIL);
    expect(button).toBeDefined();
    expect(button).toBeEnabled();

    act(() => {
      userEvent.click(button);
    });

    const { pathname } = history.location;
    const heading = screen.getByRole('heading', {
      name: /bem vindo\(a\) de volta!/i,
      level: 1,
    });

    expect(pathname).toBe('/carteira');
    expect(heading).toBeDefined();
  });
});
