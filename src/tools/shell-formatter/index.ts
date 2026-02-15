import { Terminal2 } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Shell Commands Formatter',
  path: '/shell-formatter',
  description: 'Format shell commands as multiline shell commands split on arguments',
  keywords: ['shell', 'multiline', 'formatter'],
  component: () => import('./shell-formatter.vue'),
  icon: Terminal2,
  createdAt: new Date('2026-02-14'),
  category: 'Default',
});
