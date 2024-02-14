export const useMenus = (): IMenu[] => {
  return [
    {
      label: 'STORE',
      defaultOpen: true,
      slot: 'sub-menus',
      to: '',
      icon: 'i-heroicons-home-20-solid',
      submenus: [
        {
          label: '대시보드',
          to: '/',
        },
        {
          label: '설치기사 관리',
          to: '/engineer',
        },
        {
          label: '상품 관리',
          to: '/product',
        },
        {
          label: '주문 관리',
          to: '/order',
        },
        {
          label: '유저 관리',
          to: '/user',
        },
      ],
    },
  ];
};

/**
 * 페이지 타이틀 목록을 반환합니다. Depth 2까지만 지원합니다.
 *
 * @param path 현재 페이지의 경로
 * @param menus 메뉴 목록
 */
export const usePageTitles = (path: string, menus: IMenu[]) => {
  const pageTitles: IMenu[] = [
    {
      label: 'HOME',
      to: '/',
    },
  ];
  const menu = menus.find((menu) => path.includes(menu.to || ''));

  if (menu) {
    pageTitles.push(menu);

    if (menu.submenus) {
      const submenu = menu.submenus.find((submenu) =>
        path.includes(submenu.to),
      );

      if (submenu) {
        pageTitles.push(submenu);
      }
    }
  }

  return pageTitles;
};

/**
 * 기존 쿼리에 새로운 쿼리를 추가하여 라우팅합니다.
 *
 * @param addQuery - 추가할 쿼리 객체
 */
export const useChangeQuery = (addQuery: {
  [key: string]: string | undefined;
}) => {
  const route = useRoute();
  return navigateTo({
    path: route.path,
    query: { ...route.query, ...addQuery },
  });
};
