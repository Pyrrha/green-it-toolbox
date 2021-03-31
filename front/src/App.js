import React from "react";

import Title from "./Title";
import Form from "./Form";
import {makeStyles} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
    root: {
        overflow: 'hidden'
    }
}))

function App() {
    const classes = useStyles()
    return (
        <div className={classes.root}>
            <Title/>
            <Form/>
        </div>
    );
}

//import Button from '@material-ui/core/Button';
//
//function App() {
//    return (
//        <Button variant="contained" color="primary">
//            Hello World
//        </Button>
//    );
//}

export default App;
