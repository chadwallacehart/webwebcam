'use strict';

// ToDo: turn this back into an anonymous function

let phoneCamStream = false;
let standbyStream = false;
let connected = false;
let shimActive = false;         // Checks to see if shim has been loaded
let phonecamActive = true;      // is phoneCam enabled?
let standbyVideo = false;

/*
 * helper function
 */
function logger(...message) {
    /*
    document.dispatchEvent(new CustomEvent('phonecam-inject', {
        detail: {
            // sourceUrl: window.location.href,
            entity: 'inject.js',
            logger: message
        }
    }));*/
    console.log('phonecam inject: ', message.length === 1 ? JSON.stringify(message[0]) : JSON.stringify(message));
}

/*
 * Video for standby stream
 */

async function getStandbyStream(width = 1280, height = 720, framerate = 30) {
    // Keep just a single stand-by stream running
    if (standbyStream.active) {
        logger("standbyStream already active");
        return standbyStream;
    }

    // Setup the video element
    standbyVideo = document.createElement('video');
    standbyVideo.id = "phonecamStandby";
    standbyVideo.width = width;
    standbyVideo.height = height;
    standbyVideo.plansinline = true;
    standbyVideo.muted = true;
    standbyVideo.loop = true;
    standbyVideo.src = "chrome-extension://ioljfbldffbenoomdbiainpdgdnmmoep/standby.mp4";
    // document.body.appendChild(video);


    standbyStream = standbyVideo.captureStream(framerate);

    /*
    standbyStream.onactive = ()=> {
        console.log("after active", standbyStream);
    };
     */

    await standbyVideo.play();
    console.log("standby video playing", standbyStream);
    return standbyStream

}

/*
* Canvas animation for standby screen
*/
/*
function getStandbyStreamFromCanvas(width = 1280, height = 720, framerate = 30) {

    // ToDo: Check if this is active
    //  do I need to adjust the size & framerate too or just set it large and let
    //  apply constraints set it right? viewer.html experiment shows applyConstraints works
    if (standbyStream.active) {
        logger("standbyStream already active");
        return standbyStream;
    }


    let canvas = document.createElement('canvas');
    canvas.id = "phonecamStandby";
    let ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;

    // source: https://codepen.io/tmrDevelops/pen/vOPZBv
    let col = (x, y, r, g, b) => {
        ctx.fillStyle = `rgb(${r}, ${g}, ${b}`;
        ctx.fillRect(0, 0, 1280, 720);
        ctx.font = "86px Arial";
        ctx.fillStyle = "rgb(225,225,225)";
        ctx.fillText('phonecam not connected', 150, 300);

        // backwards text attempt
        ctx.save();
        ctx.scale(-1, 1); // Flip vertical
        ctx.fillText('phonecam not connected', 165-1280, 400);
        ctx.restore();

    };

    let R = (x, y, t) => Math.floor(192 + 64 * Math.cos((x * x - y * y) / 300 + t));
    let G = (x, y, t) => Math.floor(192 + 64 * Math.sin((x * x * Math.cos(t / 4) + y * y * Math.sin(t / 3)) / 300));
    let B = (x, y, t) => Math.floor(192 + 64 * Math.sin(5 * Math.sin(t / 9) + ((x - 100) * (x - 100) + (y - 100) * (y - 100)) / 1100));

    let t = 0;

    function colors() {
        for (let x = 0; x <= 35; x++) {
            for (let y = 0; y <= 35; y++) {
                col(x, y, R(x, y, t), G(x, y, t), B(x, y, t));
            }
        }
        t = t + 0.120;
    }

    setInterval(() => requestAnimationFrame(colors), 100);

    standbyStream = canvas.captureStream(framerate);
    return standbyStream
}
*/

/*
 * Start peer.js code
 */


let peer, peerId;


