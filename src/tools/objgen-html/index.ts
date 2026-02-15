import { Brackets } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'ObjGen to HTML',
  path: '/objgen-html',
  description: 'Generate xomplex HTML from TOML like syntax',
  keywords: ['objgen', 'html', 'toml'],
  component: () => import('./objgen-html.vue'),
  icon: Brackets,
  createdAt: new Date('2026-02-14'),
  category: 'XML',
});
