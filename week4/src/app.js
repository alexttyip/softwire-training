import sharp from "sharp";

const [, , path] = process.argv;

const size = 250;
const roundedCorners = Buffer.from(
  `<svg><circle cx="${size}" cy="${size}" r="${size}"/></svg>`
);

sharp(path)
  .resize(1000, 1000)
  .composite([
    {
      input: roundedCorners,
      blend: "dest-in",
    },
  ])
  .png()
  .toFile("/Users/alex.yip/Desktop/def.png")
  .then((obj) => {
    console.log({ msg: "all good", obj });
  })
  .catch((err) => {
    console.log({ err });
  });
