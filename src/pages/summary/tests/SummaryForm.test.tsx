// Import necessary dependencies and components
import { render, screen, } from '@testing-library/react';
import SummaryForm from '../SummaryForm';
import userEvent from '@testing-library/user-event'
import { expect,test } from '@jest/globals'
import '@testing-library/jest-dom/extend-expect';
import React from 'react';

// Initial test
test('initial test', () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });
  
  // Assertion
  expect(checkbox).not.toBeChecked();

  const confirmButton = screen.getByRole('button', {
    name: /Confirm Order/i,
  });
  
  // Assertion
  expect(confirmButton).toBeDisabled();
});

// Checkbox interaction test
test('checkbox that disables button on first click and enables on second click', async() => {
    const user = userEvent.setup()

  render(<SummaryForm/>);
  const checkbox = screen.getByRole('checkbox', {
    name: /terms and conditions/i,
  });

  const confirmButton = screen.getByRole('button', {
    name: /Confirm Order/i,
  });

  // Interaction: Click the checkbox to enable the button
   await user.click(checkbox);
  
  // Assertion
  expect(confirmButton).toBeEnabled();

  // Interaction: Click the checkbox again to disable the button
  await user.click(checkbox);
  
  // Assertion
  expect(confirmButton).toBeDisabled();
});

test('popover responds to hover', async() => {

    const user  =  userEvent.setup()
    render(<SummaryForm  />)

    // Popover starts out hidden
    const nullPopover = screen.queryByText(
        /no ice cream will actually be delivered/i)
    expect(nullPopover).not.toBeInTheDocument()

     //popover appears on mouseover of the checkbox label
      const termsAndConditions = screen.getByText(/terms and conditions/i)
      await user.hover(termsAndConditions)
      const popover = screen.getByText(/no ice cream will actually be delivered/i)
      expect(popover).toBeInTheDocument()


    // Popover disappears when we mouse out
      await user.unhover(termsAndConditions)
      expect(popover).not.toBeInTheDocument()

})
