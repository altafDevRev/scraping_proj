const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
console.log("asdfas");
request("https://www.espncricinfo.com/player", cb);
console.log("after");
function cb(err, res, html) {
  if (err) {
    console.log("Error: ", err);
  } else {
    // console.log("HTML: ", html);
    handleHtml(html);
  }
}
function handleHtml(html) {
  $ = cheerio.load(html);
  links = $("a[class='ds-flex']"); //jquery get all hyperlinks
  $(links).each(function (i, link) {
    dataVal = "https://www.espncricinfo.com" + $(link).attr("href") + "\n";
    console.log(dataVal);
    fs.appendFile("names_links.txt", dataVal, function (err) {
      if (err) throw err;
      console.log("Saved!");
    });
  });
  //   let h1s = selTool("div[class='ds-grid lg:ds-grid-cols-2']");
  //   console.log(h1s.length);
  //   for (let i = 0; i < h1s.length; i++) {
  //     let dat = selTool(h1s[i]);
  //     let val = dat("a[class=ds-flex]").html();
  //     console.log(val);
  //   }
}
