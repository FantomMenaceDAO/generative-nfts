import * as sharp from "sharp";
import { Metadata } from "./metadata";
import { Attribute, AttributeType } from "./attributes";

export interface NFT {
  localImagePath: string;
  metadata: Metadata;
}
export interface NFTs extends Array<NFT> {}

export const generateNFTsFromMetadata = async (
  metadata_array: Metadata[]
): Promise<NFTs> => {
  let nfts: NFTs = [];
  for (let metadata of metadata_array) {
    let image_path = await generateImageFromMetadata(metadata);
    let nft = {
      localImagePath: image_path,
      metadata: metadata,
    };
    nfts.push(nft);
  }
  return nfts;
};

const generateImageFromMetadata = async (metadata: Metadata) => {
  let attrsMap: Map<string, Attribute> = metadata.attributesMap;
  let filepath = await compositeImages(
    attrsMap.get(AttributeType.Background).image,
    attrsMap.get(AttributeType.Figure).image,
    `${metadata.id}`
  );
  console.log(filepath);
  return filepath;
};

const compositeImages = async (
  topImg: string,
  bottomImg: string,
  filename: string
): Promise<string> => {
  try {
    let filepath = `output/images/${filename}.png`;
    await sharp(bottomImg)
      .composite([{ input: topImg }])
      .sharpen()
      .toFile(filepath);
    return filepath;
  } catch (error) {
    console.log(error);
  }
};

export const generateJSONFromNFTs = async (nft: NFTs) => {
  // try {
  //   const data = {
  //     name: nft.name,
  //     description: nft.description,
  //     image: nft.image,
  //     attributes: nft.attributes,
  //   };
  //   await fs.writeFile(
  //     `output/metadata/${nft.id}.json`,
  //     JSON.stringify(data, null, 4)
  //   );
  // } catch (err) {
  //   console.error(err);
  // }
};
