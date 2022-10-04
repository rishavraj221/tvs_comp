import axios from "axios";

import config from "../config.json";

export const getToken = async (role, username, password) => {
  try {
    const result = await axios.post(config.SERVER_URL + "/give-token", {
      role,
      username,
      password,
    });
    if (result.status === 200) return result.data;
  } catch (ex) {
    alert(ex.message);
  }
};
