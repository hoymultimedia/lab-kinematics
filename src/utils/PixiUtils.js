/* eslint-disable no-param-reassign */
/**
 * Created by pandan on 2017-04-29.
 */
export default class PixiUtils {
  static getPixel(pixels, width, x, y) {
    const index = y * (width * 4) + x * 4;
    return [
      pixels[index],
      pixels[index + 1],
      pixels[index + 2],
      pixels[index + 3],
    ];
  }

  static horizontalAlign(display, percentage, maxWidth, round = true) {
    display.x = (maxWidth - display.width) * percentage;
    if (round) {
      display.x = Math.round(display.x);
    }
  }

  static verticalAlign(display, percentage, maxHeight, round = true) {
    display.y = (maxHeight - display.height) * percentage;
    if (round) {
      display.y = Math.round(display.y);
    }
  }

  static align(display, hAlign, vAlign, hMax, vMax, round = true) {
    display.x = (hMax - display.height) * hAlign;
    display.y = (vMax - display.height) * vAlign;
    if (round) {
      display.x = Math.round(display.x);
      display.y = Math.round(display.y);
    }
  }

  static alignToChild(
    display,
    displayAlignX,
    displayAlignY,
    reference,
    round = true
  ) {
    display.x = reference.x + (reference.width - display.width) * displayAlignX;
    display.y =
      reference.y + (reference.height - display.height) * displayAlignY;
    if (round) {
      display.x = Math.round(display.x);
      display.y = Math.round(display.y);
    }
  }
}
