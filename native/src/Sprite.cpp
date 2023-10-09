#include "Sprite.h"
#include "DisplayContext.h"

Sprite::Sprite() : Spi(DisplayContext::GetInstance().getTft()) {
  _sprite = (TFT_eSprite *) _spi;
}

Sprite::Sprite(Spi *spi) : Spi(new TFT_eSprite(spi->getTftSpi())) {
  _sprite = (TFT_eSprite *) _spi;
}

Sprite::~Sprite() {
  delete _sprite;
}

void Sprite::createSprite(int16_t width, int16_t height, uint8_t frames) {
  _sprite->createSprite(width, height, frames);
}

void *Sprite::getPointer(void) {
  return _sprite->getPointer();
}

bool Sprite::created(void) {
  return _sprite->created();
}

void Sprite::deleteSprite(void) {
  _sprite->deleteSprite();
}

//void *frameBuffer(int8_t f);

void *Sprite::setColorDepth(int8_t b) {
  return _sprite->setColorDepth(b);
}

int8_t Sprite::getColorDepth(void) {
  return _sprite->getColorDepth();
}

void Sprite::createPalette(uint16_t *palette, uint8_t colors) {
  _sprite->createPalette(palette, colors);
}

void Sprite::createPalette(const uint16_t *palette, uint8_t colors) {
  _sprite->createPalette(palette, colors);
}

void Sprite::setPaletteColor(uint8_t index, uint16_t color) {
  _sprite->setPaletteColor(index, color);
}

uint16_t Sprite::getPaletteColor(uint8_t index) {
  return _sprite->getPaletteColor(index);
}

void Sprite::setBitmapColor(uint16_t fg, uint16_t bg) {
  _sprite->setBitmapColor(fg, bg);
}

void Sprite::drawPixel(int32_t x, int32_t y, uint32_t color) {
  _sprite->drawPixel(x, y, color);
}

void Sprite::drawChar(int32_t x, int32_t y, uint16_t c, uint32_t color, uint32_t bg, uint8_t size) {
  _sprite->drawChar(x, y, c, color, bg, size);
}

void Sprite::fillSprite(uint32_t color) {
  _sprite->fillSprite(color);
}


void Sprite::setWindow(int32_t x0, int32_t y0, int32_t x1, int32_t y1) {
  _sprite->setWindow(x0, y0, x1, y1);
}

void Sprite::pushColor(uint16_t color) {
  _sprite->pushColor(color);
}

void Sprite::pushColor(uint16_t color, uint32_t len) {
  _sprite->pushColor(color, len);
}

void Sprite::writeColor(uint16_t color) {
  _sprite->writeColor(color);
}

void Sprite::setScrollRect(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t color) {
  _sprite->setScrollRect(x, y, w, h, color);
}

void Sprite::scroll(int16_t dx, int16_t dy) {
  _sprite->scroll(dx, dy);
}

void Sprite::drawLine(int32_t x0, int32_t y0, int32_t x1, int32_t y1, uint32_t color) {
  _sprite->drawLine(x0, y0, x1, y1, color);
}

void Sprite::drawFastVLine(int32_t x, int32_t y, int32_t h, uint32_t color) {
  _sprite->drawFastVLine(x, y, h, color);
}

void Sprite::drawFastHLine(int32_t x, int32_t y, int32_t w, uint32_t color) {
  _sprite->drawFastHLine(x, y, w, color);
}

void Sprite::fillRect(int32_t x, int32_t y, int32_t w, int32_t h, uint32_t color) {
  _sprite->fillRect(x, y, w, h, color);
}

void Sprite::setRotation(uint8_t rotation) {
  _sprite->setRotation(rotation);
}

uint8_t Sprite::getRotation(void) {
  return _sprite->getRotation();
}

bool Sprite::pushRotated(int16_t angle, uint32_t transp) {
  return _sprite->pushRotated(angle, transp);
}

bool Sprite::pushRotated(TFT_eSprite *spr, int16_t angle, uint32_t transp) {
  return _sprite->pushRotated(spr, angle, transp);
}

