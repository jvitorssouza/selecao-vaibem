import styled from 'styled-components';
import { darken, lighten } from 'polished';
import { Navbar, Popover } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export const SystemNav = styled.div`
    width: 100%;
    height: 100px;
    background: ${darken(0.1, '#7059bc')};
    padding: 0 5%;

    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;

    .logo {
        width: 45%;

        @media (min-width: 650px) {
            width: 35%;
        }

        @media (min-width: 850px) {
            width: 30%;
        }

        @media (min-width: 1100px) {
            width: 25%;
        }

        @media (min-width: 1300px) {
            width: 20%;
        }

        @media (min-width: 1700px) {
            width: 15%;
        }

        > img {
            width: 100%;
        }
    }

    .menu {
        width: 60%;
    }

    > span {
        width: 15%;
        display: flex;
        justify-content: center;
        align-items: center;

        color: #ffffff;
        font-family: 'Roboto', sans-serif;
        font-weight: 500;

        > strong {
            margin: 0 10px 0 5px;
        }

        > img {
            width: 20%;
            margin: 0 10px;
        }

        > p {
            display: flex;
            justify-content: center;
            align-items: center;
        }

        @media (max-width: 1280px) {
            .user__name {
                display: none;
            }

            > img {
                width: 80%;
                margin: 0 10px;
            }
        }

        &:hover {
            cursor: pointer;
        }
    }
`;

export const UserMenu = styled(Popover)`
    width: 20%;
    padding: 2%;

    @media (max-width: 1280px) {
        width: 50%;
    }

    .user-info {
        display: flex;
        justify-content: center;
        align-items: center;

        > img {
            width: 20%;
        }

        .user-name-function {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            padding: 0 10%;
            text-transform: uppercase;

            .name {
                font-weight: 800;
            }

            .function {
                font-weight: 300;
                font-size: 0.8rem;
            }
        }
    }

    .buttons {
        display: flex;
        grid-gap: 10px;

        > button {
            border: none;
            flex: 1;
            padding: 2% 5%;
            background: #1a2228;
            border-radius: 0.3rem;
            color: #fff;
            font-weight: 400;
            transition: 0.2s;

            &:hover {
                transform: scale(1.05);
            }
        }
    }
`;

export const NavigationMenu = styled(Navbar)`
    background: #7059bc;
    border-bottom: 1px solid #ddd;

    width: 100%;
    padding: 5px 5%;
    display: flex;
    justify-content: center;
    align-items: center;
`;

interface MenuItemProps {
    itemActive?: boolean;
}

export const NavigationMenuItem = styled(Link)<MenuItemProps>`
    padding: 1% 3%;
    background: ${({ itemActive = false }) =>
        itemActive ? 'rgba(0, 0, 0, 0.15)' : ''};
    border-radius: 0.3rem;
    margin-right: 10px;
    color: #ffffff;

    &:hover {
        color: #ffffff;
        background: rgba(0, 0, 0, 0.2);
        text-decoration: none;
    }
`;
