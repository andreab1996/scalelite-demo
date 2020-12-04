import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import { getSserverMeetings } from '../actions';
import loginBackground from '../util/loginBackground.jpg';
import { faUsers, faPlay, faStop, faCircle, faHeadphonesAlt, faMicrophoneAlt, faVideo, faCamera, faClock, faServer, faChalkboardTeacher } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

let count = 0;
class Meetings extends Component {
    UNSAFE_componentWillMount() {
        let url = window.location.href;
        this.props.getSserverMeetings(url);
        console.log(this.props.meetings)
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
                <div style={{
                    display: "flex",
                    flexDirection: "row",
                }}>
                    <a style={{ marginTop: "30px", marginLeft: "10px", color: "white" }} href="/admin-andrea/servers">Back to Servers</a>
                    <div style={{
                        justifyContent: "center",
                        alignItems: "center",
                        flex: 1,
                    }}>
                        <h1 style={{ textAlign: "center", color: "white" }}>MEETINGS</h1>
                    </div>
                </div>
                <div style={{
                    display: "flex", flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    {this.props.meetings?.length == 0
                        ?
                        <div>
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
                                        <div style={{ margin: "10px" }}>
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
                                        <div style={{ margin: "10px", marginLeft: "50px" }}>
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
                </div>
            </div >
        );
    }
}

const section = {
    margin: "20px",
    width: "90%",
    height: "230px",
    width: "500px",
    background: "white",
    opacity: "0.8",
    borderRadius: "20px",
    padding: "10px",
    color: "black",
    marginTop: "20px",
    overflow: "scroll",
    overflowX: "hidden",
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
    const { meetings } = meeting;
    return { meetings };
};

export default connect(mapStateToProps, {
    getSserverMeetings
})(hot(Meetings));