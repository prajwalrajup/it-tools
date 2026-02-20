import { Artboard } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Zalgo Generator/Banner',
  path: '/zalgo',
  description: 'Generate Zalgo text and clean zalgo generated text',
  keywords: ['zalgo', 'text', 'generation'],
  component: () => import('./zalgo.vue'),
  icon: Artboard,
  createdAt: new Date('2026-02-21'),
  category: 'Text',
});
