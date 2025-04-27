import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../../components/Todo/TodoItem';

describe('TodoItem Component', () => {
    const mockTodo = {
        id: 1,
        text: 'Test Todo',
        completed: false,
        isPending: false,
    };

    const mockOnToggle = vi.fn();
    const mockOnDelete = vi.fn();

    it('renders todo item correctly', () => {
        render(<TodoItem todo={mockTodo} onToggle={mockOnToggle} onDelete={mockOnDelete} />);

        expect(screen.getByText('Test Todo')).toBeInTheDocument();
    });
});
