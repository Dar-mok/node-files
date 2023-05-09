"use strict";
const fsP = require("fs/promises");
const cmnPath = process.argv[2];
const axios = require("axios");


/** takes in input and reads file if valid path,
 *  else returns error message
 */
async function cat(path) {
  try {
    const holder = await fsP.readFile(path, "utf8");
    console.log("holder is", holder);
  } catch {
    console.log("Path not found");
  }
}

/** takes in url and shows content if valid url,
 *  else returns error message
 */
async function webCat(URL) {
  try {
    const result = await axios.get(URL);
    console.log("result", result.status);
    // console.log("result is", result);
  } catch (error) {
    console.log("Error: Request failed with status code 404");
  }
}

/** conductor function that calls either cat or webCat depending
 *  on command line input.
 */
function runUrlOrTxt(input) {
  if (input.startsWith('http')) {
    webCat(input);
  } else {
    cat(input);
  }
}


runUrlOrTxt(cmnPath);