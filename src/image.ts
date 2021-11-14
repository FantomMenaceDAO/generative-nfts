import * as sharp from "sharp";

export const compositeImages = async (
  topImg: string,
  bottomImg: string,
  fileName: string
) => {
  try {
    console.log(topImg);
    console.log(bottomImg);
    await sharp(bottomImg)
      .composite([{ input: topImg }])
      .sharpen()
      .toFile(`output/${fileName}.png`);
  } catch (error) {
    console.log(error);
  }
};
