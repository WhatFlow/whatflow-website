import * as migration_20261023_220504_comparisons_initial from './20261023_220504_comparisons_initial';

import * as posts_initial from './20261024_080000_posts_initial';

export const migrations = [
  {
    up: migration_20261023_220504_comparisons_initial.up,
    down: migration_20261023_220504_comparisons_initial.down,
    name: '20261023_220504_comparisons_initial'
  },
  { up: posts_initial.up, down: posts_initial.down, name: '20261024_080000_posts_initial' },
];
