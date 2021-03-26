import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

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
        },
        {
            title: "Tool used"
        },
        {
            title: "Mode"
        }
    ];

    return (
        <Grid container className={classes.root} spacing={2}>
            <Grid item xs={12}>
                <Grid container justify="center" spacing={2}>
                    {forms.map((value) => (
                        <Grid key={value.title} item>
                            <Paper className={classes.paper} children={value.title}/>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

export default Form;