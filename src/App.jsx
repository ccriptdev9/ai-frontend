import { useEffect, useState } from "react";
import "./App.css";

import { useDevice } from "./twilio";

// const PHONE_NUMBER = "+923055952372";
const PHONE_NUMBER = "+12057402083";

function App() {
  const { device } = useDevice();

  console.log("device: ", device);

  const [call, setCall] = useState();

  const handleCallError = (error) => {
    console.log("call Error: ", error);
    console.log("call Error message: ", error?.message);
  };

  const connectCall = async () => {
    try {
      let call = await device.connect({
        params: {
          To: PHONE_NUMBER,
        },
      });

      call.on("error", handleCallError);

      setCall(call);
    } catch (error) {
      console.log("connectCall error: ", error);
    }
  };

  const endCall = async () => {
    call.disconnect();
  };

  useEffect(() => {}, []);

  return (
    <div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      <button onClick={connectCall}>Make a call</button>
      <br />
      <br />
      <button onClick={endCall}>End call</button>

      <br />
    </div>
  );
}

export default App;
