interface IMenu {
  label: string;
  defaultOpen?: boolean;
  slot?: string;
  to?: string;
  icon?: string;
  submenus?: ISubmenu[];
}

interface ISubmenu {
  label: string;
  to: string;
}
