export const getCacheKeyGenerator =
  (model: string) =>
  (...keySegments: string[]) =>
    `${model}${keySegments.length > 0 ? `/${keySegments.join("/")}` : ""}`;
