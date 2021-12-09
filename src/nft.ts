import * as sharp from "sharp";
import { Metadata } from "./metadata";
import { Attributes } from "./attributes";
import * as fs from "fs";
import { NFTCollection } from "./interfaces/collection";

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
  let attributes: Attributes = metadata.attributes;
  let filepath = await compositeImages(
    attributes.map((attribute) => attribute.image),
    `${metadata.id}`
  );
  return filepath;
};

const compositeImages = async (
  images: string[],
  filename: string
): Promise<string> => {
  return compositeTwoImages(images[0], images[1], filename);
};

const compositeTwoImages = async (
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
      // make sure to take out the local images path before writing to json
      // this json file will eventually get uploaded to ipfs
      nft.metadata.attributes = nft.metadata.attributes.map((attribute) => {
        delete attribute.image;
        return attribute;
      });
      const data = {
        name: nft.metadata.name,
        description: nft.metadata.description,
        image: `https://gateway.pinata.cloud/ipfs/${nftCollection.imagesIpfsHash}/${nft.metadata.id}.png`,
        attributes: nft.metadata.attributes,
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
