import type { Core } from '@strapi/strapi';

/** Home page hero seed data for avatar (fyers.in) — used when no content exists. Uses schema field names: main_title, small_title */
const HOME_PAGE_SEED = {
  hero: {
    main_title: 'Built for those who are Born to Trade',
    small_title:
      'Advanced tools to help you unlock the next level of precision, insight and performance.  One platform to rule the markets.',
  },
  features: [
    { title: 'Advanced Charts', description: 'Real-time precision and multi-chart layouts.' },
    { title: 'Smart Orders', description: 'Automated risk-managed execution.' },
    { title: 'Scalping Mode', description: 'Lightning-fast execution for scalpers.' },
  ],
};

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    const uid = 'api::home-page.home-page' as const;
    const forceSeed = process.env.STRAPI_SEED_HOME_PAGE === 'true';

    try {
      const existing = await strapi.documents(uid).findFirst();
      if (existing && !forceSeed) return;

      const data = {
        hero: HOME_PAGE_SEED.hero,
        features: HOME_PAGE_SEED.features,
      };

      if (existing?.documentId) {
        await strapi.documents(uid).update({
          documentId: existing.documentId,
          data,
          status: 'published',
        });
        strapi.log.info('[seed] Home page updated with avatar test data.');
      } else {
        await strapi.documents(uid).create({
          data,
          status: 'published',
        });
        strapi.log.info('[seed] Home page created with avatar test data.');
      }
    } catch (e) {
      strapi.log.warn('[seed] Home page seed skipped:', (e as Error).message);
    }
  },
};
