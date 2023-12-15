import { useEffect, useState } from "react";
// import "./App.css";
import "@radix-ui/themes/styles.css";

import { useDevice } from "./twilio";
import { Button, Flex, Text, TextField } from "@radix-ui/themes";

import OtpInput from "react-otp-input";
import { addUser } from "./firebase/users";
import { sendOTP, verifyOTP } from "./apis/authApi";

// const PHONE_NUMBER = "+923055952372";
// const PHONE_NUMBER = "+12057402083";
const PHONE_NUMBER = "+14697074725";

function App() {
  const { device } = useDevice();

  const [otp, setOtp] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();

  const [error, setError] = useState();

  const [step, setStep] = useState(1);

  // console.log("device: ", device);

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

  const handleSendOTP = async () => {
    setError();

    const regex = /^(\+\d{1,2}\s?)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;

    const isValid = regex.test(`${phone}`);

    if (!isValid) return setError("Please provide a valid phone number");
    setStep(() => step + 1);

    await sendOTP(phone);
  };

  const handleVerifyOTP = async () => {
    setStep(() => otp + 1);

    setError();

    console.log("otp", otp);

    if (!otp || otp?.length !== 4) {
      return setError("Please enter a valid verification code.");
    }

    const response = await verifyOTP(otp, phone);

    if (!response) {
      setError("Invalid verification code.");
      setStep(() => step - 1);
    }
  };

  const handleAddUser = async () => {
    setError();

    const regex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!name || !email) {
      return setError("Please enter name and email");
    } else if (!regex.test(email)) {
      return setError("Please enter valid email");
    }

    const user = {
      id: localStorage.getItem("cheetah-user-id"),
      name,
      email,
      phone,
    };

    console.log("user", user);
    await addUser(user).then(() => {
      alert("Account created succesfully");

      setStep(1);
      setPhone();
      setEmail();
      setOtp();
      setName();
    });
  };

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-y-4">
      <div>
        {/* <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}

        {device ? (
          <div className="flex flex-col gap-y-4 justify-center items-center w-[200px]">
            <Button className="w-full" onClick={connectCall}>
              Make a call
            </Button>

            <Button className="w-full" onClick={endCall}>
              End call
            </Button>
          </div>
        ) : null}

        <br />
      </div>

      <div className="flex flex-col">
        <Flex direction="column" gap="6" style={{ width: 500 }}>
          {step === 1 ? (
            <>
              <TextField.Input
                size="3"
                placeholder="Phone (+923xxxxxxxxx)"
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </>
          ) : step === 2 ? (
            <OtpInput
              value={otp}
              onChange={setOtp}
              inputType="number"
              containerStyle={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
              numInputs={4}
              renderSeparator={<span> - </span>}
              renderInput={(props) => (
                <input
                  {...props}
                  style={{
                    ...props.style,
                    height: 50,
                    width: 50,
                    padding: 3,
                    borderRadius: 5,
                    fontSize: 20,
                    border: "1px solid black",
                  }}
                />
              )}
            />
          ) : (
            <>
              <TextField.Input
                size="3"
                placeholder="Name"
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField.Input
                size="3"
                placeholder="Email"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </>
          )}
        </Flex>

        <div className="flex items-center gap-y-3 flex-col w-[500px]">
          <Text as="p" color="red">
            {error}
          </Text>

          <Button
            onClick={
              step === 1
                ? handleSendOTP
                : step === 2
                ? handleVerifyOTP
                : handleAddUser
            }
            className="w-full"
          >
            {step === 1 || step == 2 ? "Next" : "Register"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
