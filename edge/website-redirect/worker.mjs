const redirectHosts = new Set(['whatflow.tech', 'www.whatflow.tech', 'www.whatflow.io']);

export default {
  fetch(request) {
    const destination = new URL(request.url);
    if (!redirectHosts.has(destination.hostname)) {
      return new Response('Not found', { status: 404 });
    }
    destination.protocol = 'https:';
    destination.host = 'whatflow.io';
    destination.port = '';
    return Response.redirect(destination.href, ['GET', 'HEAD'].includes(request.method) ? 301 : 308);
  },
};
