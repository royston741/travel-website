const getDate = (dateString) => {
  const date = new Date(dateString);

  const a = date.toLocaleDateString("en-US", { weekday: "short" });
  const b = date.toLocaleDateString("en-US", { day: "numeric" });
  const c = date.toLocaleDateString("en-US", { month: "long" });
  const d = date.toLocaleDateString("en-US", { year: "numeric" });

  const result = `${a} ${b} ${c} ${d}`;
  return result;
};

module.exports = getDate;
