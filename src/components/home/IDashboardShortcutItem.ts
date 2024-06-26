import type { MenuItem } from 'primevue/menuitem';
import type { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface IDashboardShortcutItem extends MenuItem {
  faIcon?: IconDefinition;
  disabledIcon?: boolean;
  enabledIcon?: boolean;
  items?: IDashboardShortcutItem[];
}
