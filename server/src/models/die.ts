export const DICE_VALUES = [1, 2, 3, 4, 5, 6] as const;
export type Die = typeof DICE_VALUES[number];
