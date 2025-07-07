import { render, screen } from '@testing-library/react';
import Home from '../app/page';

test('renders landing page hero', () => {
  render(<Home />);
  const heading = screen.getByRole('heading', { name: /계약의 시작과 끝, 대한민국 최고 변호사들이 책임집니다\./ });
  expect(heading).toBeInTheDocument();
}); 