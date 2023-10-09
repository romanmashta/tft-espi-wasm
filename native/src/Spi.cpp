#include "Spi.h"
#include "DisplayContext.h"

Spi::Spi(TFT_eSPI *tft_eSPI) {
  _spi = tft_eSPI;
}

Spi::Spi(size_t width, size_t height) {
  DisplayContext &displayContext = DisplayContext::GetInstance(width, height);
  _spi = displayContext.getTft();
}

Spi::~Spi() {
}

void Spi::init() {

}

void Spi::draw() {
  DisplayContext &displayContext = DisplayContext::GetInstance();
  displayContext.DrawToScreen();
}

void Spi::drawPixel(int32_t x, int32_t y, uint32_t color) {
  _spi->drawPixel(x, y, color);
}

void Spi::drawChar(int32_t x, int32_t y, uint16_t c, uint32_t color, uint32_t bg, uint8_t size) {
  _spi->drawChar(x, y, c, color, bg, size);
}

void Spi::drawLine(int32_t xs, int32_t ys, int32_t xe, int32_t ye, uint32_t color) {
  _spi->drawLine(xs, ys, xe, ye, color);
}

void Spi::drawFastVLine(int32_t x, int32_t y, int32_t h, uint32_t color) {
  _spi->drawFastVLine(x, y, h, color);
}

void Spi::drawFastHLine(int32_t x, int32_t y, int32_t w, uint32_t color) {
  _spi->drawFastHLine(x, y, w, color);
}

void Spi::fillRect(int32_t x, int32_t y, int32_t w, int32_t h, uint32_t color) {
  _spi->fillRect(x, y, w, h, color);
}

int16_t Spi::drawChar(uint16_t uniCode, int32_t x, int32_t y, uint8_t font) {
  return _spi->drawChar(uniCode, x, y, font);
}

int16_t Spi::drawChar(uint16_t uniCode, int32_t x, int32_t y) {
  return _spi->drawChar(uniCode, x, y);
}

int16_t Spi::height(void) {
  return _spi->height();
}

int16_t Spi::width(void) {
  return _spi->width();
}

uint16_t Spi::readPixel(int32_t x, int32_t y) {
  return _spi->readPixel(x, y);
}

void Spi::setWindow(int32_t xs, int32_t ys, int32_t xe, int32_t ye) {
  _spi->setWindow(xs, ys, xe, ye);
}

void Spi::pushColor(uint16_t color) {
  _spi->pushColor(color);
}

void Spi::setRotation(uint8_t r) {
  _spi->setRotation(r);
}

uint8_t Spi::getRotation(void) {
  return _spi->getRotation();
}

void Spi::setOrigin(int32_t x, int32_t y) {
  _spi->setOrigin(x, y);
}

int32_t Spi::getOriginX(void) {
  return _spi->getOriginX();
}

int32_t Spi::getOriginY(void) {
  return _spi->getOriginY();
}

void Spi::invertDisplay(bool i) {
  _spi->invertDisplay(i);
}

void Spi::setAddrWindow(int32_t xs, int32_t ys, int32_t w, int32_t h) {
  _spi->setAddrWindow(xs, ys, w, h);
}

void Spi::setViewport(int32_t x, int32_t y, int32_t w, int32_t h, bool vpDatum) {
  _spi->setViewport(x, y, w, h, vpDatum);
}

bool Spi::checkViewport(int32_t x, int32_t y, int32_t w, int32_t h) {
  return _spi->checkViewport(x, y, w, h);
}

int32_t Spi::getViewportX(void) {
  return _spi->getViewportX();
}

int32_t Spi::getViewportY(void) {
  return _spi->getViewportY();
}

int32_t Spi::getViewportWidth(void) {
  return _spi->getViewportWidth();
}

int32_t Spi::getViewportHeight(void) {
  return _spi->getViewportHeight();
}

bool Spi::getViewportDatum(void) {
  return _spi->getViewportDatum();
}

void Spi::frameViewport(uint16_t color, int32_t w) {
  _spi->frameViewport(color, w);
}

void Spi::resetViewport(void) {
  _spi->resetViewport();
}

bool Spi::clipAddrWindow(int32_t *x, int32_t *y, int32_t *w, int32_t *h) {
  return _spi->clipAddrWindow(x, y, w, h);
}

bool Spi::clipWindow(int32_t *xs, int32_t *ys, int32_t *xe, int32_t *ye) {
  return _spi->clipWindow(xs, ys, xe, ye);
}

void Spi::pushColor(uint16_t color, uint32_t len) {
  _spi->pushColor(color, len);
}

void Spi::pushColors(uint16_t *data, uint32_t len, bool swap) {
  _spi->pushColors(data, len, swap);
}

