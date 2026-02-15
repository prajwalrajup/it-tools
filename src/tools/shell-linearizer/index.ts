import { Terminal2 } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Shell Commands Linearizer',
  path: '/shell-linearizer',
  description: 'Linearize multiline shell commands',
  keywords: ['shell', 'multiline', 'linearizer'],
  component: () => import('./shell-linearizer.vue'),
  icon: Terminal2,
  createdAt: new Date('2026-02-14'),
  category: 'Default',
});
