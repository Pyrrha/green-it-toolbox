import React from 'react';
import PropTypes from 'prop-types';
import './Code.scss';
import {Paper, withStyles} from "@material-ui/core";

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        return (
            <Paper className={classes.paper}>

            </Paper>
        )
    }
}

export default withStyles(useStyles)(Code);
