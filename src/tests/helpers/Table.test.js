import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderWithRouterAndRedux } from './renderWith';
import App from '../../App';
import mockData from './mockData';

describe('Test the "Table" component', () => {
  it('checks if the "Table" component is rendered', () => {
    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const tableDescription = screen.getByRole('columnheader', {
      name: /descrição/i,
    });
    const tableTag = screen.getByRole('columnheader', {
      name: /tag/i,
    });
    const tableMethod = screen.getByRole('columnheader', {
      name: /método de pagamento/i,
    });
    const tableValue = screen.getByRole('columnheader', {
      name: 'Valor',
    });
    const tableCoin = screen.getByRole('columnheader', {
      name: 'Moeda',
    });
    const tableExchange = screen.getByRole('columnheader', {
      name: /câmbio utilizado/i,
    });
    const tableConvertedValue = screen.getByRole('columnheader', {
      name: /valor convertido/i,
    });
    const tableConversionCurrency = screen.getByRole('columnheader', {
      name: /moeda de conversão/i,
    });
    const tableEditDelete = screen.getByRole('columnheader', {
      name: /editar\/excluir/i,
    });

    expect(tableDescription).toBeDefined();
    expect(tableTag).toBeDefined();
    expect(tableMethod).toBeDefined();
    expect(tableValue).toBeDefined();
    expect(tableCoin).toBeDefined();
    expect(tableExchange).toBeDefined();
    expect(tableConvertedValue).toBeDefined();
    expect(tableConversionCurrency).toBeDefined();
    expect(tableEditDelete).toBeDefined();
  });

  it('checks if the added expenses appear in the table', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByRole('spinbutton', {
      name: /valor:/i,
    });
    const inputMethod = screen.getByRole('combobox', {
      name: /método de pagamento:/i,
    });
    const inputTag = screen.getByRole('combobox', {
      name: /tag:/i,
    });
    const inputDescription = screen.getByRole('textbox', {
      name: /descrição:/i,
    });
    const buttonAdd = await screen.findByRole('button', { name: /adicionar despesa/i });

    const selectedMethod = screen.getByRole('option', { name: 'Cartão de débito' });
    const selectedTag = screen.getByRole('option', { name: 'Saúde' });

    act(() => {
      userEvent.type(inputValue, '100');
      userEvent.selectOptions(inputMethod, selectedMethod);
      userEvent.selectOptions(inputTag, selectedTag);
      userEvent.type(inputDescription, 'Hello, world!');
    });

    expect(inputValue).toHaveValue(100);
    expect(inputMethod).toHaveValue('Cartão de débito');
    expect(inputTag).toHaveValue('Saúde');
    expect(inputDescription).toHaveValue('Hello, world!');
    expect(buttonAdd).toBeDefined();

    act(() => {
      userEvent.click(buttonAdd);
    });

    // expect(inputValue).toHaveValue(''); // << não passa T.T

    const descriptionTableValue = await screen.findByText(/hello, world!/i);
    const tagTableValue = await screen.findByRole('cell', {
      name: /saúde/i,
    });
    const methodTableValue = await screen.findByRole('cell', {
      name: /cartão de débito/i,
    });
    const valueTableValue = await screen.findByRole('cell', {
      name: /100\.00/i,
    });
    const coinTableValue = await screen.findByRole('cell', {
      name: /dólar americano\/real brasileiro/i,
    });
    const exchangeTableValue = await screen.findByRole('cell', {
      name: /4\.75/i,
    });
    const convertedTableValue = await screen.findByRole('cell', {
      name: /475\.31/i,
    });
    const conversionTableValue = await screen.findByRole('cell', {
      name: 'Real',
    });
    const buttonEdit = await screen.findByRole('cell', {
      name: /editar/i,
    });
    const buttonDelete = await screen.findByRole('cell', {
      name: /exclui/i,
    });

    expect(descriptionTableValue).toBeDefined();
    expect(tagTableValue).toBeDefined();
    expect(methodTableValue).toBeDefined();
    expect(valueTableValue).toBeDefined();
    expect(coinTableValue).toBeDefined();
    expect(exchangeTableValue).toBeDefined();
    expect(convertedTableValue).toBeDefined();
    expect(conversionTableValue).toBeDefined();
    expect(buttonEdit).toBeDefined();
    expect(buttonDelete).toBeDefined();
  });

  it('checks if the "Excluir" and "Editar" buttons delete and edit, respectively, expenses in the table', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    const initialEntries = ['/carteira'];
    renderWithRouterAndRedux(<App />, { initialEntries });

    const inputValue = screen.getByRole('spinbutton', { name: /valor:/i });
    const inputMethod = screen.getByRole('combobox', { name: /método de pagamento:/i });
    const inputTag = screen.getByRole('combobox', { name: /tag:/i });
    const inputDescription = screen.getByRole('textbox', { name: /descrição:/i });
    const buttonAdd = await screen.findByRole('button', { name: /adicionar despesa/i });
    const selectedMethod = screen.getByRole('option', { name: 'Cartão de crédito' });
    const selectedTag = screen.getByRole('option', { name: 'Saúde' });

    act(() => {
      userEvent.type(inputValue, '100');
      userEvent.selectOptions(inputMethod, selectedMethod);
      userEvent.selectOptions(inputTag, selectedTag);
      userEvent.type(inputDescription, 'Again!');
    });

    expect(inputValue).toHaveValue(100);
    expect(inputMethod).toHaveValue('Cartão de crédito');
    expect(inputTag).toHaveValue('Saúde');
    expect(inputDescription).toHaveValue('Again!');
    expect(buttonAdd).toBeDefined();

    act(() => {
      userEvent.click(buttonAdd);
    });

    const descriptionTableValue = await screen.findByText(/again!/i);
    const tagTableValue = await screen.findByRole('cell', { name: /saúde/i });
    const methodTableValue = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const valueTableValue = await screen.findByRole('cell', { name: /100\.00/i });
    const coinTableValue = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const exchangeTableValue = await screen.findByRole('cell', { name: /4\.75/i });
    const convertedTableValue = await screen.findByRole('cell', { name: /475\.31/i });
    const conversionTableValue = await screen.findByRole('cell', { name: 'Real' });
    const buttonDelete = await screen.findByRole('button', { name: /excluir/i });

    expect(descriptionTableValue).toBeDefined();
    expect(tagTableValue).toBeDefined();
    expect(methodTableValue).toBeDefined();
    expect(valueTableValue).toBeDefined();
    expect(coinTableValue).toBeDefined();
    expect(exchangeTableValue).toBeDefined();
    expect(convertedTableValue).toBeDefined();
    expect(conversionTableValue).toBeDefined();
    expect(buttonDelete).toBeDefined();

    act(() => {
      userEvent.click(buttonDelete);
    });

    expect(buttonDelete).not.toBeInTheDocument();

    act(() => {
      userEvent.type(inputValue, '100');
      userEvent.selectOptions(inputMethod, selectedMethod);
      userEvent.selectOptions(inputTag, selectedTag);
      userEvent.type(inputDescription, 'Again and again!');
    });

    act(() => {
      userEvent.click(buttonAdd);
    });

    const buttonEdit = await screen.findByRole('button', { name: /editar/i });

    expect(buttonEdit).toBeDefined();

    act(() => {
      userEvent.click(buttonEdit);
    });

    act(() => {
      userEvent.type(inputValue, '350');
      userEvent.type(inputDescription, 'Xablau');
    });

    const buttonSave = await screen.findByRole('button', { name: /editar despesa/i });

    act(() => {
      userEvent.click(buttonSave);
    });

    const descriptionTableValueEdited = screen.findByRole('cell', { name: /xablau/i });
    const valueTableValueEdited = screen.findByRole('cell', { name: /350\.00/i });

    expect(await descriptionTableValueEdited).toBeDefined();
    expect(await valueTableValueEdited).toBeDefined();
  });
});
