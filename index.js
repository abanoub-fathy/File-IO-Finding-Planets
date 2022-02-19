const fs = require("fs");
const { parse } = require("csv-parse");

const habitablePlanets = [];

const isValidForLife = (planet) => {
  return (
    planet["koi_disposition"] === "CONFIRMED" &&
    planet["koi_insol"] > 0.36 &&
    planet["koi_insol"] < 1.1 &&
    planet["koi_prad"] < 1.6
  );
};

fs.createReadStream("kepler_data.csv")
  .pipe(
    parse({
      comment: "#",
      columns: true,
    })
  )
  .on("data", (chunk) => {
    if (isValidForLife(chunk)) {
      habitablePlanets.push(chunk);
    }
  })
  .on("end", () => {
    console.log(`${habitablePlanets.length} habitable planets found!`);
  })
  .on("error", (error) => {
    console.log(error.message);
  });
