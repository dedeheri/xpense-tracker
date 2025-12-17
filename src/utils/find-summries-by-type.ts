const findSummaryByType = (summaries, typeTitle) => {
  return summaries.find(({ type }) => type.includes(typeTitle));
};

export default findSummaryByType;
