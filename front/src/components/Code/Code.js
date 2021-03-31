import React from 'react';
import PropTypes from 'prop-types';
import {Paper, withStyles} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import 'highlight.js/styles/default.css'

const hljs = require('highlight.js');

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    paperCode: {
        padding: theme.spacing(2),
        textAlign: 'initial'
    },
})

class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        hljs.highlightAll();
    }

    render() {
        const code = this.props;

        return (
            <Paper className={this.props.classes.paper}>
                <Typography variant="h5" align={'center'} gutterBottom>{code.title}</Typography>
                <Paper className={this.props.classes.paperCode}>
                    <pre>
                        <code >
                            {code.content}
                        </code>
                    </pre>
                </Paper>
            </Paper>
        )
    }
}

export default withStyles(useStyles)(Code);