async function connectPeer() {
    // logger(`connectPeer called. peerId is ${peerId}`);
    // document.dispatchEvent(new CustomEvent('phonecam-inject', {detail: {message: 'active'}}));

    //eval(peerjs);
    if (!window.Peer) {
        // ToDo: bundle this

        //await fetch('https://unpkg.com/peerjs@1.3.1/dist/peerjs.min.js')
        await fetch('chrome-extension://ioljfbldffbenoomdbiainpdgdnmmoep/peerjs.min.js')
            .then(resp => resp.text())
            .then(js => eval(js))
            .catch(console.error);
    }

    if (peer) {
        logger("peer already established");
        return
    }

    // ToDo: update this - handler was removed in content.js
    if (!peerId) {
        // ToDo: prevent multiple dispatches before a response
        document.dispatchEvent(new CustomEvent('phonecam-inject', {detail: {message: 'getId'}}));
        return;
    }


    /*
    peer = new window.Peer(`${peerId}-page`, {debug: 3});
    peer.on('connection', conn => conn.on('data', data => logger(`phonecam: incoming data: ${data}`)));
    peer.on('disconnected', () => logger("peer disconnected"));
    peer.on('open', id => logger(`phonecam: my peer ID is: ${id}`));

    peer.on('call', call => {
        call.on('stream', stream => {
            if (!phoneCamStream)
                phoneCamStream = window.phoneCamStream = stream;
            else if(phoneCamStream.getTracks().length > 0){
                phoneCamStream.getTracks().forEach(track=>track.stop());
                // stream.getTracks().forEach(track=>phoneCamStream.addTrack(track));
                phoneCamStream = stream;
            }

            logger(`phonecam: stream established with streamId: ${phoneCamStream.id}`);
        });

        call.answer();
    });
    */

    peer = new window.Peer(`${peerId}-page`, {debug: 3});
    peer.on('open', id => console.log(`My peer ID is ${id}. Waiting for call`));

    peer.on('connection', conn => {
        conn.on('data', data => console.log(`Incoming data: ${data}`))
    });
    peer.on('disconnected', () => console.log("Peer disconnected"));

    peer.on('call', call => {
        call.on('stream', stream => {
            console.log("Got stream, switching source");
            if (phoneCamStream.getTracks().length > 0) {
                console.log("phoneCamStream already had tracks");
                phoneCamStream.getTracks().forEach(track => track.stop());
                // stream.getTracks().forEach(track=>phoneCamStream.addTrack(track));
            }
            phoneCamStream = window.phoneCamStream = stream;


            // Stream on is not a function
            // stream.on('close', ()=> "Peer stream stopped");
            // stream.on('error', err=>console.error(err));

        });
        console.log("Answering incoming call");
        call.answer();
    });


}


// ToDo: respond here - https://stackoverflow.com/questions/42462773/mock-navigator-mediadevices-enumeratedevices


/*
 * getUserMedia shim
 */

