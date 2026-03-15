import { Crane } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Food Energy Converter',
  path: '/food-energy-converter',
  description: 'Convert between food (joule, calories)',
  keywords: ['food', 'energy', 'units', 'joule', 'calories'],
  component: () => import('./food-energy-converter.vue'),
  icon: Crane,
  createdAt: new Date('2026-03-07'),
  category: 'Physics',
});
