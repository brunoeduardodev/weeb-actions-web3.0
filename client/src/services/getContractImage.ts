import axios from "axios";
import { validActions } from "../utils/constants";

export const getTransactionImage = async (action: string) => {
  try {
    if (!validActions.includes(action)) {
      action = "kick";
    }
    const { data } = await axios.get(`https://api.waifu.pics/sfw/${action}`, {
      timeout: 5000,
    });
    return data.url;
  } catch (error) {
    console.log(error);
    return "https://i.waifu.pics/O8qm8aU.gif";
  }
};
