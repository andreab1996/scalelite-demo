import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { getSserverMeetings, logout, redirectToLogin } from '../actions';
import loginBackground from '../util/loginBackground.jpg';
import { faUsers, faPlay, faStop, faCircle, faHeadphonesAlt, faMicrophoneAlt, faVideo, faCamera, faClock, faServer, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Redirect } from 'react-router-dom';
import CustomAppBar from './common/CustomAppBar';
import { CircularProgress } from '@material-ui/core';
class Meetings extends Component {
    constructor(props) {
        super(props);

        let url = window.location.href;
        this.props.getSserverMeetings(url);
    }

    onLogOut = () => {
        this.props.logout();
        this.props.redirectToLogin("/admin-andrea/");
    }

    render() {
        return (
            <div style={{
                background: `url(${loginBackground})`,
                height: "100vh",
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                overflow: "scroll",
            }}>
                <CustomAppBar title="MEETINGS" href="/admin-andrea/servers" logout={this.onLogOut} />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                </div>
                <div style={{
                    display: "flex", flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {this.props.meetings?.length == 0
                        ?
                        <div>
                            <CircularProgress color="secondary" />
                            <span style={{ color: 'white', fontSize: "18px", marginLeft: "10px", fontStyle: "italic" }}>
                                No meetings were found on this server.
                            </span>
                        </div>
                        : this.props.meetings?.map(meeting => {
                            return (
                                <div style={section}>
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}>
                                        <div style={{ margin: "10px", width: "50%" }}>
                                            <span style={title}>Basic Information:</span>
                                            <div style={{ marginTop: "10px" }}>
                                                <FontAwesomeIcon
                                                    icon={faServer}
                                                    color="gray"
                                                />
                                                <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.metadata["bbb-origin-server-name"]} ({meeting.metadata["bbb-origin"]})</span>
                                            </div>
                                            <div style={{ flexDirection: "row", display: "flex" }}>
                                                <div style={{ flexDirection: "column", display: "flex" }}>
                                                    <div style={{ marginTop: "15px", marginRight: "80px" }}>
                                                        {meeting.running ?
                                                            <FontAwesomeIcon
                                                                icon={faPlay}
                                                                color="green"
                                                            />
                                                            : <FontAwesomeIcon
                                                                icon={faStop}
                                                                color="red"
                                                            />
                                                        }
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.meetingName}</span>
                                                    </div>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <FontAwesomeIcon
                                                            icon={faUsers}
                                                            color="gray"
                                                        />
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.participantCount}</span>
                                                    </div>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <FontAwesomeIcon
                                                            icon={faMicrophoneAlt}
                                                            color="gray"
                                                        />
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.voiceParticipationCount ? meeting.voiceParticipationCount : 0}</span>
                                                    </div>
                                                </div>
                                                <div style={{ flexDirection: "column", display: "flex" }}>
                                                    <div style={{ marginTop: "15px" }}>
                                                        {meeting.recording ?
                                                            <FontAwesomeIcon
                                                                icon={faCircle}
                                                                color="green"
                                                            />
                                                            : <FontAwesomeIcon
                                                                icon={faCircle}
                                                                color="red"
                                                            />
                                                        }
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.recording === true ? "Yes" : "No"}</span>
                                                    </div>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <FontAwesomeIcon
                                                            icon={faHeadphonesAlt}
                                                            color="gray"
                                                        />
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.listenerCount}</span>
                                                    </div>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <FontAwesomeIcon
                                                            icon={faCamera}
                                                            color="gray"
                                                        />
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.videoCount}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div style={{ marginTop: "15px" }}>
                                                <FontAwesomeIcon
                                                    icon={faClock}
                                                    color="gray"
                                                />
                                                <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.time} ({meeting.duration})</span>
                                            </div>

                                        </div>
                                        <div style={{ margin: "10px", marginLeft: "50px", width: "50%" }}>
                                            <span style={title}>Moderators:</span>
                                            <div style={{ marginTop: "10px" }}>
                                                <FontAwesomeIcon
                                                    icon={faUsers}
                                                    color="gray"
                                                />
                                                <span style={{ margin: "15px 5px 15px 5px" }}>
                                                    {meeting.attendees.attendee?.length
                                                        ? meeting.attendees.attendee.filter(a => a.role == "MODERATOR").length
                                                        : 0}
                                                </span>
                                            </div>
                                            {
                                                Array.isArray(meeting.attendees.attendee) ?
                                                    meeting.attendees.attendee?.map(attendee => {
                                                        if (attendee.role == "MODERATOR") {
                                                            return (
                                                                <div style={{ margin: "20px" }}>
                                                                    <div style={{ marginTop: "15px" }}>
                                                                        <FontAwesomeIcon
                                                                            icon={faChalkboardTeacher}
                                                                            color="gray"
                                                                        />
                                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{attendee.fullName}</span>
                                                                    </div>
                                                                </div>
                                                            )
                                                        }
                                                    }) :
                                                    (
                                                        <div style={{ margin: "20px" }}>
                                                            <div style={{ marginTop: "15px" }}>
                                                                {meeting.attendees.attendee?.fullName
                                                                    ? <FontAwesomeIcon
                                                                        icon={faChalkboardTeacher}
                                                                        color="gray"
                                                                    />
                                                                    : ""}
                                                                <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.attendees.attendee?.fullName}</span>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    {
                        this.props.redirectTo !== null
                            ? <Redirect to={this.props.redirectTo} />
                            : ""
                    }
                    {
                        this.props.invalidSecret
                            ? <Redirect to="/admin-andrea" />
                            : ""
                    }
                </div>
            </div >
        );
    }
}

const section = {
    margin: "20px",
    height: "auto",
    width: "600px",
    background: "white",
    opacity: "0.8",
    borderRadius: "20px",
    padding: "10px",
    color: "black",
    marginTop: "20px",
}

const text = {
    margin: "15px 5px 15px 15px",
    fontWeight: "700",
    fontSize: "14px",
}

const title = {
    fontSize: "18px",
    fontWeight: "700",
    textDecoration: "underline"
}

const mapStateToProps = ({ meeting }) => {
    const { meetings, invalidSecret, redirectTo } = meeting;
    return { meetings, invalidSecret, redirectTo };
};

export default connect(mapStateToProps, {
    getSserverMeetings,
    logout,
    redirectToLogin
})(hot(Meetings));