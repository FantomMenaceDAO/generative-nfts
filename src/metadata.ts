import {
  Attributes,
  AttributeType,
  Attribute,
  AttributeFactory as AF,
} from "./attributes";

export interface Metadata {
  id: number;
  name: string;
  description: string;
  image?: string;
  attributesMap: Map<string, Attribute>;
}

const BASE_NAME = "darth malls";

export function generateMetadata(): Metadata[] {
  // get all attribute types
  let attr_types: Attributes[] = [
    AF.createAttributes(AttributeType.Figure),
    AF.createAttributes(AttributeType.Background),
  ];

  let counter = 1;

  const nfts_metadata: Metadata[] = [];

  // TODO: (july) fix this later to make it more extendable beyond just 2 arrays
  // hint: do it recursively, requires dynamic programming
  let figures = attr_types[0];
  let backgrounds = attr_types[1];

  for (let j = 0; j < figures.length; j++) {
    for (let k = 0; k < backgrounds.length; k++) {
      const nft_attributes = new Map<string, Attribute>();
      nft_attributes.set(figures[j].attr_type, figures[j]);
      nft_attributes.set(backgrounds[k].attr_type, backgrounds[k]);

      const nft_metadata: Metadata = {
        id: counter,
        name: `${figures[j].name} at ${backgrounds[k].name}`,
        description: "this is an nft",
        attributesMap: nft_attributes,
      };
      nfts_metadata.push(nft_metadata);
      counter++;
    }
  }

  return nfts_metadata;
}
