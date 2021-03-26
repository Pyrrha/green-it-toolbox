import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing(2),
    },
}));

const Form = () => {
    const classes = useStyles();
    const forms = [
        {
            title: "Language",
            choices: [],
            options: []
        },
        {
            title: "Tool used",
            choices: [],
            options: []
        },
        {
            title: "Mode",
            choices: [],
            options: []
        }
    ];

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {forms.map((value) => (
                        <Grid key={value.title} xs={4} item>
                            <Paper className={classes.paper}>
                            <Typography align={'center'}>{value.title}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;