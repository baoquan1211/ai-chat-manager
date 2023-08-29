import axios from "../base_axios.js";

const getConversation = (conversationID, accessToken) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  if (conversationID === undefined || conversationID === null) {
    return axios.get(`/v1/conversation/`);
  }
  return axios.get(`/v1/conversation/${conversationID}/`);
};

const updateConversation = (conversationID, conversationName, accessToken) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  return axios.patch(
    `/v1/conversation/${conversationID}/?name=${conversationName}`
  );
};

const deleteConversation = (conversationID, accessToken) => {
  axios.defaults.headers.common["Authorization"] = "Bearer " + accessToken;
  return axios.delete(`/v1/conversation/${conversationID}/`);
};

export { getConversation, updateConversation, deleteConversation };
