export const BREAKPOINTS = { phoneLandscape: 600, tabletPortrait: 768, tabletLandscape: 1024 };

export function getDeviceClass(width) {
  if (width < BREAKPOINTS.phoneLandscape) return 'phone-portrait';
  if (width < BREAKPOINTS.tabletPortrait) return 'phone-landscape';
  if (width < BREAKPOINTS.tabletLandscape) return 'tablet-portrait';
  return 'tablet-landscape';
}

export function getFeedColumns(width) {
  if (width < BREAKPOINTS.phoneLandscape) return 1;
  if (width < BREAKPOINTS.tabletLandscape) return 2;
  return 3;
}
