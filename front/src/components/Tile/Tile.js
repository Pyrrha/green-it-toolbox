import React from 'react';
import PropTypes from 'prop-types';
import './Tile.scss';
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import {FormControl, FormControlLabel, FormGroup, Radio, RadioGroup, Checkbox, FormHelperText} from "@material-ui/core";
import {snakeCase} from "snake-case";
import {green} from "@material-ui/core/colors";

const useStyles = theme => ({
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

class Tile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {

        return (
            <Paper className={this.props.classes.paper}>
                <Typography variant="h5" align={'center'} gutterBottom>{this.props.tile.title}</Typography>
                <Typography>{this.props.tile.text}</Typography>
                {
                    "choices" in this.props.tile ?
                        (
                            <RadioGroup aria-label={this.props.tile.title} required
                                        name={snakeCase(this.props.tile.title) + "[choice]"}>
                                {
                                    Object.keys(this.props.tile.choices).map((keyChoice) => (
                                            <FormControlLabel value={keyChoice} control={<Radio/>}
                                                              label={this.props.tile.choices[keyChoice].label}
                                                              key={keyChoice} />
                                        )
                                    )
                                }
                            </RadioGroup>
                        ) : null
                }
                {
                    "options" in this.props.tile ? (
                        <FormGroup aria-label={this.props.tile.title}
                                   required>
                            {
                                Object.keys(this.props.tile.options).map((keyOption) => (
                                        <FormControlLabel control={<Checkbox name={snakeCase(this.props.tile.title) + "[options][]"}/>}
                                                          label={this.props.tile.options[keyOption].label}
                                                          value={keyOption}
                                                          key={keyOption}
                                                          checked={this.props.tile.options[keyOption].default}
                                                          disabled={this.props.tile.options[keyOption].default}/>
                                    )
                                )
                            }
                        </FormGroup>
                    ) : null
                }
            </Paper>
        )
    }
}

export default withStyles(useStyles)(Tile);
