import eslint from '@gewis/eslint-config/eslint.common.mjs';
import vue from '@gewis/eslint-config/eslint.vue.mjs';
import prettier from '@gewis/eslint-config/eslint.prettier.mjs';

export default [...eslint, ...vue, ...prettier];