void Spi::pushColors(uint8_t *data, uint32_t len) {
  _spi->pushColors(data, len);
}

void Spi::pushBlock(uint16_t color, uint32_t len) {
  _spi->pushBlock(color, len);
}

void Spi::pushPixels(const void *data_in, uint32_t len) {
  _spi->pushPixels(data_in, len);
}

void Spi::fillScreen(uint32_t color) {
  _spi->fillScreen(color);
}

void Spi::drawRect(int32_t x, int32_t y, int32_t w, int32_t h, uint32_t color) {
  _spi->drawRect(x, y, w, h, color);
}

void Spi::drawRoundRect(int32_t x, int32_t y, int32_t w, int32_t h, int32_t radius, uint32_t color) {
  _spi->drawRoundRect(x, y, w, h, radius, color);
}

void Spi::fillRoundRect(int32_t x, int32_t y, int32_t w, int32_t h, int32_t radius, uint32_t color) {
  _spi->fillRoundRect(x, y, w, h, radius, color);
}

void Spi::fillRectVGradient(int16_t x, int16_t y, int16_t w, int16_t h, uint32_t color1, uint32_t color2) {
  _spi->fillRectVGradient(x, y, w, h, color1, color2);
}

void Spi::fillRectHGradient(int16_t x, int16_t y, int16_t w, int16_t h, uint32_t color1, uint32_t color2) {
  _spi->fillRectHGradient(x, y, w, h, color1, color2);
}

void Spi::drawCircle(int32_t x, int32_t y, int32_t r, uint32_t color) {
  _spi->drawCircle(x, y, r, color);
}

void Spi::drawCircleHelper(int32_t x, int32_t y, int32_t r, uint8_t cornername, uint32_t color) {
  _spi->drawCircleHelper(x, y, r, cornername, color);
}

void Spi::fillCircle(int32_t x, int32_t y, int32_t r, uint32_t color) {
  _spi->fillCircle(x, y, r, color);
}

void Spi::fillCircleHelper(int32_t x, int32_t y, int32_t r, uint8_t cornername, int32_t delta, uint32_t color) {
  _spi->fillCircleHelper(x, y, r, cornername, delta, color);
}

void Spi::drawEllipse(int16_t x, int16_t y, int32_t rx, int32_t ry, uint16_t color) {
  _spi->drawEllipse(x, y, rx, ry, color);
}

void Spi::fillEllipse(int16_t x, int16_t y, int32_t rx, int32_t ry, uint16_t color) {
  _spi->fillEllipse(x, y, rx, ry, color);
}

void Spi::drawTriangle(int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t x3, int32_t y3, uint32_t color) {
  _spi->drawTriangle(x1, y1, x2, y2, x3, y3, color);
}

void Spi::fillTriangle(int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t x3, int32_t y3, uint32_t color) {
  _spi->fillTriangle(x1, y1, x2, y2, x3, y3, color);
}

uint16_t Spi::drawPixel(int32_t x, int32_t y, uint32_t color, uint8_t alpha, uint32_t bg_color) {
  return _spi->drawPixel(x, y, color, alpha, bg_color);
}

void
Spi::drawSmoothArc(int32_t x, int32_t y, int32_t r, int32_t ir, uint32_t startAngle, uint32_t endAngle,
                   uint32_t fg_color,
                   uint32_t bg_color, bool roundEnds) {
  _spi->drawSmoothArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds);
}

void
Spi::drawArc(int32_t x, int32_t y, int32_t r, int32_t ir, uint32_t startAngle, uint32_t endAngle, uint32_t fg_color,
             uint32_t bg_color, bool smoothArc) {
  _spi->drawArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc);
}

void Spi::drawSmoothCircle(int32_t x, int32_t y, int32_t r, uint32_t fg_color, uint32_t bg_color) {
  _spi->drawSmoothCircle(x, y, r, fg_color, bg_color);
}

void Spi::fillSmoothCircle(int32_t x, int32_t y, int32_t r, uint32_t color, uint32_t bg_color) {
  _spi->fillSmoothCircle(x, y, r, color, bg_color);
}

void Spi::drawSmoothRoundRect(int32_t x, int32_t y, int32_t r, int32_t ir, int32_t w, int32_t h, uint32_t fg_color,
                              uint32_t bg_color, uint8_t quadrants) {
  _spi->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color, bg_color, quadrants);
}

void Spi::fillSmoothRoundRect(int32_t x, int32_t y, int32_t w, int32_t h, int32_t radius, uint32_t color,
                              uint32_t bg_color) {
  _spi->fillSmoothRoundRect(x, y, w, h, radius, color, bg_color);
}

void Spi::drawSpot(float ax, float ay, float r, uint32_t fg_color, uint32_t bg_color) {
  _spi->drawSpot(ax, ay, r, fg_color, bg_color);
}

