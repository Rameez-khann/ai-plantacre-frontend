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


export function getQueryParams(url) {
  // If no url is passed, use the current page location
  const href = url ?? window.location.href;

  const queryIndex = href.indexOf('?');
  if (queryIndex === -1) return {};

  const queryString = href.slice(queryIndex + 1);
  const params = {};

  for (const pair of queryString.split('&')) {
    if (!pair) continue;
    const [key, value = ''] = pair.split('=');
    params[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return params;
}

