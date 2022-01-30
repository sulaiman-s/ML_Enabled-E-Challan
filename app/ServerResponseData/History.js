let history = [];
let userHistory = [];

const get_historyItems = () => {
  if (!history) return null;
  return history;
};

export const setHistory = (items) => {
  if (!items) return;
  history.push(items);
};

export const get_userHistory = () => {
  if (!userHistory) return null;
  return userHistory;
};

export const setUserHistory = (v) => {
  if (!v) return null;
  userHistory.push(v);
};

export default get_historyItems;
