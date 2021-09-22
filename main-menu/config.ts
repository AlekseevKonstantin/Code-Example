import {
  PRIMARY_COLOR,
  BLUE_COLOR,
  CYAN_COLOR,
  INDIGO_COLOR,
  ERROR_COLOR,
} from 'constants/colors';

export default [
  {
    id: 1,
    wrapper: 'menu',
    children: [
      {
        id: 2,
        type: 'logo',
      },
      {
        id: 3,
        type: 'avatar',
      },
      {
        id: 4,
        wrapper: 'group',
        children: [
          {
            id: 5,
            type: 'search',
          },
          {
            id: 6,
            wrapper: 'group',
            children: [
              {
                id: 7,
                type: 'default',
                title: 'Главная',
                icon: 'home',
                iconHoverColor: '',
              },
              {
                id: 8,
                type: 'default',
                title: 'Панель управления',
                icon: 'speed',
                isActive: true,
                iconHoverColor: '',
              },
              {
                id: 9,
                element: true,
                wrapper: 'submenu',
                type: 'default',
                title: 'Закупки',
                icon: 'shoppingCart',
                iconHoverColor: PRIMARY_COLOR,
                children: [
                  {
                    id: 10,
                    type: 'default',
                    title: 'Согласование',
                    icon: '',
                    iconHoverColor: '',
                  },
                  {
                    id: 11,
                    type: 'default',
                    title: 'Торги',
                    icon: '',
                    iconHoverColor: '',
                  },
                  {
                    id: 12,
                    type: 'default',
                    title: 'Поставка',
                    icon: '',
                    iconHoverColor: '',
                  },
                  {
                    id: 13,
                    type: 'default',
                    title: 'Архив',
                    icon: '',
                    iconHoverColor: '',
                  },
                  {
                    id: 14,
                    type: 'default',
                    title: 'Корзина',
                    icon: '',
                    iconHoverColor: '',
                  },
                ],
              },
              {
                id: 15,
                element: true,
                wrapper: 'submenu',
                type: 'default',
                title: 'Продажи',
                icon: 'offer',
                iconHoverColor: BLUE_COLOR,
                children: [
                  {
                    id: 16,
                    type: 'default',
                    title: 'Торги',
                    icon: '',
                    iconHoverColor: '',
                  },
                  {
                    id: 17,
                    type: 'default',
                    title: 'Поставка',
                    icon: '',
                    iconHoverColor: '',
                  },
                  {
                    id: 18,
                    type: 'default',
                    title: 'Архив',
                    icon: '',
                    iconHoverColor: '',
                  },
                ],
              },
              {
                id: 19,
                element: true,
                wrapper: 'submenu',
                type: 'default',
                title: 'Компании',
                icon: 'domain',
                iconHoverColor: CYAN_COLOR,
                children: [
                  {
                    id: 20,
                    type: 'default',
                    title: 'Создать профиль',
                    icon: 'addCircleOutline',
                    iconHoverColor: INDIGO_COLOR,
                  },
                  {
                    id: 21,
                    type: 'default',
                    title: 'Присоединиться к компании',
                    icon: 'insertLink',
                    iconHoverColor: INDIGO_COLOR,
                    nowrap: true,
                  },
                ],
              },
              {
                id: 22,
                type: 'default',
                title: 'Справка',
                icon: 'help',
                iconHoverColor: INDIGO_COLOR,
              },
              {
                id: 23,
                type: 'default',
                title: 'Выход',
                icon: 'input',
                iconHoverColor: ERROR_COLOR,
              },
            ],
          },
        ],
      },
    ],
  },
];
