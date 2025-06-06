import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Reports heading', () => {
  render(<App />);
  const heading = screen.getByRole('heading', { name: /Reports/i });
  expect(heading).toBeInTheDocument();
});
