import { generateMetadata } from "./metadata";
import { generateJSONFromMetadata, generateNFTsFromMetadata } from "./nft";
import {
  generateCollectionFromNFTs,
  generateJSONFromCollection,
} from "./collection";
import * as dotenv from "dotenv";
import { resolve } from "path";

async function main(): Promise<void> {
  dotenv.config({ path: __dirname + "/.env" });

  // get nft metadata required for generation
  let metadata = generateMetadata();

  // generates images and returns NFT objects
  let nfts = await generateNFTsFromMetadata(metadata);

  // upload to IPFS
  let nftCollection = await generateCollectionFromNFTs(nfts);

  // generate json file of nft
  generateJSONFromMetadata(nftCollection);
  // generateJSONFromCollection(nftCollection);
}

// run main
main();
