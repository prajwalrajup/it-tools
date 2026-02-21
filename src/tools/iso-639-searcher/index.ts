import { Language } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'ISO 639 Searcher',
  path: '/iso-639-searcher',
  description: 'Search in ISO 639-1/2T/2B/3 language codes',
  keywords: ['iso639', 'language', 'langcode', 'searcher'],
  component: () => import('./iso-639-searcher.vue'),
  icon: Language,
  createdAt: new Date('2026-02-21'),
  category: 'Data',
});
