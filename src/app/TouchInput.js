import { Graphics, Container } from 'pixi.js';

import appStore from './appStore';

export default class TouchInput {
  constructor() {
    this.display = new Container();

    this.hitBg = new Graphics();
    this.hitBg.alpha = 0;
    this.display.addChild(this.hitBg);

    this.hitBg.on('pointerup', this.onTouchUp);
    this.hitBg.on('pointerdown', this.onTouchDown);
    this.hitBg.on('pointermove', this.onTouchMove);

    this.isDown = false;
    this.enable(true);
  }

  enable(value) {
    this.hitBg.buttonMode = value;
    this.hitBg.interactive = value;
    this.hitBg.visible = value;
  }

  onTouchDown = (event) => {
    this.isDown = true;
    appStore.onTouchDown.dispatch(event.data.global);
  };

  onTouchUp = () => {
    if (!this.isDown) {
      return;
    }
    this.isDown = false;
    appStore.onTouchUp.dispatch();
  };

  onTouchUpOutside = () => {
    if (!this.isDown) {
      return;
    }
    this.isDown = false;
    appStore.onTouchUp.dispatch();
  };

  onTouchMove = (event) => {
    if (this.isDown) {
      appStore.onTouchMove.dispatch(event.data.global);
    }
  };

  resize(width, height) {
    this.hitBg.clear();
    this.hitBg.beginFill(0xffffff, 1);
    this.hitBg.drawRect(0, 0, width, height);
  }
}
