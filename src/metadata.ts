import { Attributes, Attribute, AttributeFactory as AF } from "./attributes";
import { TraitType } from "./constants";

export interface Metadata {
  description: string;
  image?: string;
  attributes: Attributes;
}

export function generateMetadata(): Metadata[] {
  // get all attribute types
  let trait_types: Attributes[] = [
    AF.createAttributes(TraitType.Figure),
    AF.createAttributes(TraitType.Background),
  ];

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

      const nft_metadata = MetadataFactory.create({
        description: `${figures[j].value} at ${backgrounds[k].value}`,
        attributes: nft_attributes,
      });

      nfts_metadata.push(nft_metadata);
    }
  }

  return nfts_metadata;
}

export class MetadataFactory {
  static create(meta: Metadata): Metadata {
    return {
      image: meta.image,
      description: meta.description,
      attributes: meta.attributes,
    };
  }
}
