const fs = require('fs');

let data = {artifactUri : "ipfs://QmdbtRSTnq6bWF9B2QxLGWRogiVWKi5yJexSYur38kyey3",
  attributes: [{"name": "status","value": "hidden"}],
  creators: ["kaloh", "multivac", "datzel", "tlalocman", "jupiter"],
  decimals: 0,
  description: "We are the robots!",
  displayUri: "ipfs://QmdbtRSTnq6bWF9B2QxLGWRogiVWKi5yJexSYur38kyey3",
  formats: [{mimeType: "image/jpeg",uri: "ipfs://QmdbtRSTnq6bWF9B2QxLGWRogiVWKi5yJexSYur38kyey3"}],
  name: "Unibot #0",
  rights: "© 2021 Unibotz. All rights reserved",
  royalties: {decimals: 2,shares: {tz1WbaFu1621EAx9bq5qv22RKUG1RAQqusSL: 4}},
  symbol: "UBTZ",
  thumbnailUri: "ipfs://QmdbtRSTnq6bWF9B2QxLGWRogiVWKi5yJexSYur38kyey3"};

for (let i = 0; i < 10; i++) {
  filename  = `media/placeholders/Unibot#${i}-placeholder.json`
  data.name = `Unibot #${i}`

  fs.writeFile(filename, JSON.stringify(data), (err) => {
  if (err)
    console.log(err);
  else {
    console.log("File written successfully\n");
    console.log("The written has the following contents:\n");
    console.log(fs.readFileSync(filename, "utf8"));
  }
  });

}
