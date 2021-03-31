import React from 'react';
import PropTypes from 'prop-types';
import {Button, Modal, Paper, withStyles} from "@material-ui/core";
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
    paperModal: {
        position: 'absolute',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(2, 4, 3),
        top: window.innerHeight/2,
        left: window.innerWidth/2 - 200,
    },
})

class Code extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpen: false,
        }
        this.toggleModal = this.toggleModal.bind(this);
    }

    componentDidMount() {
        hljs.highlightAll();
    }

    toggleModal(){
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        const code = this.props;
        const {modalOpen} = this.state;

        return (
            <Paper className={this.props.classes.paper}>
                <Typography variant="h5" align={'center'} gutterBottom>{code.title}</Typography>
                <Button onClick={this.toggleModal}>How to install?</Button>
                <Modal open={modalOpen}
                       onClose={this.toggleModal}
                       aria-labelledby={"simple-modal-title"}
                       aria-describedby={"simple-modal-description"}>
                    <Paper className={this.props.classes.paperModal}>
                        <Typography variant={"h5"} align={"center"} id="simple-modal-title">{code.title}</Typography>
                        <Typography align={"left"} id="simple-modal-description">
                            {code.modal}
                        </Typography>
                    </Paper>
                </Modal>
                <Paper className={this.props.classes.paperCode}>
                    <pre>
                        <code className={code.lang}>
                            {code.content}
                        </code>
                    </pre>
                </Paper>
            </Paper>
        )
    }
}

export default withStyles(useStyles)(Code);
