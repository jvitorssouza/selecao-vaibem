import { BiBuildingHouse } from 'react-icons/bi';

export interface MenuInterface {
    title: string;
    page: string;
    icon?: any;
    slug: string;
}

export const MenuConfig: MenuInterface[] = [
    {
        title: 'Estabelecimentos',
        page: '/establishments',
        icon: BiBuildingHouse,
        slug: 'establishments.view',
    },
];
