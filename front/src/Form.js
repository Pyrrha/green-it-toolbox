import React from 'react'

import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Tile from "./components/Tile/Tile";
import {Button} from "@material-ui/core";

const useStyles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    generate: {}
});

function sendData(value, url, callback, method="post"){
    let header = new Headers();
    let init = {
        method: method,
        header: header,
        mode: 'cors',
        cache: 'default',
        body: value,
    };
    fetch(url, init)
        .then(result => result.json())
        .then(callback)
}

function serialize(form){
    let formData = new FormData(form);
    let object = {};
    formData.forEach((value, index) => {
        let key = index.slice(-2) === "[]" ? index.slice(0, -2) : index
        if(!Reflect.has(object, key)){
            object[key] = value;
            return;
        }
        if(!Array.isArray(object[key]) && index.slice(-2) === "[]"){
            object[key] = [object[key]];
        }
        object[key].push(value);
    });
    let value = JSON.stringify(object);
    return value;
}

class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            configs: [],
            tileRefs: [],
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    doneSubmit(){
        for (const tileIndex in this.state.tileRefs) {
            const tile = this.state.tileRefs[tileIndex].current;
            tile.doneSubmit();
        }
    }

    handleSubmit(event) {
        event.preventDefault();

        for (const tileIndex in this.state.tileRefs) {
            const tile = this.state.tileRefs[tileIndex].current;
            if (!tile.isValid()){
                return false;
            }
        }

        const form = event.currentTarget;
        const initSubmit = new Promise((resolve)=>{
            for (const tileIndex in this.state.tileRefs) {
                const tile = this.state.tileRefs[tileIndex].current;
                tile.submit();
            }
            resolve();
        }).then(()=>{
            let value = serialize(form);
            sendData(value, "https://api.pfa.dietz.dev/configs")
        }).then(()=>{
            this.doneSubmit();
        });
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
                let tileRefs = [];
                for (let tile in result.items){
                    result.items[tile]['ref'] = React.createRef();
                    tileRefs.push(result.items[tile]['ref']);
                }
                this.setState(
                    {
                        configs: result.items,
                        isLoaded: true,
                        tileRefs: tileRefs,
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
        const {isLoaded, configs} = this.state;
        let classes = this.props.classes;

        if (!isLoaded) {
            return (<div>Loading...</div>)
        }
        return (
            <Grid container className={classes.root} spacing={2} justify={"center"}>
                <Grid item xs={11}>
                    <form method={"post"} onSubmit={this.handleSubmit}>
                        <Grid container justify="center" spacing={2}>
                            {Object.keys(configs).map((index) => {
                                return (
                                    <Grid key={configs[index].title} xs={4} item>
                                        <Tile ref={configs[index].ref} tile={configs[index]} key={configs[index].title}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        <Button type={"submit"} variant={"contained"} color={"primary"}
                                className={classes.generate}>Generate</Button>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default withStyles(useStyles)(Form);
