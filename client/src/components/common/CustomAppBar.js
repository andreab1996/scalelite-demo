import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        textAlign: "center",
        flexDirection: "row",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    }
}));

export default function CustomAppBar({ title, href = null }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {href !== null ?
                <a style={{ marginTop: "30px", marginLeft: "10px", color: "white" }} href={href}>Back to Servers</a>
                : ""}
            <h1 style={{ textAlign: "center", color: "white", flex: 1, }}>{title}</h1>
            <button
                style={{
                    background: "#4682B4",
                    color: "white",
                    fontSize: "1em",
                    margin: "5px",
                    padding: "0.25em 0.9em",
                    border: "2px solid #4682B4",
                    borderRadius: "5px",
                }}
            >
                Logout
            </button>
        </div>
    );
}
