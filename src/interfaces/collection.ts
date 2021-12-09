import { NFT } from "../nft";

export interface NFTCollection {
  nfts: NFT[];
  imagesIpfsHash: string;
  metadataIpfsHash?: string;
}
