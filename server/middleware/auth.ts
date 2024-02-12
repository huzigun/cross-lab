import { verifyRequestOrigin } from 'lucia';
import type { Session, User } from 'lucia';

export default defineEventHandler(async (event) => {
  // console.log('auth middleware');

  if (event.method !== 'GET') {
    const originHeader = getHeader(event, 'Origin') ?? null;
    const hostHeader = getHeader(event, 'Host') ?? null;
    if (
      !originHeader ||
      !hostHeader ||
      !verifyRequestOrigin(originHeader, [hostHeader])
    ) {
      return event.node.res.writeHead(403).end();
    }
  }

  const sessionId = getCookie(event, lucia.sessionCookieName) ?? null;
  if (!sessionId) {
    event.context.session = null;
    event.context.user = null;
    return;
  }

  const { session, user } = await lucia.validateSession(sessionId);
  if (session && session.fresh) {
    appendResponseHeader(
      event,
      'Set-Cookie',
      lucia.createSessionCookie(session.id).serialize(),
    );
  }
  if (!session) {
    appendResponseHeader(
      event,
      'Set-Cookie',
      lucia.createBlankSessionCookie().serialize(),
    );
  }
  event.context.session = session;
  event.context.user = user;
});

declare module 'h3' {
  interface H3EventContext {
    user: User | null;
    session: Session | null;
  }
}
