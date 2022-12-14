import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Test the "Header" component', () => {
  it('checks if the "Header" component is rendered', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const email1 = 'tryber@teste.com';
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
    expect(button).toBeDefined();
    expect(button).toBeEnabled();

    act(() => {
      userEvent.click(button);
    });

    const { pathname } = history.location;

    const image = screen.getByRole('img', {
      name: /uma carteira em desnho com dinheiro saindo/i,
      src: 'https://cdn.pixabay.com/photo/2018/10/03/11/31/wallet-3721156_1280.png',
    });
    const heading = screen.getByRole('heading', {
      name: /bem vindo\(a\) de volta!/i,
      level: 1,
    });
    const email = screen.getByText(/tryber@teste\.com/i);
    const totalField = screen.getByText(/0\.00/i);
    const currency = screen.getByText(/brl/i);

    expect(pathname).toBe('/carteira');
    expect(image).toBeDefined();
    expect(heading).toBeDefined();
    expect(email).toBeDefined();
    expect(totalField).toBeDefined();
    expect(currency).toBeDefined();
  });
});
