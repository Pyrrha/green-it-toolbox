import React from 'react';
import PropTypes from 'prop-types';
import './Result.scss';
import {Paper, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tile from "../Tile/Tile";
import Code from "../Code/Code";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
})

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {


        return (
            <Grid container className={this.props.classes.root} spacing={2} justify={"center"}>
                <Grid item xs={11}>
                    <Grid container justify="center" spacing={2}>
                        {Object.keys(this.props.blocks).map((index) => {
                            return (
                                <Grid key={this.props.blocks[index].title} xs={6} item>
                                    <Code lang={"bash"}
                                          content={this.props.blocks[index].content}
                                          modal={this.props.blocks[index].modal}
                                          title={this.props.blocks[index].title} />
                                </Grid>
                            )
                        })}
                    </Grid>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(useStyles)(Result);
