import { faChevronLeft, faSignOutAlt, faSync } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
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
        background: "#D3212D",
        height: "60px"
    }
}));

export default function CustomAppBar({ title, href = null, logout, refresh }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {href !== null ?
                <a
                    style={{
                        marginLeft: "10px",
                        color: "white",
                        lineHeight: "2rem",
                        textDecoration: "none"
                    }}
                    href={href}
                >
                    <FontAwesomeIcon
                        icon={faChevronLeft}
                        size="2px"
                        color="white"
                        style={{ marginRight: "10px" }}
                    />
                    Back to Servers
                </a>
                : ""}
            <h2 style={{
                textAlign: "center",
                color: "white",
                flex: 1,
                lineHeight: "2rem",
                fontSize: "1.75rem",
                fontWeight: "400",
                margin: 0,
            }}>
                {title}
            </h2>

            <button
                onClick={() => refresh()}
                style={{
                    background: "#D3212D",
                    color: "#D3212D",
                    fontSize: "1em",
                    margin: "5px",
                    padding: "0.25em 0.5em",
                    border: "none",
                    outline: "none"
                }}
            >
                <FontAwesomeIcon
                    icon={faSync}
                    size="2px"
                    color="white"
                />
            </button>
            <button
                onClick={() => logout()}
                style={{
                    background: "#D3212D",
                    color: "#D3212D",
                    fontSize: "1em",
                    margin: "5px",
                    padding: "0.25em 0.5em",
                    border: "none",
                    outline: "none"
                }}
            >
                <FontAwesomeIcon
                    icon={faSignOutAlt}
                    size="2px"
                    color="white"
                />
            </button>
        </div>
    );
}
