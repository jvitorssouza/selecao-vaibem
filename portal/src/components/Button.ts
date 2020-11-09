import { darken } from 'polished';
import styled from 'styled-components';

interface Props {
    color: 'primary' | 'warning' | 'success' | 'danger';
    size?: number;
    applyMargin?: boolean;
}

const getColor = (color: string) => {
    switch (color) {
        case 'primary': {
            return '#594ba1';
        }
        case 'success': {
            return '#72e886';
        }
        case 'warning': {
            return '#FEC730';
        }
        case 'danger': {
            return '#DF5957';
        }
        default: {
            return '';
        }
    }
};

export const Button = styled.button<Props>`
    border: none;
    padding: 1%;
    width: ${({ size }) => (size ? `${size}%` : '100%')};
    border-radius: 0.25rem;
    background: ${({ color }) => getColor(color)};
    color: #ffffff;
    margin: ${({ applyMargin = true }) => (applyMargin ? '0.85rem 0' : '')};

    &:hover {
        background: ${({ color }) => darken(0.1, getColor(color))};
    }
`;
