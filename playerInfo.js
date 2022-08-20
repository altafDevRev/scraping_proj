const request = require("request");
const cheerio = require("cheerio");
var fs = require("fs"),
  http = require("http"),
  https = require("https");

// var Stream = require("stream").Transform;

// var downloadImageFromURL = (url, filename, callback) => {
//   var client = http;
//   if (url.toString().indexOf("https") === 0) {
//     client = https;
//   }

//   client
//     .request(url, function (response) {
//       var data = new Stream();

//       response.on("data", function (chunk) {
//         data.push(chunk);
//       });

//       response.on("end", function () {
//         fs.writeFileSync(filename, data.read());
//       });
//     })
//     .end();
// };
// console.log("Before");
let count = 0;
function savePlayerName(playerName) {
  fs.appendFile("player_names.txt", playerName + "\n", (err) => {
    if (err) console.log(err);
    else {
      // console.log("File written successfully\n");
    }
  });
}
fs.readFile("names_links_final.txt", (err, data) => {
  if (err) throw err;
  stringVal = data.toString();
  brokenStrings = stringVal.split("\n");
  for (let i = 0; i < Math.min(brokenStrings.length, 300); i++) {
    // console.log(brokenStrings[i]);
    // request("https://www.espncricinfo.com/player/mayank-agarwal-398438", cb);
    request(brokenStrings[i], cb);
  }
});
console.log("after");
function cb(err, res, html) {
  if (err) {
    console.log("Error: ", err);
  } else {
    handleHtml(html);
    count += 1;
    // dataVal = html;
    // fs.appendFile("full_html.txt", dataVal, function (err) {
    //   if (err) throw err;
    //   console.log("Saved!");
    // });
  }
}
function handleHtml(html) {
  $ = cheerio.load(html);
  links = $(
    "div[style='position:relative;padding-bottom:100%;height:0;overflow:hidden']"
  ); //jquery get all hyperlinks of the players

  // console.log($(links).html());
  // console.log(links.find("img").attr("alt"));
  const fileName = "Folder/" + links.find("img").attr("alt") + ".txt";
  fs.writeFile(fileName, html, (err) => {
    if (err) console.log(err);
    else {
      console.log("File written successfully\n");
      savePlayerName(fileName)
    }
  });
}
// downloadImageFromURL(
//   "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_640,q_50/lsci/db/PICTURES/CMS/322600/322626.png",
//   "Folder/it.png"
// );