bool Sprite::getRotatedBounds(int16_t angle, int16_t *min_x, int16_t *min_y, int16_t *max_x, int16_t *max_y) {
  return _sprite->getRotatedBounds(angle, min_x, min_y, max_x, max_y);
}

bool Sprite::getRotatedBounds(TFT_eSprite *spr, int16_t angle, int16_t *min_x, int16_t *min_y,
                              int16_t *max_x, int16_t *max_y) {
  return _sprite->getRotatedBounds(spr, angle, min_x, min_y, max_x, max_y);
}

void Sprite::getRotatedBounds(int16_t angle, int16_t w, int16_t h, int16_t xp, int16_t yp,
                              int16_t *min_x, int16_t *min_y, int16_t *max_x, int16_t *max_y) {
  _sprite->getRotatedBounds(angle, w, h, xp, yp, min_x, min_y, max_x, max_y);
}

uint16_t Sprite::readPixel(int32_t x0, int32_t y0) {
  return _sprite->readPixel(x0, y0);
}

uint16_t Sprite::readPixelValue(int32_t x, int32_t y) {
  return _sprite->readPixelValue(x, y);
}

void Sprite::pushImage(int32_t x0, int32_t y0, int32_t w, int32_t h, uint16_t *data, uint8_t sbpp) {
  _sprite->pushImage(x0, y0, w, h, data, sbpp);
}

void Sprite::pushImage(int32_t x0, int32_t y0, int32_t w, int32_t h, const uint16_t *data) {
  _sprite->pushImage(x0, y0, w, h, data);
}

void Sprite::pushSprite(int32_t x, int32_t y) {
  _sprite->pushSprite(x, y);
}

void Sprite::pushSprite2(int32_t x, int32_t y, uint16_t transparent) {
  _sprite->pushSprite(x, y, transparent);
}

bool Sprite::pushSprite3(int32_t tx, int32_t ty, int32_t sx, int32_t sy, int32_t sw, int32_t sh) {
  return _sprite->pushSprite(tx, ty, sx, sy, sw, sh);
}

bool Sprite::pushToSprite(TFT_eSprite *dspr, int32_t x, int32_t y) {
  return _sprite->pushToSprite(dspr, x, y);
}

bool Sprite::pushToSprite(TFT_eSprite *dspr, int32_t x, int32_t y, uint16_t transparent) {
  return _sprite->pushToSprite(dspr, x, y, transparent);
}

int16_t Sprite::drawChar(uint16_t uniCode, int32_t x, int32_t y, uint8_t font) {
  return _sprite->drawChar(uniCode, x, y, font);
}

int16_t Sprite::drawChar(uint16_t uniCode, int32_t x, int32_t y) {
  return _sprite->drawChar(uniCode, x, y);
}

int16_t Sprite::width(void) {
  return _sprite->width();
}

int16_t Sprite::height(void) {
  return _sprite->height();
}

void Sprite::drawGlyph(uint16_t code) {
  _sprite->drawGlyph(code);
}

void Sprite::printToSprite(String string) {
  _sprite->printToSprite(string);
}

void Sprite::printToSprite(char *cbuffer, uint16_t len) {
  _sprite->printToSprite(cbuffer, len);
}

int16_t Sprite::printToSprite(int16_t x, int16_t y, uint16_t index) {
  return _sprite->printToSprite(x, y, index);
}

using namespace emscripten;

EMSCRIPTEN_BINDINGS(tft_sprite) {
  class_<Sprite>("TFTSprite")
      .constructor()
      .function("createSprite", &Sprite::createSprite)
      .function("fillScreen", &Sprite::fillScreen)
      .function("drawLine", &Sprite::drawLine)
      .function("drawString", &Sprite::drawString)
      .function("setTextFont", &Sprite::setTextFont)
      .function("drawRoundRect", &Sprite::drawRoundRect)
      .function("pushSprite", &Sprite::pushSprite)

      .function("setTextDatum", &Sprite::setTextDatum)
      .function("loadFont", &Sprite::loadFont)
      .function("unloadFont", &Sprite::unloadFont)
      .function("setTextColor", &Sprite::setTextColor)
      .function("setSwapBytes", &Sprite::setSwapBytes)
      .function("fillSprite", &Sprite::fillSprite)
      ;
}