void
Spi::drawWideLine(float ax, float ay, float bx, float by, float wd, uint32_t fg_color, uint32_t bg_color) {
  _spi->drawWideLine(ax, ay, bx, by, wd, fg_color, bg_color);
}

void Spi::drawWedgeLine(float ax, float ay, float bx, float by, float aw, float bw, uint32_t fg_color,
                        uint32_t bg_color) {
  _spi->drawWedgeLine(ax, ay, bx, by, aw, bw, fg_color, bg_color);
}

void Spi::setSwapBytes(bool swap) {
  _spi->setSwapBytes(swap);
}

bool Spi::getSwapBytes(void) {
  return _spi->getSwapBytes();
}

void Spi::drawBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor) {
  _spi->drawBitmap(x, y, bitmap, w, h, fgcolor);
}

void Spi::drawBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor,
                     uint16_t bgcolor) {
  _spi->drawBitmap(x, y, bitmap, w, h, fgcolor, bgcolor);
}

void Spi::drawXBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor) {
  _spi->drawXBitmap(x, y, bitmap, w, h, fgcolor);
}

void Spi::drawXBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor,
                      uint16_t bgcolor) {
  _spi->drawXBitmap(x, y, bitmap, w, h, fgcolor, bgcolor);
}

void Spi::setBitmapColor(uint16_t fgcolor, uint16_t bgcolor) {
  _spi->setBitmapColor(fgcolor, bgcolor);
}

void Spi::setPivot(int16_t x, int16_t y) {
  _spi->setPivot(x, y);
}

int16_t Spi::getPivotX(void) {
  return _spi->getPivotX();
}

int16_t Spi::getPivotY(void) {
  return _spi->getPivotY();
}

void Spi::readRect(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data) {
  _spi->readRect(x, y, w, h, data);
}

void Spi::pushRect(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data) {
  _spi->pushRect(x, y, w, h, data);
}

void Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data) {
  _spi->pushImage(x, y, w, h, data);
}

void Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data, uint16_t transparent) {
  _spi->pushImage(x, y, w, h, data, transparent);
}

void Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, const uint16_t *data, uint16_t transparent) {
  _spi->pushImage(x, y, w, h, data, transparent);
}

void Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, const uint16_t *data) {
  _spi->pushImage(x, y, w, h, data);
}

void
Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint8_t *data, bool bpp8, uint16_t *cmap) {
  _spi->pushImage(x, y, w, h, data, bpp8, cmap);
}

void Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint8_t *data, uint8_t transparent, bool bpp8,
                    uint16_t *cmap) {
  _spi->pushImage(x, y, w, h, data, transparent, bpp8, cmap);
}

void
Spi::pushImage(int32_t x, int32_t y, int32_t w, int32_t h, const uint8_t *data, bool bpp8, uint16_t *cmap) {
  _spi->pushImage(x, y, w, h, data, bpp8, cmap);
}

void Spi::pushMaskedImage(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *img, uint8_t *mask) {
  _spi->pushMaskedImage(x, y, w, h, img, mask);
}

void Spi::readRectRGB(int32_t x, int32_t y, int32_t w, int32_t h, uint8_t *data) {
  _spi->readRectRGB(x, y, w, h, data);
}


int16_t Spi::drawNumber(long intNumber, int32_t x, int32_t y, uint8_t font) {
  return _spi->drawNumber(intNumber, x, y, font);
}

int16_t Spi::drawNumber(long intNumber, int32_t x, int32_t y) {
  return _spi->drawNumber(intNumber, x, y);
}

int16_t Spi::drawFloat(float floatNumber, uint8_t decimal, int32_t x, int32_t y,
                       uint8_t font) {
  return _spi->drawFloat(floatNumber, decimal, x, y, font);
}

int16_t Spi::drawFloat(float floatNumber, uint8_t decimal, int32_t x, int32_t y) {
  return _spi->drawFloat(floatNumber, decimal, x, y);
}

//int16_t Spi::drawString(std::string string, int32_t x, int32_t y, uint8_t font) {
//  return _spi->drawString(string.c_str(), x, y, font);
//}

int16_t Spi::drawString(std::string string, int32_t x, int32_t y) {
  return _spi->drawString(string.c_str(), x, y);
}
//
//int16_t Spi::drawString(const String &string, int32_t x, int32_t y, uint8_t font) {
//  return _spi->drawString(string, x, y, font);
//}
//
//int16_t Spi::drawString(const String &string, int32_t x, int32_t y) {
//  return _spi->drawString(string, x, y);
//}

int16_t Spi::drawCentreString(const char *string, int32_t x, int32_t y,
                              uint8_t font) {
  return _spi->drawCentreString(string, x, y, font);
}

