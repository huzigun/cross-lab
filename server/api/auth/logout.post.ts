export default eventHandler(async (event) => {
  // 세션이 있는 경우 세션을 무효화 시킨다.
  if (event.context.session) {
    await lucia.invalidateSession(event.context.session.id);
  }
  // 세션 쿠키를 삭제한다.
  appendHeader(
    event,
    'Set-Cookie',
    lucia.createBlankSessionCookie().serialize(),
  );

  return {
    message: '로그아웃 되었습니다.',
  };
});
