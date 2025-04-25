import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';
import { vi } from 'vitest';

// Mock the API module
vi.mock('../api', () => ({
    default: {
        get: vi.fn(() => Promise.resolve({ data: [] })),
        post: vi.fn(),
        delete: vi.fn(),
        put: vi.fn(),
    },
}));

describe('App Component', () => {
    it('renders todo app successfully', () => {
        render(<App />);

        // Check if the title is rendered
        expect(screen.getByText('To-Do List')).toBeInTheDocument();

        // Check if the input field is rendered
        expect(screen.getByPlaceholderText('Add your task')).toBeInTheDocument();

        // Check if the add button is rendered
        expect(screen.getByText('ADD')).toBeInTheDocument();
    });
});
