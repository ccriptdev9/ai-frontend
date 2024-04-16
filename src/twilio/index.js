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
      // deviceInstance.audio.incoming(false);
      deviceInstance.audio.disconnect(false);

      deviceInstance.on("tokenWillExpire", async () => {
        const token = await fetchToken();
        deviceInstance.updateToken(token);
      });

      deviceInstance.on("error", (error) => {
        console.log("error", error);
      });
    });
  }, []);

  return {
    device,
  };
}