async function shimGetUserMedia(constraints, nativeGetUserMedia) {

    // Keep the original constraints so we can apply them to the phonecam track later
    const origConstraints = {...constraints};
    logger("gum requested; original constraints:", origConstraints);

    // Check if we should override gUM with our own stream
    let swapAudio = false;
    let swapVideo = false;

    if (constraints.audio && JSON.stringify(constraints.audio).includes('phonecam')) {
        swapAudio = true;
        constraints.audio = false;

    }
    if (constraints.video && JSON.stringify(constraints.video).includes('phonecam')) {
        swapVideo = true;
        constraints.video = false;
    }

    // Add the fake stream(s) to the gUM stream
    async function addToStream(stream) {
        // Use the standby stream is phoneCam is selected, but not active
        console.log(`phonecam: current phoneCamStream`, phoneCamStream);
        if (!phoneCamStream || !phoneCamStream.active) {
            phoneCamStream = await getStandbyStream();

            // ToDo: fix audio mute logic; might need a switch for standbyMedia
            if (swapAudio)
            // unmute the audio track
                standbyVideo.muted = false;
        }

        if (swapVideo) {
            let videoTrack = phoneCamStream.getVideoTracks()[0];
            let videoTrackConstraints = {...origConstraints.video};
            delete videoTrackConstraints.deviceId;
            delete videoTrackConstraints.groupId;
            delete videoTrackConstraints.facingMode;
            await videoTrack.applyConstraints(videoTrackConstraints);
            stream.addTrack(videoTrack);
            logger(`Added video track ${videoTrack.label} to phoneCam stream ${stream.id}`);
        }

        if (swapAudio) {
            let audioTrack = phoneCamStream.getAudioTracks()[0];
            let audioTrackConstraints = {...origConstraints.audio};
            delete audioTrackConstraints.deviceId;
            delete audioTrackConstraints.groupId;
            await audioTrack.applyConstraints(audioTrackConstraints);
            stream.addTrack(audioTrack);
            logger(`Added video track ${audioTrack.label} to phoneCam stream ${stream.id}`);
        }

        // console.log("phonecam: addToStream is returning this stream ", stream);
        // console.log("phonecam: addToStream is returning these stream tracks ", stream.getTracks());

        return stream
    }

    // mute the audio if phonecam audio not needed
    if (swapVideo && !swapAudio && standbyVideo) {
        logger("Phonecam standby audio not active, muting it");
        standbyVideo.muted = true;
    }


    if (swapAudio || swapVideo) {
        logger(`phonecam selected`);

        // let constraints = cleanConstraints(constraints);
        logger("updated constraints for real gUM:", constraints);

        // Load peerJS
        logger(`Here is where I connectPeer using ${peerId}`);
        // await connectPeer();

        // If there is no non-phonecam media devices
        if (!constraints.audio && !constraints.video) {
            logger("No constraints left to pass to getUserMedia");
            return new Promise(async (resolve, reject) => {
                try {
                    phoneCamStream = new MediaStream();
                    phoneCamStream = await addToStream(phoneCamStream);
                    console.log("phoneCamStream", phoneCamStream);
                    resolve(phoneCamStream);
                } catch (err) {
                    logger(`Failed to create phonecam stream: ${err}`);
                    reject(err);
                }
            })
        } else {
            // If there is a non-phonecam media device, then return the original gUM ++
            return nativeGetUserMedia(constraints).then(stream => {
                logger(`phonecam added to gUM stream ${stream.id}`);
                return addToStream(stream);
            }, err => Promise.reject(err)).catch(err => console.log("phonecam: uncaught error", err));
        }

    } else
    // Nothing to change
    // ToDo: shutdown the standby stream if it is running and phonecam not selected?
    //ToDo" this isn't working
    if (standbyStream.active)
        standbyVideo.muted = true;
    logger("phonecam not selected, so just passing this along to gUM");
    return nativeGetUserMedia(origConstraints) // was constraints
}

function shimGum() {

    const origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
    navigator.mediaDevices.getUserMedia = async function (constraints) {
        let stream = await shimGetUserMedia(constraints, origGetUserMedia);
        logger("navigator.mediaDevices.getUserMedia shimmed");
        shimActive = true;
        return stream;
    };


    let _webkitGetUserMedia = async function (constraints, onSuccess, onError) {
        logger("navigator.webkitUserMedia called");
        try {
            let stream = await shimGetUserMedia(constraints, origGetUserMedia);
            logger("navigator.webkitUserMedia should be shimmed");
            shimActive = true;
            return onSuccess(stream)
        } catch (err) {
            logger("_webkitGetUserMedia error!:", err);
            return onError(err);
        }
    };

    navigator.webkitUserMedia = _webkitGetUserMedia;
    navigator.getUserMedia = _webkitGetUserMedia;
}

if (phonecamActive)
    shimGum();

// Finding: you can't send a stream over postMessage


/*
 * enumerateDevices shim
 */
const origEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
navigator.mediaDevices.enumerateDevices = function () {
    // logger("navigator.mediaDevices.enumerateDevices called");
    if (!phonecamActive) {
        return origEnumerateDevices().then(devices => {
            return devices
        });
    } else
        return origEnumerateDevices().then(devices => {

                // logger("enumerateDevices shim");

                // ToDo: verify proper behavior if there are no browser permissions
                // Skip if there are no permissions
                if (devices.filter(d => d.label !== "").length === 0) {
                    return devices
                }

                let noLabel = !devices.find(d => d.label !== "");
                if (noLabel) logger("no device labels found");


                // InputDeviceInfo.prototype + getCapabilities override

                // ToDo: adjust these capabilities based on the phoneCam stream?
                let fakeVideoDevice = {
                    __proto__: InputDeviceInfo.prototype,
                    deviceId: "phonecam-video",
                    kind: "videoinput",
                    label: noLabel ? "" : "phonecam-video",
                    groupId: noLabel ? "" : "phonecam",
                    getCapabilities: () => {
                        logger("fake video capabilities?");
                        return {
                            aspectRatio: {max: 1920, min: 0.000925925925925926},
                            deviceId: noLabel ? "" : "phonecam-video",
                            facingMode: [],
                            frameRate: {max: 30, min: 1},
                            groupId: noLabel ? "" : "phonecam",
                            height: {max: 1080, min: 1},
                            resizeMode: ["none", "crop-and-scale"],
                            width: {max: 1920, min: 1}
                        };
                    },
                    toJSON: () => {
                        return {
                            __proto__: InputDeviceInfo.prototype,
                            deviceId: "phonecam-video",
                            kind: "videoinput",
                            label: noLabel ? "" : "phonecam-video",
                            groupId: noLabel ? "" : "phonecam",
                        }
                    }

                };


                let fakeAudioDevice = {
                    __proto__: InputDeviceInfo.prototype,
                    deviceId: "phonecam-audio",
                    kind: noLabel ? "" : "audioinput",
                    label: "phonecam-audio",
                    groupId: noLabel ? "" : "phonecam",
                    getCapabilities: () => {
                        logger("fake audio capabilities?");
                        return {
                            autoGainControl: [true, false],
                            channelCount: {max: 2, min: 1},
                            deviceId: noLabel ? "" : "phonecam-audio",
                            echoCancellation: [true, false],
                            groupId: noLabel ? "" : "phonecam",
                            latency: {max: 0.002902, min: 0},
                            noiseSuppression: [true, false],
                            sampleRate: {max: 48000, min: 44100},
                            sampleSize: {max: 16, min: 16}
                        }
                    },
                    toJSON: () => {
                        return {
                            __proto__: InputDeviceInfo.prototype,
                            deviceId: "phonecam-audio",
                            kind: noLabel ? "" : "audioinput",
                            label: "phonecam-audio",
                            groupId: noLabel ? "" : "phonecam",
                        }
                    }
                };


                devices.push(fakeVideoDevice);
                devices.push(fakeAudioDevice);


                // ToDo: should I connect here?
                // logger(`Here is where I connectPeer using ${peerId}`);
                // connectPeer();

                // This is needed for Teams
                if (!shimActive) {
                    logger("gUM not shimmed yet");
                    shimGum();
                }


                return devices
            }, err => {
                logger('enumerateDevices shim error', err);
                Promise.reject(err);
            }
        );
};


window.addEventListener('beforeunload', () => {
//    window.removeEventListener('message', {passive: true});

    if (peer)
        peer.destroy();
    logger('beforeunload handler')

}, {passive: true});


document.addEventListener('phonecam-content', e => {
    logger('content.js event data', e.detail);

    if (e.detail.active) {
        let setEnabled = e.detail.active === "active";

        // Disconnect any streams if enabled
        if(phonecamActive && setEnabled && connected){
            peer.destroy();
            phonecamActive = false;
                const event = new Event('');
            // ToDo: initiate a device change event

            return
        }

        if(!phonecamActive && setEnabled){
            // ToDo: initiate a device change event
        }

        logger(phonecamActive === setEnabled ? "no change to phonecamActive" : `phonecamActive is now ${setEnabled}`);
        phonecamActive = setEnabled;
    }


    if (e.detail.peerId) {
        const newId = e.detail.peerId;
        if (peerId === newId) {
            logger("peerId hasn't changed");
        } else {
            peerId = newId;
            logger(`set new peerId: ${newId}`);
            if (peer) {
                peer.destroy();
                peer = false;
                connectPeer();
            }
        }
    }
});


// logger("inject JS loaded");
