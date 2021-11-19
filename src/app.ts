import * as nft from "./nft";
import { generateMetadata } from "./metadata";
import { uploadNFTsToIPFS } from "./ipfs";
import * as dotenv from "dotenv";
import { resolve } from "path";

async function main(): Promise<void> {
  dotenv.config({ path: __dirname + "/.env" });

  // get nft metadata required for generation
  let metadata = generateMetadata();

  let nfts = await nft.generateNFTsFromMetadata(metadata);

  // upload to IPFS
  uploadNFTsToIPFS(nfts);

  // generate json file of nft
  // for (let n of nfts) {
  //   generateJSONFromMetadata(n);
  // }
}

// run main
main();
