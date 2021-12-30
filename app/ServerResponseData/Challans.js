let challans;
const get_challans = () => {
  if (!challans) return;
  return challans;
};

export const set_challans = (resChallan) => {
  if (!resChallan) return;
  challans = resChallan;
};

export default get_challans;
