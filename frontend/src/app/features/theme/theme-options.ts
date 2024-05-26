import { ThemeClass, ThemeOption } from './types';

export const THEME_OPTIONS: ThemeOption[] = [
  {
    light: {
      hex: '#03c700',
      class: 'Spring-light'
    },
    dark: {
      hex: '#026e00',
      class: 'Spring-dark'
    },
    name: 'Spring'
  },
  {
    light: {
      hex: '#b1b100',
      class: 'Summer-light'
    },
    dark: {
      hex: '#626200',
      class: 'Summer-dark'
    },
    name: 'Summer'
  },
  {
    light: {
      hex: '#ff8e36',
      class: 'Fall-light'
    },
    dark: {
      hex: '#964900',
      class: 'Fall-dark'
    },
    name: 'Fall'
  },
  {
    light: {
      hex: '#7cabff',
      class: 'Winter-light'
    },
    dark: {
      hex: '#00458f',
      class: 'Winter-dark'
    },
    name: 'Winter'
  }
];

export const THEME_CLASSES: ThemeClass[] = THEME_OPTIONS.flatMap((option: ThemeOption) => [
  option.light.class,
  option.dark.class
]);
