const dateFormat = (
  date,
  format = "yyyy-mm-dd",
  options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }
) => {
  let d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  if (format === "yyyy-mm-dd") return [year, month, day].join("-");
  if (format === "dd-mm-yyyy") return [day, month, year].join("-");
  if (format === "toLocaleDateString")
    return d.toLocaleDateString("en-US", options);
  else throw new Error("The format couldn't be recognized");
};

export default dateFormat;
