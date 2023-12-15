import { BASE_URL } from "./config";

export async function fetchToken() {
  try {
    const userId = localStorage.getItem("cheetah-user-id") || "";

    const response = await fetch(`${BASE_URL}/auth/token/${userId}`);
    const data = await response.json();

    if (!userId) {
      localStorage.setItem("cheetah-user-id", data.userId);
    }

    return data?.token;
  } catch (error) {
    console.log("Error getting twilio token", error);
  }
}

export async function sendOTP(phone) {
  try {
    const response = await fetch(`${BASE_URL}/auth/verification/${phone}`);
    const data = await response.json();

    console.log("sendOTP response", data);

    return data;
  } catch (error) {
    console.log("Error sending OTP", error);
  }
}

export async function verifyOTP(code, phone) {
  console.log("code-----", code, phone);

  try {
    const response = await fetch(`${BASE_URL}/auth/verification-check`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code, phoneNumber: phone }),
    });

    const data = await response.json();
    console.log("verifyOTP response", data);

    return data;
  } catch (error) {
    console.log("Error sending OTP", error);
  }
}
