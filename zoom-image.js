function zoomImage() {// 创建一个图片放大样式并添加到页面中
  const style = document.createElement('style');
  style.textContent = `
    /* 遮罩层样式 */
    .overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.8);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 9999;
      transition: all 0.3s ease-in-out;
      opacity: 0;
    }

    /* 放大图片容器样式 */
    .zoom-container {
      position: relative;
      max-width: 100%;
      max-height: 100%;
    }

    /* 放大图片样式 */
    .zoom-image {
      width: 100%;
      height: 100%;
    }

    /* 关闭按钮样式 */
    /*.close-button {
      position: absolute;
      top: 0;
      right: 0;
      color: #fff;
      font-size: 20px;
      cursor: pointer;
    }*/
  `;
  document.head.appendChild(style);

  // 监听所有图片的点击事件
  document.querySelectorAll('img').forEach((img) => {
    console.log(img);
    img.addEventListener('click', (event) => {
      /**遮罩层*/
      const overlay = document.createElement('div');
      overlay.className = 'overlay';

      // 当点击放大的图片时，移除遮罩层
      overlay.onclick = () => document.body.removeChild(overlay);

      /** 放大图片容器 */
      const zoomContainer = document.createElement('div');
      zoomContainer.className = 'zoom-container';

      // 创建放大图片
      const zoomImage = document.createElement('img');
      zoomImage.src = event.target.src;
      zoomImage.className = 'zoom-image';

      // 创建关闭按钮
      // const closeButton = document.createElement('span');
      // closeButton.textContent = '×';
      // closeButton.className = 'close-button';

      // // 当点击关闭按钮时，移除遮罩层
      // closeButton.addEventListener('click', () => {
      //   document.body.removeChild(overlay);
      // });

      // 将放大图片和关闭按钮添加到放大图片容器中
      zoomContainer.appendChild(zoomImage);
      // zoomContainer.appendChild(closeButton);

      // 将放大图片容器添加到遮罩层中
      overlay.appendChild(zoomContainer);

      // 将遮罩层添加到页面中
      document.body.appendChild(overlay);

      // 添加一个延迟，以便过渡动画可以播放
      setTimeout(() => {
        overlay.style.opacity = 1;
      }, 0);
    });
  });
}

// zoomImage();