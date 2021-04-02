import React from 'react';
import PropTypes from 'prop-types';
import {Paper, withStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Tile from "../Tile/Tile";
import Code from "../Code/Code";
import {snakeCase} from "snake-case";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    item: {
        minWidth: "20em",
        maxWidth: "45vw",
        marginTop: "2em",
        marginBottom: "2em"
    }
})

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        const classes = this.props.classes;

        return (
            <Grid container className={classes.root} spacing={2} justify={"center"}>
                <Grid item xs={11}>
                    <Grid container justify="center" spacing={2}>
                        {Object.keys(this.props.blocks.items).map((index) => {
                            return (
                                <Grid key={this.props.blocks.items[index].title} className={classes.item} xs={6} item>
                                    <Code lang={this.props.blocks.items[index].lang}
                                          content={this.props.blocks.items[index].content}
                                          modal={this.props.blocks.items[index].modal}
                                          title={this.props.blocks.items[index].title} />
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
