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
            isChoice: false,
            helperText: "Please choose one.",
            disabled: true,
        }
        this.handleChoice = this.handleChoice.bind(this);
        this.isValid = this.isValid.bind(this);
        this.submit = this.submit.bind(this);
    }

    handleChoice(event){
        this.setState({
            isChoice: true,
            helperText: "",
        })
    }

    isValid(){
        return this.props.tile.choices === undefined || this.props.tile.choices.length <= 0 || this.state.isChoice;
    }

    submit(){
        this.setState({
            disabled: false,
        })
    }

    doneSubmit(){
        this.setState({
            disabled: true,
        })
    }

    render() {

        return (
            <Paper className={this.props.classes.paper}>
                <Typography variant="h5" align={'center'} gutterBottom>{this.props.tile.title}</Typography>
                <Typography>{this.props.tile.text}</Typography>
                {
                    "choices" in this.props.tile ?
                        (
                            <FormControl component={"fieldset"} required={true} error={this.state.isChoice}>
                                <RadioGroup aria-label={this.props.tile.title}
                                            name={snakeCase(this.props.tile.title) + "[choice]"} onChange={this.handleChoice}>
                                    {
                                        Object.keys(this.props.tile.choices).map((keyChoice) => (
                                                <FormControlLabel value={keyChoice} control={<Radio color={"primary"}/>}
                                                                  label={this.props.tile.choices[keyChoice].label}
                                                                  key={keyChoice}/>
                                            )
                                        )
                                    }
                                </RadioGroup>
                                <FormHelperText>{this.state.helperText}</FormHelperText>
                            </FormControl>
                        ) : null
                }
                {
                    "options" in this.props.tile ? (
                        <FormGroup aria-label={this.props.tile.title}
                                   required>
                            {
                                Object.keys(this.props.tile.options).map((keyOption) => (
                                        <FormControlLabel control={<Checkbox color={"primary"} name={snakeCase(this.props.tile.title) + "[options][]"}/>}
                                                          label={this.props.tile.options[keyOption].label}
                                                          value={keyOption}
                                                          key={keyOption}
                                                          checked={this.props.tile.options[keyOption].default}
                                                          disabled={this.props.tile.options[keyOption].default && this.state.disabled}/>
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
