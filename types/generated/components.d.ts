import type { Schema, Struct } from '@strapi/strapi';

export interface SharedCarouselText extends Struct.ComponentSchema {
  collectionName: 'components_shared_carousel_texts';
  info: {
    displayName: 'carousel_text';
  };
  attributes: {
    text: Schema.Attribute.String;
  };
}

export interface SharedFeature extends Struct.ComponentSchema {
  collectionName: 'components_shared_features';
  info: {
    displayName: 'Feature';
  };
  attributes: {
    description: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface SharedHero extends Struct.ComponentSchema {
  collectionName: 'components_shared_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    carousel_text: Schema.Attribute.Component<'shared.carousel-text', true>;
    hero_description: Schema.Attribute.Text;
    main_title: Schema.Attribute.String;
    small_title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'shared.carousel-text': SharedCarouselText;
      'shared.feature': SharedFeature;
      'shared.hero': SharedHero;
    }
  }
}
