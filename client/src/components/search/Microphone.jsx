import React, { useState } from "react";

import { speechToTextService } from "../../services/speechToText";

import { MicrophoneIcon, StopIcon } from "@heroicons/react/solid";

import { IconButton, Flex } from "@chakra-ui/react";

export default function Microphone(props) {
  // state
  let [micButtonDisplay, setMicButtonDisplay] = useState("block");
  let [stopButtonDisplay, setStopButtonDisplay] = useState("none");

  // microphone recoridng functions

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
      stream.getTracks().forEach(function (track) {
        track.stop();
      });
      const recording = new Blob(recordedChunks, { type: "audio/webm" });
      sendAudioFileToBackend(recording);
    });

    stopButton.addEventListener("click", () => {
      mediaRecorder.stop();
      setStopButtonDisplay("none");
      props.setIsLoading(true);
    });

    mediaRecorder.start();
  };

  const sendAudioFileToBackend = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const result = await speechToTextService.createNewSearch(formData);
    props.setIsLoading(false);
    setMicButtonDisplay("block");
    
    const sanitizedResult = result.data.replaceAll('"', "");
    if(sanitizedResult === "Sorry, I couldn't understand you. Please try again.") {
      props.setIsLoading(false);
      props.searchHandler(sanitizedResult);
    } else {
      props.searchHandler(sanitizedResult);
      props.updateSpeechDone();
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" bg="#EDF2F6" borderRightRadius="md">
      <form onSubmit={props.handleSubmit}>
        <IconButton borderLeftRadius="0" p={2} icon={<StopIcon />} display={stopButtonDisplay} id="stop"></IconButton>
      </form>
      <IconButton borderLeftRadius="0" p={2} icon={<MicrophoneIcon />} display={micButtonDisplay} onClick={(e) => recordMicrophone(e)}></IconButton>
    </Flex>
  );
}
