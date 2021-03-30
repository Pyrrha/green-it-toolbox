import React from 'react';
import PropTypes from 'prop-types';
import './Tile.scss';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {makeStyles} from "@material-ui/core/styles";
import {FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Checkbox, FormHelperText} from "@material-ui/core";
import {snakeCase} from "snake-case";
import {green} from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

const Tile = (props) => {
    const classes = useStyles();
    const tile = props.tile

    return (
        <Paper className={classes.paper}>
            <Typography variant="h5" align={'center'} gutterBottom>{tile.title}</Typography>
            <Typography>{tile.text}</Typography>
            {
                "choices" in tile ?
                    (
                            <RadioGroup aria-label={tile.title} required
                                        name={snakeCase(tile.title) + "[choice]"}>
                                {
                                    Object.keys(tile.choices).map((keyChoice) => (
                                            <FormControlLabel value={keyChoice} control={<Radio/>}
                                                              label={tile.choices[keyChoice].label}
                                                              key={keyChoice} className={classes.radio}/>
                                        )
                                    )
                                }
                            </RadioGroup>
                    ) : null
            }
            {
                "options" in tile ? (
                    <FormGroup aria-label={tile.title}
                               required>
                        {
                            Object.keys(tile.options).map((keyOption) => (
                                    <FormControlLabel control={<Checkbox name={snakeCase(tile.title) + "[options][]"}/>}
                                                      label={tile.options[keyOption].label}
                                                      value={keyOption}
                                                      key={keyOption}
                                                      checked={tile.options[keyOption].default}
                                                      disabled={tile.options[keyOption].default}/>
                                )
                            )
                        }
                    </FormGroup>
                ) : null
            }
        </Paper>
    );
}

Tile.defaultProps = {};

export default Tile;
