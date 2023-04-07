import {  useNavigate} from "react-router-dom";
import styled from "styled-components";
import { Alert, AlertTitle, Collapse, IconButton } from '@mui/material';
import { Close } from '@mui/icons-material';


function ErrorMessage({trigger, error}) {    
    const navigate = useNavigate()

    return(
        <AppStyled>
            <Collapse in={trigger === true}>
                <Alert variant="filled" severity="error"  action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {

                    }}
                    >
                    <Close fontSize="inherit" />
                    </IconButton>
                }>
                    <AlertTitle>Error</AlertTitle>
                    {error}
            </Alert>
            </Collapse>
        </AppStyled>
    );
}

const AppStyled = styled.div`
    height: 100vh;
    width: 100%;
    background: linear-gradient(180deg, #78c7a7 40%, #a67cbc 90%);
    .standard-form {
        padding-top: 30px;
    }
    
`


export default ErrorMessage;