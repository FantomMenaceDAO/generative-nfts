import { TraitType } from "./constants";
import * as c from "./constants";
import { Distributions } from "./interfaces/distributions";
import { Metadata } from "./metadata";

export interface Attribute {
  value?: string;
  image?: string;
  trait_type: TraitType;
}

export interface Attributes extends Array<Attribute> {}

export class AttributeFactory {
  static create(attr: Attribute): Attribute {
    return {
      value: attr.value,
      image: attr.image,
      trait_type: attr.trait_type,
    };
  }

  static createAttributes(trait_type: TraitType): Attributes {
    const attributes: Attributes = [];

    // get all distributions first
    let dists = getDistFromAttrType(trait_type);

    // then iterate through them and create the attribute
    for (let dist of dists) {
      for (let i = 0; i < dist.total_number; i++) {
        let attribute = AttributeFactory.create({
          value: `${dist.name}`,
          image: `${dist.path}/${i + 1}.png`,
          trait_type: trait_type,
        });
        attributes.push(attribute);
      }
    }

    // return shuffled attributes
    return attributes
      .map((v) => ({ v, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ v }) => v);
  }

  static getSpecialNFTsAttributes(metadata: Attributes): Attributes {
    let attributes: Attributes = [];
    for (let meta of metadata) {
      let attribute = AttributeFactory.create({
        value: meta.value,
        image: meta.image,
        trait_type: meta.trait_type,
      });
      attributes.push(attribute);
    }
    return attributes;
  }
}

function getDistFromAttrType(trait_type: TraitType): Distributions {
  switch (trait_type) {
    case TraitType.Background:
      return c.getBackgrounds();
    case TraitType.Figure:
      return c.getFigures();
  }
}
