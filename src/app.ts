import { generateMetadata } from "./metadata";
import { generateJSONFromMetadata, generateNFTsFromMetadata } from "./nft";
import { generateJSONFromCollection, NFTCollection } from "./collection";
import { uploadDirectoryToIPFS, uploadJSONDirectoryToIPFS } from "./ipfs";
import * as dotenv from "dotenv";
import * as constants from "./constants";

async function main(): Promise<void> {
  dotenv.config({ path: __dirname + "/.env" });

  // get nft metadata required for generation
  let metadata = generateMetadata();

  // generates images to fs and returns NFT objects
  let nfts = await generateNFTsFromMetadata(metadata);

  // upload images to IPFS and get root hash for images
  let imagesIpfsHash: string = await uploadDirectoryToIPFS(
    constants.IPFS_NFT_IMAGES_NAME,
    constants.LOCAL_NFT_IMAGES_PATH
  );

  // setup nft collection
  let nftCollection: NFTCollection = {
    nfts: nfts,
    imagesIpfsHash: imagesIpfsHash,
  };

  // generate json file of nft to fs
  generateJSONFromMetadata(nftCollection);

  // upload JSON Metadata to IPFS from fs
  uploadJSONDirectoryToIPFS(
    constants.IPFS_NFT_METADATA_NAME,
    constants.LOCAL_NFT_METADATA_PATH
  );
}

// run main
main();
