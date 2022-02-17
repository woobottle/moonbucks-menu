import { INITIAL_CATEGORY } from "./constants/index.js";
import { $ } from './utils/dom.js';
import {
  isEmpty,
  getMenuTemplate,
  renderMenusByFunction,
} from "./utils/index.js";
import MenuApi from './apis/index.js';
let currentCategory = INITIAL_CATEGORY;

window.onload = () => {
  menuRender();
  preventSubmitInForm();
  setDocumentHandlers();
};

const menuRender = async () => {
  const $menuCount = $(".menu-count");
  const $menuList = $("#espresso-menu-list");
  const menuItems = await MenuApi.getCategoryMenu(currentCategory);

  $menuList.innerHTML = renderMenusByFunction(menuItems, getMenuTemplate);
  $menuCount.textContent = `총 ${menuItems.length}개`;
}

const preventSubmitInForm = () => {
  const $form = $("#espresso-menu-form");
  $form.addEventListener("submit", (event) => {
    event.preventDefault();
  });
};

const setDocumentHandlers = () => { 
  formHandler();
  menuListHandler();
  categoryHeaderHandler();
}

const formHandler = () => {
  const $form = $("#espresso-menu-form");
  const addNewMenu = async (event) => {
    const $input = event.target["espressoMenuName"];
    const { value: newMenu } = $input;
    
    if (isEmpty(newMenu)) {
      alert("값을 입력해주세요");
      return;
    }

    await MenuApi.addNewMenu(currentCategory, newMenu);
    $input.value = "";
    
    menuRender();
  };

  $form.addEventListener("submit", addNewMenu, false);
};

const menuListHandler = () => {
  const $menuList = $("#espresso-menu-list");
  $menuList.addEventListener("click", async (event) => {
    const { target } = event;
    const { parentNode } = target;
    const { menuId, menuName } = parentNode.dataset;
    const classList = target.classList;

    if (classList.contains("menu-sold-out-button")) {
      await MenuApi.toggleMenu(currentCategory, menuId);
      
      menuRender();
      return;
    }

    if (classList.contains("menu-edit-button")) {
      const newName = prompt("메뉴명을 수정하세요", menuName);
      await MenuApi.editMenu(currentCategory, newName, menuId);
      
      menuRender();
      return;
    }

    if (classList.contains("menu-remove-button")) {
      const selectResult = confirm("정말 삭제하시겠습니까?");
      if (selectResult) {
        await MenuApi.removeMenu(currentCategory, menuId);
      }

      menuRender();
      return;
    }

    return;
  });
}

const categoryHeaderHandler = () => {
  const categoryHeader = $("main > .wrapper > .heading >  h2");
  const navigationContainer = $("#espresso-menu-nav")
  const navigateTab = (event) => {
    const { target } = event;
    const { tagName } = target;
    if (tagName === "BUTTON") {
      const {
        dataset: { categoryName },
        innerText,
      } = target;
      currentCategory = categoryName;
      categoryHeader.textContent = `${innerText} 메뉴 관리`;

      menuRender();
    }
  };

  navigationContainer.addEventListener("click", navigateTab)
}