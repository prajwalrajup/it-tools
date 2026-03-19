import { CompareFilled  } from '@vicons/material';

import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Compare Envronment',
  path: '/compareEnvronmentVariables',
  description: 'Compares 2 envronemnt files',
  keywords: ['compareEnvronmentVariables'],
  component: () => import('./compareEnvronmentVariables.vue'),
  icon: CompareFilled,
  createdAt: new Date('2026-03-18'),
});