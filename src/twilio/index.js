import { Device } from "@twilio/voice-sdk";
import { fetchToken } from "../apis/authApi";
import { useEffect, useState } from "react";

export function useDevice() {
  const [device, setDevice] = useState();

  const handleSuccessfulRegistration = () => {
    console.log("The device is ready to receive incoming calls.");
  };

  useEffect(() => {
    fetchToken().then((token) => {
      const deviceInstance = new Device(token);
      setDevice(deviceInstance);

      deviceInstance.on("registered", handleSuccessfulRegistration);

      deviceInstance.audio.outgoing(false);
      deviceInstance.audio.incoming(false);

      deviceInstance.on("tokenWillExpire", async () => {
        const token = await fetchToken();
        deviceInstance.updateToken(token);
      });
    });

    // const deviceInstance = new Device(
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTSzdlZWI1MzQwMzY0MjkwZmQ3MjIxOTdkYjU1YTc5MDIxLTE3MDIyMTkxMTUiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJOYXR1cmFsTmF0ZVJhbGVpZ2giLCJ2b2ljZSI6eyJpbmNvbWluZyI6eyJhbGxvdyI6dHJ1ZX0sIm91dGdvaW5nIjp7ImFwcGxpY2F0aW9uX3NpZCI6IkFQYjEyMjNiNWEyMmRmZmZkZmQ3Mjk4YzE1ODkyNjZhNWQifX19LCJpYXQiOjE3MDIyMTkxMTUsImV4cCI6MTcwMjIyMjcxNSwiaXNzIjoiU0s3ZWViNTM0MDM2NDI5MGZkNzIyMTk3ZGI1NWE3OTAyMSIsInN1YiI6IkFDMzhkZTIwNTkzN2FiMzNkMjgxYzUyZjk1Zjc5NjEwN2IifQ.O21z5XiyIbswmS3igYfnG0i5NKZSU-Y14XomIDfUiso"
    // );

    // setDevice(deviceInstance);

    // deviceInstance.on("registered", handleSuccessfulRegistration);
  }, []);

  return {
    device,
  };
}
