import { useState } from "react";

import "@radix-ui/themes/styles.css";

import { useDevice } from "./twilio";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";

// const PHONE_NUMBER = "+923055952372";
// const PHONE_NUMBER = "+12057402083";
const PHONE_NUMBER = "+14697074725";

function App() {
  const { device } = useDevice();
  const [phone, setPhone] = useState();

  const [error, setError] = useState();

  const [call, setCall] = useState();
  const [showCallButton, setShowCallButton] = useState(false);

  const handleCallError = (error) => {
    console.log("call Error: ", error);
    console.log("call Error message: ", error?.message);
  };

  const connectCall = async () => {
    console.log("connectin.....");

    try {
      let call = await device.connect({
        params: {
          To: PHONE_NUMBER,
          From: phone,
          // customerId: CUSTOMER_ID,
          // customerPhoneNumber: "+923055952375",
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

  const handlePhoneNumber = async () => {
    setError();

    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    const isValid = regex.test(`${phone}`);

    if (!isValid) return setError("Please provide a valid phone number");

    setShowCallButton(true);
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
      <div>
        {showCallButton && device ? (
          <div className="flex flex-col gap-y-4 justify-center items-center w-[200px]">
            <Button className="w-full" onClick={connectCall}>
              Make a call
            </Button>

            <Button className="w-full" onClick={endCall}>
              End call
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-y-3 flex-col w-[500px] bg-green-300">
            <TextField.Input
              size="3"
              className="block w-full"
              placeholder="Phone (+923xxxxxxxxx)"
              required
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <Text as="p" color="red">
              {error}
            </Text>

            <Button onClick={handlePhoneNumber} className="w-full">
              Next
            </Button>
          </div>
        )}

        <br />
      </div>

      <div className="flex flex-col">
        <Flex direction="column" gap="6" style={{ width: 500 }}></Flex>
      </div>
    </div>
  );
}

export default App;
