"use strict";
const fsP = require("fs/promises");
const cmnPath = process.argv[2];
const axios = require("axios");

async function cat(path) {
  try {
    const holder = await fsP.readFile(path, "utf8");
    console.log("holder is", holder);
  } catch {
    console.log("Path not found");
  }
}

async function webCat(URL) {
  const result = await axios.get(URL);
  console.log("rsult is", result);
}

function runUrlOrTxt(input) {
  try {
    if (new URL(input)) {
      webCat(input);
    } else {
      cat(input);
    }
  } catch (error) {
    console.log("ERROR", error);
  }
}

runUrlOrTxt(cmnPath);