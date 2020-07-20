import { Application } from 'pixi.js';
import Stats from 'stats.js';
import * as dat from 'dat.gui';
import Geom from 'utils/Geom';
import MathUtils from 'utils/MathUtils';
import appStore from './appStore';
import Resources from './Resources';
import TouchInput from './TouchInput';
import Bodies from './kinematics/Bodies';

export default class App {
  init(htmlElement) {
    this.width = htmlElement.clientWidth;
    this.height = htmlElement.clientHeight;
    this.htmlElement = htmlElement;

    window.addEventListener('resize', this.onResize);
    this.setupApp();
    this.setupStats();
    this.setupLoading();
    this.setupDevGUI();
  }

  setupApp() {
    this.app = new Application({
      width: this.width,
      height: this.height,
      antialias: true,
      autoDensity: true,
      resolution: window.devicePixelRatio,
      backgroundColor: 0xcccccc,
    });
    appStore.width = this.width;
    appStore.height = this.height;
    appStore.app = this.app;
    this.htmlElement.appendChild(this.app.view);
  }

  setupStats() {
    this.stats = new Stats();
    document.body.appendChild(this.stats.dom);
  }

  setupLoading() {
    const resources = new Resources(this.app);
    resources.onLoaded.add(() => {
      this.start();
    });
  }

  setupDevGUI() {
    const gui = new dat.GUI();
    gui.add(appStore, 'numSegments', 2, 50);
    gui.add(appStore, 'segmentLength', 1, 50);
    gui.add(appStore, 'circleRadius', 0, 1);
    gui.add(appStore, 'circleSpeed', 0, 1);
    gui.add(appStore, 'waveSpeed', 0, 1);
    gui.add(appStore, 'waveAmplitude', 0, 1);
  }

  start() {
    this.autoDrag = true;
    this.circleIndex = 0;
    this.waveIndex = 0;

    this.radius = this.width - 100;

    this.centerPos = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.bodies = new Bodies();
    this.bodies.init(appStore.numSegments, appStore.segmentLength);
    this.app.stage.addChild(this.bodies.display);
    this.bodies.drag(500, 500);

    this.touchInput = new TouchInput();
    this.app.stage.addChild(this.touchInput.display);

    appStore.onSegmentLengthUpdate.add((value) => {
      this.bodies.segmentLength = value;
    });

    appStore.onNumSegmentUpdate.add((value) => {
      this.bodies.numSegments = value;
    });

    appStore.onTouchMove.add((pos) => {
      this.bodies.drag(pos.x, pos.y);
    });
    appStore.onTouchUp.add(() => {
      this.autoDrag = true;
    });
    appStore.onTouchDown.add(() => {
      this.autoDrag = false;
    });

    this.app.ticker.add(() => {
      this.update();
    });

    this.onResize();
  }

  update() {
    this.stats.begin();

    // update stuff
    if (this.autoDrag) {
      this.circleIndex += 0.04 * appStore.circleSpeed;
      this.waveIndex += 0.2 * appStore.waveSpeed;

      const midRadius = this.radius * appStore.circleRadius;
      const minRadius =
        midRadius / 2 - (midRadius / 4) * appStore.waveAmplitude;
      const maxRadius =
        midRadius / 2 + (midRadius / 4) * appStore.waveAmplitude;

      const radius = MathUtils.map(
        Math.cos(this.waveIndex),
        -1,
        1,
        minRadius,
        maxRadius
      );
      const dragPos = Geom.getCircleMovement(
        this.centerPos.x,
        this.centerPos.y,
        radius,
        this.circleIndex
      );
      this.bodies.drag(dragPos.x, dragPos.y);
    }

    this.stats.end();
  }

  onResize = () => {
    const parent = this.app.view.parentNode;
    this.width = parent.clientWidth;
    this.height = parent.clientHeight;
    appStore.width = this.width;
    appStore.height = this.height;

    if (this.app) {
      this.app.renderer.resize(parent.clientWidth, parent.clientHeight);
    }

    if (this.touchInput) {
      this.touchInput.resize(this.width, this.height);
    }
  };
}
