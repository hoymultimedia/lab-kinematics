import Signal from 'mini-signals';

const app = null;
const width = null;
const height = null;

const onTouchDown = new Signal();
const onTouchUp = new Signal();
const onTouchMove = new Signal();

const onNumSegmentUpdate = new Signal();
const onSegmentLengthUpdate = new Signal();
const onEnablePixiRopeUpdate = new Signal();

let _numSegments = 20;
let _segmentLength = 10;
let _circleRadius = 0.5;
let _circleSpeed = 0.5;
let _waveSpeed = 0.5;
let _waveAmplitude = 0.5;
let _enablePixiRope = false;
let _enableDrawPath = false;

export default {
  app,
  width,
  height,
  onTouchDown,
  onTouchUp,
  onTouchMove,
  onNumSegmentUpdate,
  onSegmentLengthUpdate,
  onEnablePixiRopeUpdate,

  get numSegments() {
    return _numSegments;
  },
  set numSegments(value) {
    _numSegments = value;
    onNumSegmentUpdate.dispatch(value);
  },

  get segmentLength() {
    return _segmentLength;
  },
  set segmentLength(value) {
    _segmentLength = value;
    onSegmentLengthUpdate.dispatch(value);
  },

  get circleRadius() {
    return _circleRadius;
  },
  set circleRadius(value) {
    _circleRadius = value;
  },

  get circleSpeed() {
    return _circleSpeed;
  },
  set circleSpeed(value) {
    _circleSpeed = value;
  },

  get waveSpeed() {
    return _waveSpeed;
  },
  set waveSpeed(value) {
    _waveSpeed = value;
  },

  get waveAmplitude() {
    return _waveAmplitude;
  },
  set waveAmplitude(value) {
    _waveAmplitude = value;
  },

  get enablePixiRope() {
    return _enablePixiRope;
  },
  set enablePixiRope(value) {
    _enablePixiRope = value;
    onEnablePixiRopeUpdate.dispatch(value);
  },
  get enableDrawPath() {
    return _enableDrawPath;
  },
  set enableDrawPath(value) {
    _enableDrawPath = value;
  },
};
