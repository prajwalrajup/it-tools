import { PictureInPictureOff } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Remove Image Background',
  path: '/remove-background',
  description: 'Remove background from an image using AI',
  keywords: ['remove', 'background', 'image', 'rmbg', 'modnet'],
  component: () => import('./remove-background.vue'),
  icon: PictureInPictureOff,
  createdAt: new Date('2026-03-15'),
  category: 'Images',
  externAccessDescription: 'Downloads Remove Background models from HuggingFace. Processing is done in your browser',
});
