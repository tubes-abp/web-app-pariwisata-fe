export const ownerMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/owner/dashboard',
    icon: 'HomeOutlined',
  },
  {
    key: 'data',
    label: 'Manage Data',
    url: '/owner/data',
    icon: 'UnorderedListOutlined',
    children: [
      {
        key: 'data-product',
        label: 'Product',
        url: '/owner/data/product',
        icon: '',
      },
      {
        key: 'data-transaction',
        label: 'Transaction',
        url: '/owner/data/transaction',
        icon: '',
      },      
    ],
  },
  {
    key: 'cashiers',
    label: 'Manage Cashiers',
    url: '/owner/cashiers',
    icon: 'FormOutlined',
  },
  {
    key: 'account',
    label: 'Manage Account',
    url: '/owner/account',
    icon: 'UserOutlined',
  },
];

export const cashierMenu = [
  {
    key: 'dashboard',
    label: 'Dashboard',
    url: '/cashier/dashboard',
    icon: 'HomeOutlined',
  },
  {
    key: 'data',
    label: 'Manage Data',
    url: '/cashier/data',
    icon: 'UnorderedListOutlined',
    children: [
      {
        key: 'data-product',
        label: 'Product',
        url: '/cashier/data/product',
        icon: '',
      },
      {
        key: 'data-transaction',
        label: 'Transaction',
        url: '/cashier/data/transaction',
        icon: '',
      },      
    ],
  },
]