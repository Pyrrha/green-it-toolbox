import React from "react";

import Title from "./Title";
import Form from "./Form";
import {withStyles} from "@material-ui/core";


const useStyles = theme => ({
    root: {
        overflow: 'hidden'
    }
})

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            blocks: [],
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <div className={classes.root}>
                <Title/>
                <Form/>
            </div>
        )
    }
}

export default withStyles(useStyles)(App);
