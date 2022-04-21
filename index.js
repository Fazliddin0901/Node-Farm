// const fs = require("fs");

// // Block code -> Sync coding
// // const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
// // console.log(textIn);

// // const textOut = `This file overwrite: ${textIn}`;

// // fs.writeFileSync("./txt/output.txt", textOut);
// // console.log("Write file");

// // Non-blocking code -> Async coding
// fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
//   console.log(data);
// });
// console.log("Read file");

// const fs = require("fs");

// const inputTxt = fs.readFileSync("./txt/input.txt", "utf-8");
// console.log(inputTxt);

// const outputTxt = `Salom,Qalay: ${inputTxt}`;

// fs.writeFileSync("./txt/output.txt", outputTxt);
// console.log("yozib boldim");

// fs.writeFile("output.txt", "Salom", "utf-8", function (err) {
//   if (err) throw new Error("Xato");
//   console.log("Filega malumot yozildi");
// });

// dbivdfbhvdiughviorgviaeuorhdgvbailerohvergblireuvhgeryvugrruvgohboethberhvreuivjorusgveirjvheruibovjeorbsvdunojvneworgjlvsodnilnfoeirvnsdivhwerpogirelhngvoeurhdfjlshvoaeurighlieruksyuerghlejksdhfvguyelrgvyier

// const server = http.createServer((req, res) => {
//   const urlcha = req.url;

//   if (urlcha === "/about") {
//     res.writeHead(200, {
//       "content-type": "text/json",
//       "mewning-headerem": "gjvgfcg",
//     });
//     res.end(data);
//   } else {
//     res.writeHead(404, {
//       myHead: "tamom",
//     });
//   }

// else if (urlcha === "/home") {
//   res.writeHead(200, {
//     "content-type": "text/html",
//     "mewning-headerem": "gjvgfcg",
//   });
//   res.end(home);
// } else if (urlcha === "/api") {
//   res.writeHead(200, {
//     "content-type": "text/html",
//     "mewning-headerem": "gjvgfcg",
//   });
//   res.end(data);
// }

// });

const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
const replaceFunc = require("./modules/ReplaceFunctions.js");

const slug = slugify("salom buvottimi ", "_");
console.log(slug);
const about = fs.readFileSync("./html/about.html", "utf-8");
const home = fs.readFileSync("./html/home.html", "utf-8");

let overview = fs.readFileSync("./templates/overview.html", "utf-8");
let card = fs.readFileSync("./templates/card.html", "utf-8");
let product = fs.readFileSync("./templates/product.html", "utf-8");
const data = fs.readFileSync("./dev-data/data.json", "utf-8");
const dataObj = JSON.parse(data);

const server = http.createServer((req, res) => {
  const changesCards = dataObj
    .map((val) => {
      return replaceFunc(card, val);
    })
    .join("");

  // console.log(changesCards);

  let output = overview.replace("{CardProduct}", changesCards);

  let urlcha = req.url;
  let query = +url.parse(urlcha, true).query.id;
  console.log(url.parse(urlcha, true));

  if (urlcha === "/overview" || urlcha == "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(output);
  } else if (urlcha == `/product?id=${query}`) {
    let obj = dataObj.find((val) => val.id === query);
    req.url = slugify(obj.productName);

    let productHTML = replaceFunc(product, obj);

    res.writeHead(200, {
      "content-type": "text/html",
    });
    res.end(productHTML);
  } else {
    res.writeHead(404, { "content-type": "text/html" });
    res.end("<h1 style='color:red;'>Page not found</h1> ");
  }
});

server.listen("2000", "127.0.0.1");
