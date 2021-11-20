import * as sharp from "sharp";
import { Metadata } from "./metadata";
import { Attribute, AttributeType } from "./attributes";
import * as fs from "fs";
import { NFTCollection } from "./collection";

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
    attrsMap.get(AttributeType.Figure).image,
    attrsMap.get(AttributeType.Background).image,
    `${metadata.id}`
  );
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

export const generateJSONFromMetadata = async (
  nftCollection: NFTCollection
) => {
  try {
    for (let nft of nftCollection.nfts) {
      let filepath = `output/metadata/${nft.metadata.id}.json`;
      const data = {
        name: nft.metadata.name,
        description: nft.metadata.description,
        image: `https://gateway.pinata.cloud/ipfs/${nftCollection.imagesIpfsHash}/${nft.metadata.id}.png`,
        attributes: nft.metadata.attributesMap,
      };

      fs.writeFileSync(
        `output/metadata/${nft.metadata.id}.json`,
        JSON.stringify(data, null, 4)
      );
    }
  } catch (err) {
    console.error(err);
  }
};
