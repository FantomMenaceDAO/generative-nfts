import * as nft from "./nft";
import { compositeImages } from "./image";
import { AttributeType } from "./attributes";

function main(): void {
  // get nfts and its metadata
  let nfts = nft.getAll();

  for (let i = 0; i < nfts.length; i++) {
    let a_nft = nfts[i];
    let path1 = a_nft.attributes[AttributeType.Figure].image;
    let path2 = a_nft.attributes[AttributeType.Background].image;
    let fileName = `${i + 1}`;
    compositeImages(path1, path2, fileName);
  }
}

// run
main();
