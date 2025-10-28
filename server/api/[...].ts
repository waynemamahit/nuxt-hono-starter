import honoApp from '..';

export default defineEventHandler((event) => {
  const originalRequest = toWebRequest(event);
  const url = new URL(originalRequest.url);
  url.pathname = url.pathname.replace(/^\/api/, '');
  const modifiedRequest = new Request(url, originalRequest);
  return honoApp.fetch(modifiedRequest);
});
