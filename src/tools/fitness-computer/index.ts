import { Pacman } from '@vicons/tabler';
import { defineTool } from '../tool';

export const tool = defineTool({
  name: 'Fitness Computer',
  path: '/fitness-computer',
  description: 'Compute BMR (Basal Metabolic Rate), TDEE / Calories (Total Daily Energy Expenditure), BMI (Body Mass Index), Ideal Weight (Ideal Body Weight), Body Fat (Body Fat Percentage), Max HR (Maximum Heart Rate): key metrics used to assess overall fitness and physiological health.',
  keywords: ['fitness', 'calories', 'bmi', 'bmr', 'weight', 'fat', 'body', 'fat', 'mass', 'heart'],
  component: () => import('./fitness-computer.vue'),
  icon: Pacman,
  createdAt: new Date('2026-03-07'),
  category: 'Physics',
});
