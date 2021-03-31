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
        this.updateCode = this.updateCode.bind(this)
    }

    updateCode(blocks) {
        this.setState({
            blocks: blocks
        });
    }

    render() {
        const classes = this.props.classes;
        const {blocks} = this.state;
        if (blocks.length <= 0) {
            return (
                <div className={classes.root}>
                    <Title/>
                    <Form updateCode={this.updateCode}/>
                </div>
            )
        } else {
            return (
                <div className={classes.root}>
                    <Title/>
                    <Form/>
                </div>
            )
        }
    }
}

export default withStyles(useStyles)(App);
