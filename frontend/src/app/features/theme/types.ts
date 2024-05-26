export type Theme = 'Spring' | 'Summer' | 'Fall' | 'Winter';

export type ThemeClass = `${Theme}-light` | `${Theme}-dark`;

export interface ThemeOption {
  light: {
    hex: `#${string}`;
    class: ThemeClass;
  };
  dark: {
    hex: `#${string}`;
    class: ThemeClass;
  };
  name: Theme;
}
