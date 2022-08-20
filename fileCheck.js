// fs.readFile("names_links_final.txt", (err, data) => {
//   if (err) throw err;
//   stringVal = data.toString();
//   brokenStrings = stringVal.split("\n");
//   console.log(brokenStrings[0]);
// });
var fs = require("fs"),
  http = require("http"),
  https = require("https");

var Stream = require("stream").Transform;

var downloadImageFromURL = (url, filename, callback) => {
  var client = http;
  if (url.toString().indexOf("https") === 0) {
    client = https;
  }

  client
    .request(url, function (response) {
      var data = new Stream();

      response.on("data", function (chunk) {
        data.push(chunk);
      });

      response.on("end", function () {
        fs.writeFileSync(filename, data.read());
      });
    })
    .end();
};
function saveImage(fileName, playerName) {
  fs.readFile(fileName, (err, data) => {
    if (err) throw err;
    stringVal = data.toString();
    let position = stringVal.search("headshotImage");
    let substr = stringVal.substring(position + 30, position + 180);
    let pos2 = substr.search("/db");
    let finalURL =
      "https://img1.hscicdn.com/image/upload/f_auto,t_ds_square_w_320/lsci" +
      substr.substring(pos2, pos2 + 34);
    // console.log(finalURL);
    downloadImageFromURL(finalURL, playerName);
  });
}

// saveImage("full_html.txt", "image/Mayank Agarwal.png");

fs.readFile("player_names.txt", (err, data) => {
  if (err) throw err;
  stringVal = data.toString();
  brokenStrings = stringVal.split("\n");
  for (let i = 0; i < Math.min(brokenStrings.length, 300); i++) {
    // console.log(brokenStrings[i]);
    let fileNam = brokenStrings[i].split("/")[1]
    let playerName = "image/"+fileNam.split('.')[0]+".png"
    // console.log(playerName)
    saveImage(brokenStrings[i], playerName)
  }
});
