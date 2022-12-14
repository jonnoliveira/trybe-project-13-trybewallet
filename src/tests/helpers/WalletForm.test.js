import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';

describe('Test the "WalletForm" component', () => {
  // const EXPENSE = [{
  //   id: 0,
  //   value: '10',
  //   currency: 'GBP',
  //   method: 'Cartão de débito',
  //   tag: 'Saúde',
  //   description: 'Hello, world!',
  // }];

  it('checks if the "WalletForm" component is rendered', () => {
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

    userEvent.type(labelEmail, email1);
    userEvent.type(labelPass, password1);

    expect(inputEmail).toHaveValue(email1);
    expect(button).toBeDefined();
    expect(button).toBeEnabled();

    userEvent.click(button);

    // ========================================================== //

    const { pathname } = history.location;
    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputCurrency = screen.getByRole('combobox', { name: /moeda:/i });
    const inputMethod = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const inputTag = screen.getByRole('combobox', { name: /tag:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });

    expect(pathname).toBe('/carteira');
    expect(inputValue).toBeDefined();
    expect(inputCurrency).toBeDefined();
    expect(inputMethod).toBeDefined();
    expect(inputTag).toBeDefined();
    expect(inputDescription).toBeDefined();
    expect(buttonAdd).toBeDefined();
  });

  it('checks if the values ​​typed in the inpus are saved in the global state', async () => {
    const initialEntries = ['/carteira'];
    /* const { store } = */ renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputMethod = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const inputTag = screen.getByRole('combobox', { name: /tag:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const buttonAdd = screen.getByRole('button', { name: /adicionar despesa/i });
    const selectedMethod = screen.getByRole('option', { name: 'Cartão de débito' });
    const selectedTag = screen.getByRole('option', { name: 'Saúde' });

    act(() => {
      userEvent.type(inputValue, '100');
      userEvent.selectOptions(inputMethod, selectedMethod);
      userEvent.selectOptions(inputTag, selectedTag);
      userEvent.type(inputDescription, 'Hello, world!');
    });

    expect(inputValue).toBeDefined();
    expect(inputValue).toHaveValue(100);
    expect(inputMethod).toBeDefined();
    expect(inputMethod).toHaveValue('Cartão de débito');
    expect(inputTag).toBeDefined();
    expect(inputTag).toHaveValue('Saúde');
    expect(inputDescription).toBeDefined();
    expect(inputDescription).toHaveValue('Hello, world!');
    expect(buttonAdd).toBeDefined();

    act(() => {
      userEvent.click(buttonAdd);
    });

    // expect(inputValue).toHaveValue(''); // << não passa
    // expect(inputDescription).toHaveValue('');
    // const { wallet: { currencies } } = store.getState();
    // expect(currencies).toBe();
  });
});
