import { NetworkCheckSharp } from '@vicons/material';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Docker Pangolin Labels',
  path: '/docker-pangolin-labels',
  description: 'Convert Docker Compose Pangolin labels to blueprints and vice versa',
  keywords: ['docker', 'compose', 'pangolin', 'blueprint', 'labels'],
  component: () => import('./docker-pangolin-labels.vue'),
  icon: NetworkCheckSharp,
  createdAt: new Date('2026-02-08'),
  category: 'Docker',
});
