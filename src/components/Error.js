import React from 'react';

import { Grid, Jumbotron } from 'react-bootstrap';

export const ErrorApi = (props) => {
    return (
        <Grid>
            <Jumbotron>
                <h1>Something went wrong!</h1>
                <p>
                    Please check the logs or contact the developer.       
                </p>
            </Jumbotron>
        </Grid>
    );
}

export const ErrorPage = (props) => {
    return (
        <Grid>
            <Jumbotron>
                <h1>Page Not Found!</h1>
                <p>
                    Please check the URL that you are trying to open.
                </p>
            </Jumbotron>
        </Grid>
    );
}