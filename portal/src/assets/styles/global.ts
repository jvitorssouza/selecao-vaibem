import { darken } from 'polished';
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        width: 100%;
        height: 100%;
        font-family: 'Roboto', sans-serif;
    }

    tr {
        th, td{
            display: table-cell;
            vertical-align: middle;
        }
    }

    .form-label {
        margin-top: 2%;
    }

    .filters-enter {
        opacity: 0;
    }
    .filters-enter-active {
        opacity: 1;
        transition: opacity 200ms;
    }
    .filters-exit {
        opacity: 1;
    }
    .filters-exit-active {
        opacity: 0;
        transition: opacity 200ms;
    }

    .react-confirm-alert-body {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        h1 {
            font-size: 1rem;
            font-weight: 800;
            font-family: "Roboto", sans-serif;
        }

        .btn-danger {
            background: #dc3545;

            &:hover {
                background: ${darken(0.1, '#dc3545')}
            }
        }
        

        .btn-primary {
            background: #825DC1;

            &:hover {
                background: ${darken(0.1, '#825DC1')}
            }
        }

        .btn-secondary {
            background: #A9A9A9;

            &:hover {
                background: ${darken(0.1, '#A9A9A9')}
            }
        }

        .btn-success {
            background: #63D192;

            &:hover {
                background: ${darken(0.1, '#63D192')}
            }
        }

        .btn-warning {
            background: #FEC730;

            &:hover {
                background: ${darken(0.1, '#FEC730')}
            }
        }
    }

    li.page-item {

        > .page-link {
            color: #5741a1;
        }
    }

    li.page-item.active {
        > .page-link {
            background-color: #5741a1;
            border-color: #5741a1;
        }
    }
    
`;
