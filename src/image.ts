import * as sharp from "sharp";

export const compositeImages = async (
  topImg: string,
  bottomImg: string,
  fileName: string
) => {
  try {
    await sharp(bottomImg)
      .composite([{ input: topImg }])
      .sharpen()
      .toFile(`output/images/${fileName}.png`);
  } catch (error) {
    console.log(error);
  }
};
