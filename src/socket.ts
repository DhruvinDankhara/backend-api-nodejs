import { config } from 'dotenv';
import { DatabaseModule } from './database/database.module';
config({ path: `.${process.env.NODE_ENV}.env` });

const { createServer } = require("http");
const { Server } = require("socket.io");
var jwt = require('jsonwebtoken');


const httpServer = createServer();
const io = new Server(httpServer, { /* options */ });

// Contain socket id of connected noobs and mentors
const objOnlineMentors = {}
const objOnlineNoobs = {}

// Contain online status of connected mentors
const objOnlineMentorsStatus = {}
// To track connected mentors
const objSessionMembers = {}

// Authentication middleware
io.use((socket, next) => {

    // Validating token with secret based on the type
    let secret = socket.handshake.auth.type === 'MENTOR' ? process.env.MENTOR_AUTH_SECRET : process.env.NOOB_AUTH_SECRET;

    try {
        socket.handshake.auth.decoded = jwt.verify(socket.handshake.auth.token, secret);
    } catch(err) {
        next(new Error("AUTH_ERROR"));
        return;
    }

    socket.decoded = socket.handshake.auth.decoded;
    socket.type = socket.handshake.auth.type;
    next();
});

// Restrict single connection
io.use((socket, next) => {
    // if noob or mentor is already connected, we disconnect existing user
    let objSocket = undefined;

    switch (socket.type) {
        case 'MENTOR':
            objSocket = io.sockets.sockets.get(objOnlineMentors[socket.decoded.mentor_id]);
        break;

        default:
            objSocket = io.sockets.sockets.get(objOnlineNoobs[socket.decoded.noob_id]);
    }

    if (objSocket !== undefined) objSocket.disconnect();

    next();
});


io.on("connection", (socket) => {
    switch (socket.type) {
        case 'MENTOR':
            const mentor_id = socket.decoded.mentor_id;

            objOnlineMentors[mentor_id] = socket.id;
            objOnlineMentorsStatus[mentor_id] = 1;

            // Once mentor connect, we broadcast the message to all other mentors
            socket.to("mentor_broadcast").emit({type: 'mentor_online_status', mentor_id: mentor_id});

            // To join session first time by mentor
            socket.on("join_session", (session_id, callback) => {
                // If already joined by other mentor we return error
                if (objSessionMembers[session_id] === undefined) {
                    callback({ status: false });
                    return;
                }
                
                socket.join("session_" + session_id);
                objSessionMembers[session_id] = {mentor_id: 1};
                callback({ status: true });
            });

            // To join invited session by mentor
            socket.on("join_invited_session", (session_id) => {
                socket.join("session_" + session_id);
                objSessionMembers[session_id][mentor_id] = 1
            });

            // To Leave session
            socket.on("leave_session", (session_id) => {
                socket.leave("session_" + session_id);
            });



            // By default joining following rooms
            // To send message in mentor broadcast channel
            socket.join("mentor_broadcast");

            // To send message to all (noob as well as mentor)
            socket.join("broadcast");


            // To send message to particular room
            socket.on("message", (room_id, message) => {
                switch (message.type) {
                    case 'new_message':

                    break;
                }
                socket.to(room_id).emit(message);
            });

            // To send currently connected mentors
            socket.on("get_mentors_online_status", (callback) => {
                callback(objOnlineMentorsStatus);
            })

            socket.on("disconnect", () => {
                delete objOnlineMentors[mentor_id];
                delete objOnlineMentorsStatus[mentor_id];
            });
        break;

        // default is noob
        default:
            const noob_id = socket.decoded.noob_id;
            objOnlineNoobs[noob_id] = socket.id;

            // Once noob connect, we broadcast the message to all the members (noobs and mentors) to current session_id room
            socket.to("session_" + socket.decoded.session_id).emit({type: 'noob_online_status', noob_id: noob_id});

            // By default joining following rooms
            // To send message in noob broadcast channel
            socket.join("noob_broadcast");

            // To send message to all (noob as well as mentor)
            socket.join("broadcast");

            // To join session room
            socket.join("session_" + socket.decoded.session_id);

            // To send message to particular room
            socket.on("message", (room_id, message) => {
                socket.to(room_id).emit(message);
            });

            socket.on("disconnect", () => {
                delete objOnlineNoobs[noob_id];
            });
        break;
    }
});


httpServer.listen(process.env.SOCKET_PORT, process.env.SOCKET_HOST);