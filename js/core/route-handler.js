export function getRouteParams(path, routePattern) {
  const pathParts = path.split('/').filter(Boolean);
  const patternParts = routePattern.split('/').filter(Boolean);

  if (pathParts.length !== patternParts.length) return null;

  const params = {};

  for (let i = 0; i < patternParts.length; i++) {
    const patternPart = patternParts[i];
    const pathPart = pathParts[i];

    if (patternPart.startsWith(':')) {
      const key = patternPart.slice(1);
      params[key] = pathPart;
    } else if (patternPart !== pathPart) {
      return null;
    }
  }

  return params;
}
