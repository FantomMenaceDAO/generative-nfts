import * as nft from "./nft";
import { generateImage, generateJSONFromMetadata } from "./generator";

function main(): void {
  // get nft metadata required for generation
  let nfts = nft.getAll();

  for (let n of nfts) {
    // generate image file of nft
    generateImage(n);

    // generate json file of nft
    generateJSONFromMetadata(n);
  }
}

// run main
main();
