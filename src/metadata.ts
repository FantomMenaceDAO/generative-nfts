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

  let nft_attributes = new Map<string, Attribute>();

  const nfts_metadata: Metadata[] = [];

  // TODO: (july) fix this later to make it more extendable beyond just 2 arrays
  // hint: do it recursively, requires dynamic programming
  let array1 = attr_types[0];
  let array2 = attr_types[1];

  for (let i = 0; i < attr_types.length; i++) {
    for (let j = 0; j < array1.length; j++) {
      for (let k = 0; k < array2.length; k++) {
        nft_attributes.set(attr_types[0][j].attr_type, attr_types[0][j]);
        nft_attributes.set(attr_types[1][k].attr_type, attr_types[1][k]);

        let nft_metadata: Metadata = {
          id: counter,
          name: `${attr_types[0][j].name} at ${attr_types[1][k].name}`,
          description: "this is an nft",
          attributesMap: nft_attributes,
        };
        nfts_metadata.push(nft_metadata);
        counter++;
      }
    }
  }

  return nfts_metadata;
}
