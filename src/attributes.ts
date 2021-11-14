export interface Distribution {
  name?: string;
  path?: string;
  total_number?: number;
}

export interface Distributions extends Array<Distribution> {}

export enum AttributeType {
  Background,
  Figure,
}

export interface Attribute {
  name?: string;
  value?: string;
  image?: string;
  attr_type: AttributeType;
}

export interface Attributes extends Array<Attribute> {}

export class AttributeFactory {
  static create(attr: Attribute): Attribute {
    return {
      name: attr.name,
      value: attr.value,
      image: attr.image,
      attr_type: attr.attr_type,
    };
  }

  static createAttributes(attr_type: AttributeType): Attributes {
    const attributes: Attribute[] = [];

    // get all distributions first
    let dists = getDistFromAttrType(attr_type);

    // then iterate through them and create the attribute
    for (let dist of dists) {
      for (let i = 0; i < dist.total_number; i++) {
        let attribute = AttributeFactory.create({
          name: `${dist.name}-${i + 1}`,
          image: `${dist.path}/${i + 1}.png`,
          value: `${dist.name}`,
          attr_type: attr_type,
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
}

function getDistFromAttrType(attr_type: AttributeType): Distributions {
  switch (attr_type) {
    case AttributeType.Background:
      return getBackgrounds();
    case AttributeType.Figure:
      return getFigures();
  }
}

function getBackgrounds(): Distributions {
  return [{ name: "bg", path: "./input/bg/malls", total_number: 20 }];
}

function getFigures(): Distributions {
  return [
    { name: "lightsaber", path: "./input/figure/lightsaber", total_number: 4 },
    { name: "sithlord`", path: "./input/figure/sithlord", total_number: 4 },
    { name: "blaster", path: "./input/figure/blaster", total_number: 5 },
    { name: "villan", path: "./input/figure/villan", total_number: 7 }, // should be 9
  ];
}
