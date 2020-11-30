import React, { Component } from 'react';
import { hot } from 'react-hot-loader/root';
import { connect } from 'react-redux';
import loginBackground from '../util/loginBackground.jpg';

let count = 0;
class Meetings extends Component {
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
                {this.props.meetings.map(meeting => {
                    return (
                        <div style={section}>
                            <div style={{
                                display: "flex",
                                flexDirection: "row",
                            }}>
                                <div style={{ margin: "10px", width: "50%" }}>
                                    <span style={title}>Basic Information:</span>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Meeting name: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.meetingName}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Running: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.running === true ? "Yes" : "No"}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Recording: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.recording === true ? "Yes" : "No"}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Number of Participant: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.participantCount}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Number of Moderator: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.moderatorCount}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Number of Listener: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.listenerCount}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>voiceParticipationCount: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.voiceParticipationCount ? meeting.voiceParticipationCount : 0}</span>
                                    </div>
                                    <div style={{ marginTop: "15px" }}>
                                        <span style={text}>Has user joined: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.hasUserJoined ? "Yes" : "No"}</span>
                                    </div>
                                </div>
                                <div style={{ margin: "10px" }}>
                                    <span style={title}>Attendees:</span>
                                    <div style={{ marginTop: "10px" }}>
                                        <span style={text}>Number of attendees: </span>
                                        <span style={{ margin: "15px 5px 15px 5px" }}>{meeting.attendees.attendee?.length ? meeting.attendees.attendee?.length : 0}</span>
                                    </div>
                                    {
                                        meeting.attendees.attendee?.map(attendee => {
                                            count++;
                                            return (
                                                <div style={{ margin: "20px" }}>
                                                    <span style={{ margin: "15px 5px 15px 5px", fontStyle: "italic" }}>Attendee {count}: </span>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <span style={text}>Name: </span>
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{attendee.fullName}</span>
                                                    </div>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <span style={text}>Role: </span>
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{attendee.role}</span>
                                                    </div>
                                                    {/* <div style={{ marginTop: "15px" }}>
                                                        <span style={text}>Listening: </span>
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{attendee.isListeningOnly ? "Yes" : "No"}</span>
                                                    </div>
                                                    <div style={{ marginTop: "15px" }}>
                                                        <span style={text}>Presenter: </span>
                                                        <span style={{ margin: "15px 5px 15px 5px" }}>{attendee.isPresenter ? "Yes" : "No"}</span>
                                                    </div> */}
                                                </div>
                                            )
                                        })}

                                </div>
                            </div>
                        </div>
                    )
                })
                }
            </div >
        );
    }
}

const section = {
    margin: "auto",
    width: "90%",
    height: "400px",
    background: "white",
    opacity: "0.8",
    borderRadius: "20px",
    padding: "10px",
    color: "black",
    marginTop: "20px",
    overflow: "scroll",
    overflowX: "hidden",
    maxHeight: "400px",
}

const text = {
    margin: "15px 5px 15px 15px",
    fontWeight: "600",
    fontSize: "14px",
}

const title = {
    fontSize: "18px",
    fontWeight: "600",
    textDecoration: "underline"
}

const mapStateToProps = ({ server }) => {
    const { meetings } = server;

    return { meetings };
};

export default connect(mapStateToProps, {

})(hot(Meetings));