int16_t Spi::drawRightString(const char *string, int32_t x, int32_t y,
                             uint8_t font) {
  return _spi->drawRightString(string, x, y, font);
}

int16_t Spi::drawCentreString(const String &string, int32_t x, int32_t y,
                              uint8_t font) {
  return _spi->drawCentreString(string, x, y, font);
}

int16_t Spi::drawRightString(const String &string, int32_t x, int32_t y,
                             uint8_t font) {
  return _spi->drawRightString(string, x, y, font);
}

void Spi::setCursor(int16_t x, int16_t y) {
  _spi->setCursor(x, y);
}

void Spi::setCursor(int16_t x, int16_t y, uint8_t font) {
  _spi->setCursor(x, y, font);
}

int16_t Spi::getCursorX() {
  return _spi->getCursorX();
}

int16_t Spi::getCursorY() {
  return _spi->getCursorY();
}

//void Spi::setTextColor(uint16_t color) {
//  _spi->setTextColor(color);
//}

//void Spi::setTextColor(uint16_t fgcolor, uint16_t bgcolor, bool bgfill) {
//  _spi->setTextColor(fgcolor, bgcolor, bgfill);
//}

void Spi::setTextColor(uint16_t fgcolor, uint16_t bgcolor) {
  _spi->setTextColor(fgcolor, bgcolor, false);
}

void Spi::setTextSize(uint8_t size) {
  _spi->setTextSize(size);
}

void Spi::setTextWrap(bool wrapX, bool wrapY) {
  _spi->setTextWrap(wrapX, wrapY);
}

void Spi::setTextDatum(uint8_t datum) {
  _spi->setTextDatum(datum);
}

uint8_t Spi::getTextDatum(void) {
  return _spi->getTextDatum();
}

void Spi::setTextPadding(uint16_t x_width) {
  _spi->setTextPadding(x_width);
}

uint16_t Spi::getTextPadding(void) {
  return _spi->getTextPadding();
}

void Spi::setFreeFont(const GFXfont *f) {
  _spi->setFreeFont(f);
}

void Spi::setTextFont(uint8_t font) {
  _spi->setTextFont(font);
}

int16_t Spi::textWidth(const char *string, uint8_t font) {
  return _spi->textWidth(string, font);
}

int16_t Spi::textWidth(const char *string) {
  return _spi->textWidth(string);
}

int16_t Spi::textWidth(const String &string, uint8_t font) {
  return _spi->textWidth(string, font);
}

int16_t Spi::textWidth(const String &string) {
  return _spi->textWidth(string);

}

int16_t Spi::fontHeight(int16_t font) {
  return _spi->fontHeight(font);
}

int16_t Spi::fontHeight() {
  return _spi->fontHeight();
}


uint16_t Spi::color565(uint8_t red, uint8_t green, uint8_t blue) {
  return _spi->color565(red, green, blue);
}

uint16_t Spi::color8to16(uint8_t color332) {
  return _spi->color8to16(color332);
}

uint8_t Spi::color16to8(uint16_t color565) {
  return _spi->color16to8(color565);
}

uint32_t Spi::color16to24(uint16_t color565) {
  return _spi->color16to24(color565);
}

uint32_t Spi::color24to16(uint32_t color888) {
  return _spi->color24to16(color888);
}

uint16_t Spi::alphaBlend(uint8_t alpha, uint16_t fgc, uint16_t bgc) {
  return _spi->alphaBlend(alpha, fgc, bgc);
}

uint16_t Spi::alphaBlend(uint8_t alpha, uint16_t fgc, uint16_t bgc, uint8_t dither) {
  return _spi->alphaBlend(alpha, fgc, bgc, dither);
}

uint32_t Spi::alphaBlend24(uint8_t alpha, uint32_t fgc, uint32_t bgc, uint8_t dither) {
  return _spi->alphaBlend24(alpha, fgc, bgc, dither);
}

void Spi::loadFont(emscripten::val jsArray) {
  int len = jsArray["length"].as<int>();
  std::vector<uint8_t> font(len);
  for (int i = 0; i < len; i++) {
    font[i] = jsArray[i].as<uint8_t>();
  }
  _spi->loadFont(font.data());
}

void Spi::unloadFont(){
  _spi->unloadFont();
}

TFT_eSPI *Spi::getTftSpi() {
  return _spi;
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(tft_spi) {
  class_<Spi>("TFTSpi")
      .constructor<int, int>()
      .function("init", &Spi::init)
      .function("draw", &Spi::draw)
      .function("fillScreen", &Spi::fillScreen)
      .function("drawLine", &Spi::drawLine)
      .function("drawString", &Spi::drawString)
      .function("setTextFont", &Spi::setTextFont)
      .function("drawRoundRect", &Spi::drawRoundRect)
      ;
}