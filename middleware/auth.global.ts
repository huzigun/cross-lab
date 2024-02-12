export default defineNuxtRouteMiddleware(async () => {
  const user = useUser();
  const headers = {};

  if (process.server) {
    // 서버에서 실행될 때는 쿠기를 직접 설정해야 합니다.
    const cookie = useCookie('auth_session');
    if (cookie.value) {
      // @ts-ignore
      headers.cookie = `auth_session=${cookie.value}`;
    }
  }
  const data = await $fetch('/api/auth/user', {
    headers: process.server ? headers : undefined,
  });
  if (data) {
    user.value = data;
  }
});
