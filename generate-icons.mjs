import sharp from "sharp";
import { mkdirSync } from "fs";

mkdirSync("public/icons", { recursive: true });

const sizes = [72, 96, 128, 144, 152, 180, 192, 384, 512];

for (const size of sizes) {
  await sharp("public/Photo.jpg")
    .resize(size, size, { fit: "cover", position: "top" })
    .png()
    .toFile(`public/icons/icon-${size}x${size}.png`);
  console.log(`✓ icon-${size}x${size}.png`);
}

console.log("Done — icons in public/icons/");
