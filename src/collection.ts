import { NFT } from "./nft";
import { uploadJSONDirectoryToIPFS } from "./ipfs";
export interface NFTCollection {
  nfts: NFT[];
  imagesIpfsHash: string;
  metadataIpfsHash?: string;
}
