import { React } from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import SearchBar from '../SearchBar';

// fetch ECS 162
beforeEach(() => {
  global.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: '1', course_code: 'ECS162', title: 'Web Programming' },
        ]),
    })
  );
});

afterEach(() => {
  jest.resetAllMocks();
});

// test fetching and displaying of classes
describe('SearchBar', () => {
  const onToggleClass = jest.fn();

  it('fetches and displays classes', async () => {
    render(<SearchBar onToggleClass={onToggleClass} isCurrent={() => false} />);
    const input = screen.getByPlaceholderText(/search for classes/i);
  
    fireEvent.focus(input);
    fireEvent.change(input, { target: { value: 'ecs ' } });
  
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/fetch/class/courses?search=ecs%20');
    });

    // check if course code exists
    const courseCode = await screen.findByText('ECS162');
    expect(courseCode).toBeInTheDocument();

    // check if course title exists
    const courseTitle = await screen.findByText('Web Programming');
    expect(courseTitle).toBeInTheDocument();
  });
});