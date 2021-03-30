import React from 'react'

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tile from "./components/Tile/Tile";
import {Button} from "@material-ui/core";

class Form extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            configs: [],
            classes: makeStyles((theme) => ({
                root: {
                    flexGrow: 1,
                },
                paper: {
                    padding: theme.spacing(2),
                    textAlign: 'center',
                    color: theme.palette.text.secondary,
                }
            })),
            tileRefs: [],
        }
    }

    componentDidMount() {
        let header = new Headers();
        let init = {
            method: 'get',
            header: header,
            mode: 'cors',
            cache: 'default',
        };

        fetch("https://api.pfa.dietz.dev/configs", init).then(result => result.json()).then(
            (result) => {
                this.setState(
                    {
                        configs: result.items,
                        isLoaded: true,
                    }
                )
            },
            (error) => {
                console.error(error);
                this.setState(
                    {
                        configs: {},
                        isLoaded: true,
                    }
                )
            }
        )
    }

    render() {
        const {isLoaded, configs, classes, tileRefs} = this.state;

        if (!isLoaded){
            return (<div>Loading...</div>)
        }
        return (
            <Grid container className={classes.root} spacing={2} justify={"center"}>
                <Grid item xs={11}>
                    <form>
                        <Grid container justify="center" spacing={2}>
                            {Object.keys(configs).map((index) => {
                                let ref = new React.createRef();

                                tileRefs.push(ref);

                                return (
                                    <Grid key={configs[index].title} xs={4} item>
                                        <Tile ref={ref} tile={configs[index]} key={configs[index].title}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Button type={"submit"} variant={"outlined"}>Generate</Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Form;
