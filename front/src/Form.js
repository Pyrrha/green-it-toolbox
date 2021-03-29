import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tile from "./components/Tile/Tile";
import {Button} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

const Form = () => {
    const classes = useStyles();
    const forms = [
        {
            title: "Language",
            choices: {
                "py" : "Python",
                "js" : "JavaScript",
                "php" : "Php",
            },
            text: ""
        },
        {
            title: "Tool used",
            options: {
                "git" : "Git",
                "github" : "Github Actions",
                "docker" : "Docker",
            },
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            title: "Mode",
            text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ];

    return (
        <Grid container className={classes.root} spacing={2} justify={"center"}>
            <Grid item xs={11}>
                <form>
                    <Grid container justify="center" spacing={2}>
                        {forms.map((value) => (
                            <Grid key={value.title} xs={4} item>
                                <Tile tile={value} key={value.title}/>
                            </Grid>
                        ))}
                    </Grid>
                    <Button type={"submit"} variant={"outlined"}>Submit</Button>
                </form>
            </Grid>
        </Grid>
    );
};

export default Form;
