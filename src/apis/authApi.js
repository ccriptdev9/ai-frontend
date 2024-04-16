import { BASE_URL } from "./config";

export async function fetchToken() {
  try {
    const userId = localStorage.getItem("cheetah-user-id") || "";

    const response = await fetch(`${BASE_URL}/calls/access-token/${userId}`);
    const data = await response.json();

    console.log("Data", data);

    if (!userId) {
      localStorage.setItem("cheetah-user-id", data.userId);
    }

    return data?.token;
  } catch (error) {
    console.log("Error getting twilio token", error);
  }
}
