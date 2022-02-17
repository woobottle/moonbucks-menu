import { API } from './api.config.js';

const addMenu = `${baseUrl}/api/category/:category/menu`;
const getMenusInCategory = `${baseUrl}/api/category/:category/menu`;
const editMenuName =  `${baseUrl}/api/category/:category/menu/:menuId`;
const updateMenuStatus = `${baseUrl}/api/category/:category/menu/:menuId/soldout`;
const deleteMenu = `${baseUrl}/api/category/:category/menu/:menuId`;

export {
  addMenu,
  getMenusInCategory,
  editMenuName,
  updateMenuStatus,
  deleteMenu,
}