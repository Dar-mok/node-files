"use strict";
const fsP = require("fs/promises");
const cmnPath = process.argv[2];

async function cat(path) {
  try {
    const holder = await fsP.readFile(path, "utf8");
    console.log("holder is", holder);
  } catch {
    console.log("Path not found");
  }
}

cat(cmnPath);