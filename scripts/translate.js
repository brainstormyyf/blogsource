#!/usr/bin/node
const fs = require("fs");
const { glob } = require("glob");
const OpenCC = require("opencc");
const converter = new OpenCC("s2t.json"); // Translate configuration.
const zhHansCode = "zh-ch"; // Simplified Chinese language code.
const zhHantCode = "zh-hant"; // Traditional Chinese language code.

(async () => {
  // find all files need to be translated.
  const files = await glob(`**/*.${zhHansCode}.*`, {
    nodir: true,
  });
  for (file of files) {
    let dest = file.replace(`.${zhHansCode}.`, `.${zhHantCode}.`);
    fs.readFile(file, (err, buf) => {
      if (err) {
        console.log(err);
      }
      let data = buf.toString().replace(/(?<![.`])zh-ch/gm, zhHantCode);

      converter
        .convertPromise(data)
        .then((converted) => {
          // save translation.
          fs.writeFile(dest, converted, (err) => {
            if (err) {
              console.log(err);
            }
          });
        })
        .catch((e) => {
          console.log(e);
        });
    });
  }
})();
