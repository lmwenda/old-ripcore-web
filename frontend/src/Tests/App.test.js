import { render, screen } from '@testing-library/react';
import App from '../App';

test('Checking if theirs a Surrounding Div', () => {
    render(<App />);
    const div = document.getElementsByTagName("div");
    expect(div).toBeInTheDocument();
})