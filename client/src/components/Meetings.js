import { faCamera, faChalkboardTeacher, faCircle, faClock, faHeadphonesAlt, faMicrophoneAlt, faPlay, faServer, faStop, faUsers } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CircularProgress } from '@material-ui/core';
import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { getSserverMeetings, logout, redirectToLogin } from '../actions';
import CustomAppBar from './common/CustomAppBar';
class Meetings extends Component {
    constructor(props) {
        super(props);

        this.onGetMeetings();
    }

    componentDidMount() {
        setInterval(this.onGetMeetings, 30000);
    }

    onGetMeetings = () => {
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
                background: "rgb(239, 236, 236)",
                height: "100vh",
                overflow: "scroll",
            }}>
                <CustomAppBar
                    title="Meetings"
                    href="/admin-andrea/servers"
                    logout={this.onLogOut}
                    refresh={this.onGetMeetings}
                />
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                </div>
                <div style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {this.props.meetings?.length == 0
                        ?
                        <div style={{ marginTop: "10px" }}>
                            <CircularProgress color="secondary" />
                            <span
                                style={{
                                    color: 'black',
                                    fontSize: "18px",
                                    marginLeft: "10px",
                                    fontStyle: "italic"
                                }}
                            >
                                Loading meetings from server.
                            </span>
                        </div>
                        : this.props.meetings?.map(meeting => {
                            return (
                                <div class="meetingSection">
                                    <div style={{
                                        display: "flex",
                                        flexDirection: "row",
                                    }}>
                                        <div style={{ margin: "10px", width: "50%" }}>
                                            <span class="title">Basic Information:</span>
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
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.voiceParticipantCount ? meeting.voiceParticipantCount : 0}</span>
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
                                            <span class="title">Moderators:</span>
                                            <div style={{ marginTop: "10px" }}>
                                                <FontAwesomeIcon
                                                    icon={faUsers}
                                                    color="gray"
                                                />
                                                <span style={{ margin: "15px 5px 15px 5px" }}>
                                                    {meeting.attendees.attendee?.length
                                                        ? meeting.attendees.attendee.filter(a => a.role == "MODERATOR").length
                                                        : 1}
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

const mapStateToProps = ({ meeting }) => {
    const { meetings, invalidSecret, redirectTo } = meeting;
    return { meetings, invalidSecret, redirectTo };
};

export default connect(mapStateToProps, {
    getSserverMeetings,
    logout,
    redirectToLogin
})(hot(Meetings));