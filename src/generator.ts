import * as sharp from "sharp";
import { NFT } from "./nft";
import { AttributeType } from "./attributes";
import { promises as fs } from "fs";

export const generateImage = async (nft: NFT) => {
  let path1 = nft.attributes[AttributeType.Figure].image;
  let path2 = nft.attributes[AttributeType.Background].image;
  let filename = `${nft.id}`;
  compositeImages(path1, path2, filename);
};

const compositeImages = async (
  topImg: string,
  bottomImg: string,
  filename: string
) => {
  try {
    await sharp(bottomImg)
      .composite([{ input: topImg }])
      .sharpen()
      .toFile(`output/images/${filename}.png`);
  } catch (error) {
    console.log(error);
  }
};

export const generateJSONFromMetadata = async (nft: NFT) => {
  try {
    const data = {
      name: nft.name,
      description: nft.description,
      image: nft.image,
      attributes: nft.attributes,
    };
    await fs.writeFile(
      `output/metadata/${nft.id}.json`,
      JSON.stringify(data, null, 4)
    );
  } catch (err) {
    console.error(err);
  }
};
