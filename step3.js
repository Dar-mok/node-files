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
  } catch (err) {
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
 *  on command line input, or, if input === "--out", call copyInto
 */
async function runUrlOrTxt(input) {
  if (input !== "--out") {
    if (input.startsWith('http')) {
      webCat(input);
    } else {
      cat(input);
    }
  } else {
    copyInto();
  }
}

/** Checks if argument after write-into file is a url, if so, make ajax request
 *  and write result into new file, else, if its a readable file, write content
 *  into new file, else, throw error */
async function copyInto() {
  const writeInto = process.argv[3];
  //decompose
  try {
    if (process.argv[4].startsWith('http')) {
      const urlResult = await axios.get(`${process.argv[4]}`);
      fsP.writeFile(writeInto, urlResult.data, "utf8");
    } else {
      const resp = await fsP.readFile(process.argv[4], "utf8");
      fsP.writeFile(writeInto, resp, "utf8");
    }
  } catch (err) {
    console.log("wasnt able to read/write file");
  }
}

runUrlOrTxt(cmnPath);