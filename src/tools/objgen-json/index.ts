import { Braces } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'ObjGen to JSON',
  path: '/objgen-json',
  description: 'Generate xomplex JSON from TOML like syntax',
  keywords: ['objgen', 'json', 'toml'],
  component: () => import('./objgen-json.vue'),
  icon: Braces,
  createdAt: new Date('2026-02-14'),
  category: 'JSON',
});
