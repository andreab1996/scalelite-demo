import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

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

export default function CustomAppBar({ title, href = null, logout }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {href !== null ?
                <a style={{ marginTop: "30px", marginLeft: "10px", color: "white" }} href={href}>Back to Servers</a>
                : ""}
            <h1 style={{ textAlign: "center", color: "white", flex: 1, }}>{title}</h1>
            <button
                onClick={() => logout()}
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
