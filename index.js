const fs = require("fs");
const { parse } = require("csv-parse");

const result = [];

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("error", (error) => {
    console.log(error.message);
  })
  .on("data", (chunk) => {
    result.push(chunk);
  })
  .on("end", () => {
    console.log(result);
  });
