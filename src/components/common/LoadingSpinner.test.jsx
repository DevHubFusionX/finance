import { render } from '@testing-library/react';
import LoadingSpinner from './LoadingSpinner';

test('renders loading spinner', () => {
  const { container } = render(<LoadingSpinner />);
  expect(container.firstChild).toHaveClass('flex');
});