import axios from "../base_axios.js";

const getConversation = (conversationID) => {
  if (conversationID === undefined || conversationID === null) {
    return axios.get(`/conversation`);
  }
  return axios.get(`/conversation/${conversationID}`);
};

export { getConversation };
