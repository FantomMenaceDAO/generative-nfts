import {
  Attributes,
  AttributeType,
  Attribute,
  AttributeFactory as AF,
} from "./attributes";

type TraitType = string;
export interface NFT {
  id: number;
  name: string;
  description: string;
  image: string;
  attributes: Record<TraitType, Attribute>;
}

const BASE_NAME = "darth malls";

export interface NFTs extends Array<NFT> {}

export function getAll(): NFTs {
  // get all attribute types
  let figures: Attributes = AF.createAttributes(AttributeType.Figure);
  let backgrounds: Attributes = AF.createAttributes(AttributeType.Background);

  const nfts: NFTs = [];
  let counter = 1;
  // go through each background and add each figure
  for (let i = 0; i < 20; i++) {
    let bg: Attribute = backgrounds[i];
    for (let j = 0; j < 20; j++) {
      let figure: Attribute = figures[j];
      let nft = {
        id: counter,
        name: `${figure.name} at the ${bg.name}`,
        description: "this is an nft",
        image: "string",
        attributes: {
          [AttributeType.Background]: backgrounds[i],
          [AttributeType.Figure]: figures[j],
        },
      };
      console.log(`\n`);
      console.log(`created nft id: ${counter}`);
      console.log(nft);

      // add to nfts vector
      nfts.push(nft);

      // increment conuter
      counter++;
    }
  }

  return nfts;
}
