import React from 'react';

import {
    HomeOutlined,
    UserOutlined,
    AppstoreOutlined,
    SafetyOutlined,
    AreaChartOutlined,
} from '@ant-design/icons';

const menuList = [
  {
    title: "首页",
    path: "/home",
    icon: <HomeOutlined />
  },
  {
    title: "商品",
    path: "/products",
    icon: <AppstoreOutlined />,
    children: [
      {
        title: "品类管理",
        path: "/category",
        icon: <AppstoreOutlined />
      },
      {
        title: "商品管理",
        path: "/product",
        icon: <AppstoreOutlined />
      }
    ]
  },
  {
    title: "用户管理",
    path: "/user",
    icon: <UserOutlined />
  },
  {
    title: "角色管理",
    path: "/role",
    icon: <SafetyOutlined />
  },
  {
    title: "数据展示",
    path: "/charts",
    icon: <AreaChartOutlined />,
    children: [
      {
        title: "柱形图",
        path: "/charts/bar",
        icon: <AreaChartOutlined />
      },
      {
        title: "折线图",
        path: "/charts/line",
        icon: <AreaChartOutlined />
      },
      {
        title: "饼图",
        path: "/charts/pie",
        icon: <AreaChartOutlined />
      }
    ]
  }
];

export default menuList;
