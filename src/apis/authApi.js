import { BASE_URL } from "./config";

export async function fetchToken() {
  try {
    const response = await fetch(`${BASE_URL}/auth/token`);
    const data = await response.json();
    return data?.token;
  } catch (error) {
    console.log("Error getting twilio token", error);
  }
}
