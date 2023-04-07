import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        list-style: none;
    }

    .submit-button {
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        width: 100%;
        background: rgba(50, 34, 96, 0.6);
        border: none;
        height: 5vh;
        border-radius: 10px;
        color: white;
        font-size: 16px;
        opacity: 0.9;
        cursor: pointer;
        
    }
    .change-modal-text {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
    }
    .submit-button:hover {
        opacity: 1;
    }
    .input-line {
        width:100%;
        font-size: 30x;
        padding: 4px;
    }

    .input-with-error {
        margin-bottom: 15px;

        p {
            color: var(--color-error);
            padding: 5px;
        }
    }

    :root{
        --primary-color: #222260;
        --primary-color2: 'color: rgba(34, 34, 96, .6)';
        --primary-color3: 'color: rgba(34, 34, 96, .4)';
        --color-green: #00ad68;
        --color-grey: #aaa;
        --color-accent: #F56692;
        --color-delete: #FF0000;
        --color-error: #FF3333;
    }

    body{
        font-family: 'Nunito', sans-serif;
        font-size: clamp(1rem, 1.5vw, 1.2rem);
        overflow: hidden;
        color: rgba(34, 34, 96, .6);
    }

    h1, h2, h3, h4, h5, h6{
        color: var(--primary-color);
    }

    .error{
        color: red;
        animation: shake 0.5s ease-in-out;
        @keyframes shake {
            0%{
                transform: translateX(0);
            }
            25%{
                transform: translateX(10px);
            }
            50%{
                transform: translateX(-10px);
            }
            75%{
                transform: translateX(10px);
            }
            100%{
                transform: translateX(0);
            }
        }
    }

    .link {
        text-decoration: none;
        width: fit-content;
        margin-left: 5px;
        opacity: 0.9;
    }
    
    .link:hover {
        opacity: 1;
    }

    
`;