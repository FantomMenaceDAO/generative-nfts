import * as sharp from "sharp";
import { Metadata } from "./metadata";
import { Attributes } from "./attributes";
import * as fs from "fs";
import { NFTCollection } from "./interfaces/collection";
import { getSpecialNFTsMetadata } from "./constants";

enum NFTType {
  Normal,
  Special,
}

export interface NFT {
  id?: number;
  name?: string;
  outputImagePath?: string;
  metadata: Metadata;
  nftType: NFTType;
}
export interface NFTs extends Array<NFT> {}

export const generateNFTs = async (
  metadata_array: Metadata[]
): Promise<NFTs> => {
  let nfts: NFTs = [];
  let counter = 1;

  for (let metadata of metadata_array) {
    let nft: NFT = {
      metadata: metadata,
      nftType: NFTType.Normal,
    };
    nfts.push(nft);
  }

  let specials = getSpecialNFTsMetadata();
  for (let special of specials) {
    let nft: NFT = {
      metadata: special,
      nftType: NFTType.Special,
    };
    nfts.push(nft);
  }

  // then we need to shuffle the nfts
  const shuffled_nfts = nfts
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);

  // give them a name and give them an id
  for (let nft of shuffled_nfts) {
    nft.id = counter;
    nft.name = `Darth Malls #${counter}`;
    if (nft.nftType === NFTType.Special) {
      nft.outputImagePath = await saveImageFromNFT(nft);
    } else {
      nft.outputImagePath = await generateImageFromNFT(nft);
    }
    counter++;
  }

  return nfts;
};

const generateImageFromNFT = async (nft: NFT) => {
  let attributes: Attributes = nft.metadata.attributes;
  let filepath = await compositeImages(
    attributes.map((attribute) => attribute.image),
    `${nft.id}`
  );
  return filepath;
};

const compositeImages = async (
  images: string[],
  filename: string
): Promise<string> => {
  return compositeTwoImages(images[0], images[1], filename);
};

const saveImageFromNFT = async (nft: NFT): Promise<string> => {
  try {
    let filepath = `output/images/${nft.id}.png`;
    await sharp(nft.metadata.image).sharpen().toFile(filepath);
    return filepath;
  } catch (error) {
    console.log(error);
  }
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
      let filepath = `output/metadata/${nft.id}.json`;
      // make sure to take out the local images path before writing to json
      // this json file will eventually get uploaded to ipfs
      nft.metadata.attributes = nft.metadata.attributes.map((attribute) => {
        delete attribute.image;
        return attribute;
      });
      const data = {
        name: nft.name,
        description: nft.metadata.description,
        image: `https://gateway.pinata.cloud/ipfs/${nftCollection.imagesIpfsHash}/${nft.id}.png`,
        attributes: nft.metadata.attributes,
      };

      fs.writeFileSync(
        `output/metadata/${nft.id}.json`,
        JSON.stringify(data, null, 4)
      );
    }
  } catch (err) {
    console.error(err);
  }
};
