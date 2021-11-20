import { NFT } from "./nft";
import { uploadDirectoryToIPFS, uploadJSONDirectoryToIPFS } from "./ipfs";

export interface NFTCollection {
  nfts: NFT[];
  imagesIpfsHash: string;
  metadataIpfsHash?: string;
}

export const generateCollectionFromNFTs = async (
  nfts: NFT[]
): Promise<NFTCollection> => {
  let imagesIpfsHash = await uploadDirectoryToIPFS(
    "dmall-test-images",
    "./output/images"
  );

  return {
    nfts: nfts,
    imagesIpfsHash: imagesIpfsHash,
  };
};

export const generateJSONFromCollection = async (
  collection: NFTCollection
): Promise<string> => {
  let metadataIpfsHash = await uploadJSONDirectoryToIPFS(
    "dmall-test-metadata",
    "./output/metadata"
  );

  return "complete";
};
