export * from './dom.js';
export * from './validation.js';

const getMenuTemplate = ({ id, name, isSoldOut }) => {
  return `
    <li class="menu-list-item d-flex items-center py-2" data-menu-name="${name}" data-menu-id="${id}">
      <span class="w-100 pl-2 menu-name ${isSoldOut ? "sold-out" : ""}">${name}</span>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-sold-out-button"
      >
        품절
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm mr-1 menu-edit-button"
      >
        수정
      </button>
      <button
        type="button"
        class="bg-gray-50 text-gray-500 text-sm menu-remove-button"
      >
        삭제
      </button>
    </li>
  `;
};

const renderMenusByFunction = (menus, generateTemplate) => {
  return menus.map((menu) => generateTemplate(menu)).join("");
};

export {
  getMenuTemplate,
  renderMenusByFunction,
};