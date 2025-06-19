import { render, screen } from '@testing-library/react';
import Home from '../app/page';

test('renders landing page hero', () => {
  render(<Home />);
  const elements = screen.getAllByText(/AI와 변호사의 하이브리드/);
  expect(elements.length).toBeGreaterThan(0);
}); 