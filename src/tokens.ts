export const T = {
  white:       "#F8F8F6",
  black:       "#0A0A0C",
  gray:        "#7A8288",
  grayLt:      "#C8CED4",
  border:      "#E2E4E8",
  surface:     "#EAECEE",
  accent:      "#2563EB",
  accentDk:    "#1D4ED8",
  accentSoft:  "#EFF6FF",
} as const;

export type Tokens = typeof T;
