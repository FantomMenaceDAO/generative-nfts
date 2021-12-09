import {
  Attributes,
  TraitType,
  Attribute,
  AttributeFactory as AF,
} from "./attributes";

export interface Metadata {
  id: number;
  name: string;
  description: string;
  image?: string;
  attributes: Attributes;
}

const BASE_NAME = "darth malls";

export function generateMetadata(): Metadata[] {
  // get all attribute types
  let trait_types: Attributes[] = [
    AF.createAttributes(TraitType.Figure),
    AF.createAttributes(TraitType.Background),
  ];

  let counter = 1;

  const nfts_metadata: Metadata[] = [];

  // TODO: (july) fix this later to make it more extendable beyond just 2 arrays
  // hint: do it recursively, requires dynamic programming
  let figures = trait_types[0];
  let backgrounds = trait_types[1];

  for (let j = 0; j < figures.length; j++) {
    for (let k = 0; k < backgrounds.length; k++) {
      const nft_attributes = [];
      nft_attributes.push(figures[j]);
      nft_attributes.push(backgrounds[k]);

      const nft_metadata: Metadata = {
        id: counter,
        name: `${figures[j].value} at ${backgrounds[k].value}`,
        description: "this is an nft",
        attributes: nft_attributes,
      };
      nfts_metadata.push(nft_metadata);
      counter++;
    }
  }

  return nfts_metadata;
}
