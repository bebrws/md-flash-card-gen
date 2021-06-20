#!/usr/bin/env node

import rlsync from "readline-sync";
import chalk from "chalk";
import fs from "fs";

console.log(
  chalk.red.bold(
    "\n\nAll output from this session is written and appended to the local file flash-card-data.md\n\n"
  )
);
console.log("Made for use in a .md file in a Github Repo\n\n");

while (true) {
  let fcfront = rlsync.question(
    chalk.green.bold(
      'Question or flash card "front" - empty string will exit the program:'
    )
  );

  if (!fcfront) process.exit(0);

  let fcanswers = [];
  let fcanswer = "";
  do {
    fcanswer = rlsync.question(
      chalk.yellow.bold(
        "Answer item for back side of flash card? - emptry string will mean done"
      )
    );
    if (fcanswer) fcanswers.push(fcanswer);
  } while (fcanswer);

  const fcitems = fcanswers.reduce((acc, cur) => {
    return (acc += `<li>${cur}</li>\n        `);
  }, "");

  const output = `
  ### ${fcfront}

  <details>
    <summary>Click here for the solution</summary>
      <ul>
        ${fcitems}
      </ul>
  </details>
  `;

  await fs.writeFileSync("flash-card-data.md", output, { flag: "a+" });
}
