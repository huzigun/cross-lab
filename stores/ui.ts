import { acceptHMRUpdate, defineStore } from 'pinia';

const SIDEBAR_FULL_WIDTH = 240;
const SIDEBAR_COLLAPSED_WIDTH = 80;

interface IUiState {
  sideBarWidth: number;
  sideBarLocked: boolean;
}

export const useUiStore = defineStore('ui', {
  state: (): IUiState => ({
    sideBarWidth: SIDEBAR_FULL_WIDTH, // 사이드바 width
    sideBarLocked: true, // 사이드바 고정 여부
  }),

  getters: {
    SIDE_BAR_WIDTH: (state) => state.sideBarWidth,
    IS_SIDEBAR_COLLAPSED: (state) =>
      state.sideBarWidth === SIDEBAR_COLLAPSED_WIDTH,

    SIDE_BAR_ICON: (state) => {
      if (state.sideBarWidth === SIDEBAR_FULL_WIDTH) {
        return 'i-heroicons-bars-3-center-left-20-solid';
      } else {
        return 'i-heroicons-x-mark-solid';
      }
    },
  },

  actions: {
    /**
     * 사이드바 width를 확장합니다.
     */
    openSideBar() {
      if (!this.sideBarLocked) {
        this.sideBarWidth = SIDEBAR_FULL_WIDTH;
      }
    },

    /**
     * 사이드바 width를 축소합니다.
     */
    closeSideBar() {
      if (!this.sideBarLocked) {
        this.sideBarWidth = SIDEBAR_COLLAPSED_WIDTH;
      }
    },

    /**
     * 사이드바 width를 토글합니다.
     */
    toggleSideBarWidth() {
      if (this.sideBarWidth === SIDEBAR_FULL_WIDTH) {
        this.sideBarWidth = SIDEBAR_COLLAPSED_WIDTH;
        this.sideBarLocked = false;
      } else {
        this.sideBarWidth = SIDEBAR_FULL_WIDTH;
        this.sideBarLocked = true;
      }
    },
  },
});

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useUiStore, import.meta.hot));
}
