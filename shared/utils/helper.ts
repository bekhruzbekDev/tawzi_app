export const cleanParams = (params: Record<string, any>) => {
  const cleanedParams: Record<string, any> = {};

  Object.entries(params).forEach(([key, value]) => {
    if (
      value !== undefined &&
      value !== null &&
      value !== "" &&
      !(Array.isArray(value) && value.length === 0)
    ) {
      cleanedParams[key] = value;
    }
  });

  return cleanedParams;
};