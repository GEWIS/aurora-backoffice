import type { ILightsGroup } from '@/api/Client';
import type { Ref } from 'vue';

export interface SelectedLightsGroup extends ILightsGroup {
  selected: Ref<boolean>;
}
