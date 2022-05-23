import React, { useState } from "react";
import { speechToTextService } from "../../services/speechToText";
import { MicrophoneIcon, StopIcon } from "@heroicons/react/solid";
import { IconButton, Spinner, Flex } from "@chakra-ui/react";

export default function Microphone(props) {
  let [micButtonDisplay, setMicButtonDisplay] = useState("block");
  let [stopButtonDisplay, setStopButtonDisplay] = useState("none");
  let [spinnerDisplay, setSpinnerDisplay] = useState("none");

  const recordMicrophone = async (e) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
    recordUserAudio(stream);
    setMicButtonDisplay("none");
    setStopButtonDisplay("block");
  };

  const recordUserAudio = (stream) => {
    const stopButton = document.getElementById("stop");
    const options = { mimeType: "audio/webm" };
    const recordedChunks = [];
    const mediaRecorder = new MediaRecorder(stream, options);

    mediaRecorder.addEventListener("dataavailable", (e) => {
      if (e.data.size > 0) recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", () => {
      console.log("STOPPED MEDIA RECORDING");
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      const recording = new Blob(recordedChunks, { type: "audio/webm" });
      sendAudioFileToBackend(recording);
    });

    stopButton.addEventListener("click", () => {
      console.log("CLICKED STOP BUTTON");
      mediaRecorder.stop();
      setStopButtonDisplay("none");
      setSpinnerDisplay("block");
    });

    mediaRecorder.start();
  };

  const sendAudioFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await speechToTextService.createNewSearch(formData);
    setSpinnerDisplay("none");
    setMicButtonDisplay("block");

    const sanitizedResult = result.data.replaceAll('"', "");
    props.searchHandler(sanitizedResult);
    props.updateSpeechDone();
  };

  return (
    <Flex justifyContent="center" alignItems="center" bg="#EDF2F6" borderRightRadius="md">
      <form onSubmit={props.handleSubmit}>
        <IconButton borderLeftRadius="0" p={2} icon={<StopIcon />} display={stopButtonDisplay} id="stop"></IconButton>
      </form>

      <Spinner thickness="2px" speed="1s" color="blue.500" display={spinnerDisplay} m={2} p={2} />

      <IconButton borderLeftRadius="0" p={2} icon={<MicrophoneIcon />} display={micButtonDisplay} onClick={(e) => recordMicrophone(e)}></IconButton>
    </Flex>
  );
}
