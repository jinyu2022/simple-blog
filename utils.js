'use strict';
/**动态打字机效果
 * @param {HTMLElement} element 要显示文字的元素
 * @param {String} txt 要显示的文字
 * @param {String} type 打字类型，write:打字，delete:删除，默认write
 * @param {Number} speed 打字速度，默认50ms，删除速度为打字速度的3倍
 */
function typewriter(element, txt, type = "write", speed = 50) {
  let i = 0;
  return new Promise((resolve) => {
    function write() {
      if (i < txt.length) {
        element.innerHTML += txt.charAt(i);
        i++;
        setTimeout(write, speed);
      } else {
        resolve();
      }
    }
    function deleteText() {
      let len = element.textContent.length;
      if (len > 0) {
        element.innerHTML = element.innerHTML.slice(0, -1);
        len--;
        setTimeout(deleteText, speed / 3);
      } else {
        resolve();
      }

    }
    if (type === "delete") {
      return deleteText();
    } else if (type === "write") {
      return write();
    } else {
      throw new Error("type参数错误");
    }
  }
  );
}

/**卡片随鼠标旋转
 * @param {HTMLElement} element 卡片元素
 */
function rotateCard(element) {
  let lastMoveTime = 0;
  /**
   * @param {MouseEvent} event 
   */
  function move(event) {
    if (window.innerWidth < 768) return
    const currentTime = new Date().getTime();
    const deltaTime = currentTime - lastMoveTime;
    // 节流
    if (deltaTime < 50) return;
    lastMoveTime = currentTime;
    const { clientX, clientY } = event;
    const { width, height, left, top } = element.getBoundingClientRect();
    const mouseX = Math.abs(clientX - left);
    const mouseY = Math.abs(clientY - top);
    const rotateMin = -15;
    const rotateMax = 15;
    const rotateRange = rotateMax - rotateMin;

    const rotate = {
      x: rotateMax - (mouseY / height) * rotateRange,
      y: rotateMin + (mouseX / width) * rotateRange
    };
    element.style.transform = `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg)`;
  }
  return move
}
/**
 * 防抖函数
 * @param {Function} func 
 * @param {Number} delay 
 * @returns 
 */
function debounce(func, delay) {
  let timer;
  return function () {
    const context = this;
    const args = arguments;
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(function () {
      func.apply(context, args); 
    }, delay);
  };
}
export { typewriter, rotateCard, debounce};