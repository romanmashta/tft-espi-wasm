
#include <emscripten.h>
#include <stdlib.h>

EM_JS_DEPS(webidl_binder, "$intArrayFromString,$UTF8ToString");

extern "C" {

// Define custom allocator functions that we can force export using
// EMSCRIPTEN_KEEPALIVE.  This avoids all webidl users having to add
// malloc/free to -sEXPORTED_FUNCTIONS.
EMSCRIPTEN_KEEPALIVE void webidl_free(void* p) { free(p); }
EMSCRIPTEN_KEEPALIVE void* webidl_malloc(size_t len) { return malloc(len); }


EM_JS(void, array_bounds_check_error, (size_t idx, size_t size), {
  throw 'Array index ' + idx + ' out of bounds: [0,' + size + ')';
});

static void array_bounds_check(size_t array_size, size_t array_idx) {
  if (array_idx < 0 || array_idx >= array_size) {
    array_bounds_check_error(array_idx, array_size);
  }
}

// TFT_eSPI

TFT_eSPI* EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_TFT_eSPI_2(int w, int h) {
  return new TFT_eSPI(w, h);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_init_0(TFT_eSPI* self) {
  self->init();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawPixel_3(TFT_eSPI* self, int x, int y, unsigned int color) {
  self->drawPixel(x, y, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawChar_3(TFT_eSPI* self, unsigned short x, int y, int c) {
  self->drawChar(x, y, c);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawChar_4(TFT_eSPI* self, unsigned short x, int y, int c, unsigned char color) {
  self->drawChar(x, y, c, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawChar_6(TFT_eSPI* self, int x, int y, unsigned short c, unsigned int color, unsigned int bg, unsigned char size) {
  self->drawChar(x, y, c, color, bg, size);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawLine_5(TFT_eSPI* self, int xs, int ys, int xe, int ye, unsigned int color) {
  self->drawLine(xs, ys, xe, ye, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawFastVLine_4(TFT_eSPI* self, int x, int y, int h, unsigned int color) {
  self->drawFastVLine(x, y, h, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawFastHLine_4(TFT_eSPI* self, int x, int y, int w, unsigned int color) {
  self->drawFastHLine(x, y, w, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillRect_5(TFT_eSPI* self, int x, int y, int w, int h, unsigned int color) {
  self->fillRect(x, y, w, h, color);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_height_0(TFT_eSPI* self) {
  return self->height();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_width_0(TFT_eSPI* self) {
  return self->width();
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_readPixel_2(TFT_eSPI* self, int x, int y) {
  return self->readPixel(x, y);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setWindow_4(TFT_eSPI* self, int xs, int ys, int xe, int ye) {
  self->setWindow(xs, ys, xe, ye);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushColor_1(TFT_eSPI* self, unsigned short color) {
  self->pushColor(color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushColor_2(TFT_eSPI* self, unsigned short color, unsigned int len) {
  self->pushColor(color, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setRotation_1(TFT_eSPI* self, unsigned char r) {
  self->setRotation(r);
}

unsigned char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getRotation_0(TFT_eSPI* self) {
  return self->getRotation();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setOrigin_2(TFT_eSPI* self, int x, int y) {
  self->setOrigin(x, y);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getOriginX_0(TFT_eSPI* self) {
  return self->getOriginX();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getOriginY_0(TFT_eSPI* self) {
  return self->getOriginY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_invertDisplay_1(TFT_eSPI* self, bool i) {
  self->invertDisplay(i);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setAddrWindow_4(TFT_eSPI* self, int xs, int ys, int w, int h) {
  self->setAddrWindow(xs, ys, w, h);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setViewport_4(TFT_eSPI* self, int x, int y, int w, int h) {
  self->setViewport(x, y, w, h);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setViewport_5(TFT_eSPI* self, int x, int y, int w, int h, bool vpDatum) {
  self->setViewport(x, y, w, h, vpDatum);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_checkViewport_4(TFT_eSPI* self, int x, int y, int w, int h) {
  return self->checkViewport(x, y, w, h);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getViewportX_0(TFT_eSPI* self) {
  return self->getViewportX();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getViewportY_0(TFT_eSPI* self) {
  return self->getViewportY();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getViewportWidth_0(TFT_eSPI* self) {
  return self->getViewportWidth();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getViewportHeight_0(TFT_eSPI* self) {
  return self->getViewportHeight();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getViewportDatum_0(TFT_eSPI* self) {
  return self->getViewportDatum();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_frameViewport_2(TFT_eSPI* self, unsigned short color, int w) {
  self->frameViewport(color, w);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_resetViewport_0(TFT_eSPI* self) {
  self->resetViewport();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushColors_2(TFT_eSPI* self, unsigned short* data, unsigned int len) {
  self->pushColors(data, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushColors_3(TFT_eSPI* self, unsigned short* data, unsigned int len, bool swap) {
  self->pushColors(data, len, swap);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushBlock_2(TFT_eSPI* self, unsigned short color, unsigned int len) {
  self->pushBlock(color, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushPixels_2(TFT_eSPI* self, unsigned char* data_in, unsigned int len) {
  self->pushPixels(data_in, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillScreen_1(TFT_eSPI* self, unsigned int color) {
  self->fillScreen(color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawRect_5(TFT_eSPI* self, int x, int y, int w, int h, unsigned int color) {
  self->drawRect(x, y, w, h, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawRoundRect_6(TFT_eSPI* self, int x, int y, int w, int h, int radius, unsigned int color) {
  self->drawRoundRect(x, y, w, h, radius, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillRoundRect_6(TFT_eSPI* self, int x, int y, int w, int h, int radius, unsigned int color) {
  self->fillRoundRect(x, y, w, h, radius, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillRectVGradient_6(TFT_eSPI* self, short x, short y, short w, short h, unsigned int color1, unsigned int color2) {
  self->fillRectVGradient(x, y, w, h, color1, color2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillRectHGradient_6(TFT_eSPI* self, short x, short y, short w, short h, unsigned int color1, unsigned int color2) {
  self->fillRectHGradient(x, y, w, h, color1, color2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawCircle_4(TFT_eSPI* self, int x, int y, int r, unsigned int color) {
  self->drawCircle(x, y, r, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawCircleHelper_5(TFT_eSPI* self, int x, int y, int r, unsigned char cornername, unsigned int color) {
  self->drawCircleHelper(x, y, r, cornername, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillCircle_4(TFT_eSPI* self, int x, int y, int r, unsigned int color) {
  self->fillCircle(x, y, r, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillCircleHelper_6(TFT_eSPI* self, int x, int y, int r, unsigned char cornername, int delta, unsigned int color) {
  self->fillCircleHelper(x, y, r, cornername, delta, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawEllipse_5(TFT_eSPI* self, short x, short y, int rx, int ry, unsigned short color) {
  self->drawEllipse(x, y, rx, ry, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillEllipse_5(TFT_eSPI* self, short x, short y, int rx, int ry, unsigned short color) {
  self->fillEllipse(x, y, rx, ry, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawTriangle_7(TFT_eSPI* self, int x1, int y1, int x2, int y2, int x3, int y3, unsigned int color) {
  self->drawTriangle(x1, y1, x2, y2, x3, y3, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillTriangle_7(TFT_eSPI* self, int x1, int y1, int x2, int y2, int x3, int y3, unsigned int color) {
  self->fillTriangle(x1, y1, x2, y2, x3, y3, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSmoothArc_8(TFT_eSPI* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color) {
  self->drawSmoothArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSmoothArc_9(TFT_eSPI* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color, bool roundEnds) {
  self->drawSmoothArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawArc_8(TFT_eSPI* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color) {
  self->drawArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawArc_9(TFT_eSPI* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color, bool smoothArc) {
  self->drawArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSmoothCircle_5(TFT_eSPI* self, int x, int y, int r, unsigned int fg_color, unsigned int bg_color) {
  self->drawSmoothCircle(x, y, r, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillSmoothCircle_4(TFT_eSPI* self, int x, int y, int r, unsigned int color) {
  self->fillSmoothCircle(x, y, r, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillSmoothCircle_5(TFT_eSPI* self, int x, int y, int r, unsigned int color, unsigned int bg_color) {
  self->fillSmoothCircle(x, y, r, color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSmoothRoundRect_7(TFT_eSPI* self, int x, int y, int r, int ir, int w, int h, unsigned int fg_color) {
  self->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSmoothRoundRect_8(TFT_eSPI* self, int x, int y, int r, int ir, int w, int h, unsigned int fg_color, unsigned int bg_color) {
  self->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSmoothRoundRect_9(TFT_eSPI* self, int x, int y, int r, int ir, int w, int h, unsigned int fg_color, unsigned int bg_color, unsigned char quadrants) {
  self->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color, bg_color, quadrants);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillSmoothRoundRect_6(TFT_eSPI* self, int x, int y, int w, int h, int radius, unsigned int color) {
  self->fillSmoothRoundRect(x, y, w, h, radius, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fillSmoothRoundRect_7(TFT_eSPI* self, int x, int y, int w, int h, int radius, unsigned int color, unsigned int bg_color) {
  self->fillSmoothRoundRect(x, y, w, h, radius, color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSpot_4(TFT_eSPI* self, float ax, float ay, float r, unsigned int fg_color) {
  self->drawSpot(ax, ay, r, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawSpot_5(TFT_eSPI* self, float ax, float ay, float r, unsigned int fg_color, unsigned int bg_color) {
  self->drawSpot(ax, ay, r, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawWideLine_6(TFT_eSPI* self, float ax, float ay, float bx, float by, float wd, unsigned int fg_color) {
  self->drawWideLine(ax, ay, bx, by, wd, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawWideLine_7(TFT_eSPI* self, float ax, float ay, float bx, float by, float wd, unsigned int fg_color, unsigned int bg_color) {
  self->drawWideLine(ax, ay, bx, by, wd, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawWedgeLine_7(TFT_eSPI* self, float ax, float ay, float bx, float by, float aw, float bw, unsigned int fg_color) {
  self->drawWedgeLine(ax, ay, bx, by, aw, bw, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawWedgeLine_8(TFT_eSPI* self, float ax, float ay, float bx, float by, float aw, float bw, unsigned int fg_color, unsigned int bg_color) {
  self->drawWedgeLine(ax, ay, bx, by, aw, bw, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setSwapBytes_1(TFT_eSPI* self, bool swap) {
  self->setSwapBytes(swap);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getSwapBytes_0(TFT_eSPI* self) {
  return self->getSwapBytes();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawBitmap_6(TFT_eSPI* self, short x, short y, unsigned char* bitmap, short w, short h, unsigned short fgcolor) {
  self->drawBitmap(x, y, bitmap, w, h, fgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawBitmap_7(TFT_eSPI* self, short x, short y, unsigned char* bitmap, short w, short h, unsigned short fgcolor, unsigned short bgcolor) {
  self->drawBitmap(x, y, bitmap, w, h, fgcolor, bgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setPivot_2(TFT_eSPI* self, short x, short y) {
  self->setPivot(x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getPivotX_0(TFT_eSPI* self) {
  return self->getPivotX();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getPivotY_0(TFT_eSPI* self) {
  return self->getPivotY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushRect_5(TFT_eSPI* self, int x, int y, int w, int h, unsigned short* data) {
  self->pushRect(x, y, w, h, data);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushImage_5(TFT_eSPI* self, int x, int y, int w, int h, unsigned short* data) {
  self->pushImage(x, y, w, h, data);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushImage_6(TFT_eSPI* self, int x, int y, int w, int h, unsigned short* data, unsigned short transparent) {
  self->pushImage(x, y, w, h, data, transparent);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_pushMaskedImage_6(TFT_eSPI* self, int x, int y, int w, int h, unsigned short* img, unsigned char* mask) {
  self->pushMaskedImage(x, y, w, h, img, mask);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawNumber_3(TFT_eSPI* self, int intNumber, int x, int y) {
  return self->drawNumber(intNumber, x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawNumber_4(TFT_eSPI* self, int intNumber, int x, int y, unsigned char font) {
  return self->drawNumber(intNumber, x, y, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawFloat_4(TFT_eSPI* self, float floatNumber, unsigned char decimal, int x, int y) {
  return self->drawFloat(floatNumber, decimal, x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawFloat_5(TFT_eSPI* self, float floatNumber, unsigned char decimal, int x, int y, unsigned char font) {
  return self->drawFloat(floatNumber, decimal, x, y, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawString_3(TFT_eSPI* self, char* string, int x, int y) {
  return self->drawString(string, x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_drawString_4(TFT_eSPI* self, char* string, int x, int y, unsigned char font) {
  return self->drawString(string, x, y, font);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setCursor_2(TFT_eSPI* self, short x, short y) {
  self->setCursor(x, y);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setCursor_3(TFT_eSPI* self, short x, short y, unsigned char font) {
  self->setCursor(x, y, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getCursorX_0(TFT_eSPI* self) {
  return self->getCursorX();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getCursorY_0(TFT_eSPI* self) {
  return self->getCursorY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextColor_1(TFT_eSPI* self, unsigned short fgcolor) {
  self->setTextColor(fgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextColor_2(TFT_eSPI* self, unsigned short fgcolor, unsigned short bgcolor) {
  self->setTextColor(fgcolor, bgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextColor_3(TFT_eSPI* self, unsigned short fgcolor, unsigned short bgcolor, bool bgfill) {
  self->setTextColor(fgcolor, bgcolor, bgfill);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextSize_1(TFT_eSPI* self, unsigned char size) {
  self->setTextSize(size);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextWrap_1(TFT_eSPI* self, bool wrapX) {
  self->setTextWrap(wrapX);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextWrap_2(TFT_eSPI* self, bool wrapX, bool wrapY) {
  self->setTextWrap(wrapX, wrapY);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextDatum_1(TFT_eSPI* self, unsigned char datum) {
  self->setTextDatum(datum);
}

unsigned char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getTextDatum_0(TFT_eSPI* self) {
  return self->getTextDatum();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextPadding_1(TFT_eSPI* self, unsigned short x_width) {
  self->setTextPadding(x_width);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_getTextPadding_0(TFT_eSPI* self) {
  return self->getTextPadding();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_setTextFont_1(TFT_eSPI* self, unsigned char font) {
  self->setTextFont(font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_textWidth_1(TFT_eSPI* self, char* string) {
  return self->textWidth(string);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_textWidth_2(TFT_eSPI* self, char* string, unsigned char font) {
  return self->textWidth(string, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fontHeight_0(TFT_eSPI* self) {
  return self->fontHeight();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_fontHeight_1(TFT_eSPI* self, short font) {
  return self->fontHeight(font);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_color565_3(TFT_eSPI* self, unsigned char red, unsigned char green, unsigned char blue) {
  return self->color565(red, green, blue);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_color8to16_1(TFT_eSPI* self, unsigned char color332) {
  return self->color8to16(color332);
}

unsigned char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_color16to8_1(TFT_eSPI* self, unsigned short color565) {
  return self->color16to8(color565);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_color16to24_1(TFT_eSPI* self, unsigned short color565) {
  return self->color16to24(color565);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_color24to16_1(TFT_eSPI* self, unsigned int color888) {
  return self->color24to16(color888);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_alphaBlend_3(TFT_eSPI* self, unsigned char alpha, unsigned short fgc, unsigned short bgc) {
  return self->alphaBlend(alpha, fgc, bgc);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_alphaBlend_4(TFT_eSPI* self, unsigned char alpha, unsigned short fgc, unsigned short bgc, unsigned char dither) {
  return self->alphaBlend(alpha, fgc, bgc, dither);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_alphaBlend24_3(TFT_eSPI* self, unsigned char alpha, unsigned int fgc, unsigned int bgc) {
  return self->alphaBlend24(alpha, fgc, bgc);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_alphaBlend24_4(TFT_eSPI* self, unsigned char alpha, unsigned int fgc, unsigned int bgc, unsigned char dither) {
  return self->alphaBlend24(alpha, fgc, bgc, dither);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_loadFont_1(TFT_eSPI* self, unsigned char* array) {
  self->loadFont(array);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI_unloadFont_0(TFT_eSPI* self) {
  self->unloadFont();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSPI___destroy___0(TFT_eSPI* self) {
  delete self;
}

// VoidPtr

void EMSCRIPTEN_KEEPALIVE emscripten_bind_VoidPtr___destroy___0(void** self) {
  delete self;
}

// TFT_eSprite

TFT_eSprite* EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_TFT_eSprite_1(TFT_eSPI* tft) {
  return new TFT_eSprite(tft);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_createSprite_2(TFT_eSprite* self, short width, short height) {
  self->createSprite(width, height);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_createSprite_3(TFT_eSprite* self, short width, short height, unsigned char frames) {
  self->createSprite(width, height, frames);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_created_0(TFT_eSprite* self) {
  return self->created();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setColorDepth_1(TFT_eSprite* self, char b) {
  self->setColorDepth(b);
}

char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getColorDepth_0(TFT_eSprite* self) {
  return self->getColorDepth();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_createPalette_1(TFT_eSprite* self, unsigned short* palette) {
  self->createPalette(palette);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_createPalette_2(TFT_eSprite* self, unsigned short* palette, unsigned char colors) {
  self->createPalette(palette, colors);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setPaletteColor_2(TFT_eSprite* self, unsigned char index, unsigned short color) {
  self->setPaletteColor(index, color);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getPaletteColor_1(TFT_eSprite* self, unsigned char index) {
  return self->getPaletteColor(index);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setBitmapColor_2(TFT_eSprite* self, unsigned short fg, unsigned short bg) {
  self->setBitmapColor(fg, bg);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillSprite_1(TFT_eSprite* self, unsigned int color) {
  self->fillSprite(color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setScrollRect_4(TFT_eSprite* self, int x, int y, int w, int h) {
  self->setScrollRect(x, y, w, h);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setScrollRect_5(TFT_eSprite* self, int x, int y, int w, int h, unsigned short color) {
  self->setScrollRect(x, y, w, h, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_scroll_1(TFT_eSprite* self, short dx) {
  self->scroll(dx);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_scroll_2(TFT_eSprite* self, short dx, short dy) {
  self->scroll(dx, dy);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushRotated_2(TFT_eSprite* self, TFT_eSprite* spr, short angle) {
  return self->pushRotated(spr, angle);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushRotated_3(TFT_eSprite* self, TFT_eSprite* spr, short angle, unsigned int transp) {
  return self->pushRotated(spr, angle, transp);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushSprite_6(TFT_eSprite* self, int tx, int ty, int sx, int sy, int sw, int sh) {
  return self->pushSprite(tx, ty, sx, sy, sw, sh);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushToSprite_3(TFT_eSprite* self, TFT_eSprite* dspr, int x, int y) {
  return self->pushToSprite(dspr, x, y);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushToSprite_4(TFT_eSprite* self, TFT_eSprite* dspr, int x, int y, unsigned short transparent) {
  return self->pushToSprite(dspr, x, y, transparent);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_printToSprite_1(TFT_eSprite* self, char* string) {
  self->printToSprite(string);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_init_0(TFT_eSprite* self) {
  self->init();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawPixel_3(TFT_eSprite* self, int x, int y, unsigned int color) {
  self->drawPixel(x, y, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawChar_3(TFT_eSprite* self, unsigned short x, int y, int c) {
  self->drawChar(x, y, c);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawChar_4(TFT_eSprite* self, unsigned short x, int y, int c, unsigned char color) {
  self->drawChar(x, y, c, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawChar_6(TFT_eSprite* self, int x, int y, unsigned short c, unsigned int color, unsigned int bg, unsigned char size) {
  self->drawChar(x, y, c, color, bg, size);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawLine_5(TFT_eSprite* self, int xs, int ys, int xe, int ye, unsigned int color) {
  self->drawLine(xs, ys, xe, ye, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawFastVLine_4(TFT_eSprite* self, int x, int y, int h, unsigned int color) {
  self->drawFastVLine(x, y, h, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawFastHLine_4(TFT_eSprite* self, int x, int y, int w, unsigned int color) {
  self->drawFastHLine(x, y, w, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillRect_5(TFT_eSprite* self, int x, int y, int w, int h, unsigned int color) {
  self->fillRect(x, y, w, h, color);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_height_0(TFT_eSprite* self) {
  return self->height();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_width_0(TFT_eSprite* self) {
  return self->width();
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_readPixel_2(TFT_eSprite* self, int x, int y) {
  return self->readPixel(x, y);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setWindow_4(TFT_eSprite* self, int xs, int ys, int xe, int ye) {
  self->setWindow(xs, ys, xe, ye);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushColor_1(TFT_eSprite* self, unsigned short color) {
  self->pushColor(color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushColor_2(TFT_eSprite* self, unsigned short color, unsigned int len) {
  self->pushColor(color, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setRotation_1(TFT_eSprite* self, unsigned char r) {
  self->setRotation(r);
}

unsigned char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getRotation_0(TFT_eSprite* self) {
  return self->getRotation();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setOrigin_2(TFT_eSprite* self, int x, int y) {
  self->setOrigin(x, y);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getOriginX_0(TFT_eSprite* self) {
  return self->getOriginX();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getOriginY_0(TFT_eSprite* self) {
  return self->getOriginY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_invertDisplay_1(TFT_eSprite* self, bool i) {
  self->invertDisplay(i);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setAddrWindow_4(TFT_eSprite* self, int xs, int ys, int w, int h) {
  self->setAddrWindow(xs, ys, w, h);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setViewport_4(TFT_eSprite* self, int x, int y, int w, int h) {
  self->setViewport(x, y, w, h);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setViewport_5(TFT_eSprite* self, int x, int y, int w, int h, bool vpDatum) {
  self->setViewport(x, y, w, h, vpDatum);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_checkViewport_4(TFT_eSprite* self, int x, int y, int w, int h) {
  return self->checkViewport(x, y, w, h);
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getViewportX_0(TFT_eSprite* self) {
  return self->getViewportX();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getViewportY_0(TFT_eSprite* self) {
  return self->getViewportY();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getViewportWidth_0(TFT_eSprite* self) {
  return self->getViewportWidth();
}

int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getViewportHeight_0(TFT_eSprite* self) {
  return self->getViewportHeight();
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getViewportDatum_0(TFT_eSprite* self) {
  return self->getViewportDatum();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_frameViewport_2(TFT_eSprite* self, unsigned short color, int w) {
  self->frameViewport(color, w);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_resetViewport_0(TFT_eSprite* self) {
  self->resetViewport();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushColors_2(TFT_eSprite* self, unsigned short* data, unsigned int len) {
  self->pushColors(data, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushColors_3(TFT_eSprite* self, unsigned short* data, unsigned int len, bool swap) {
  self->pushColors(data, len, swap);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushBlock_2(TFT_eSprite* self, unsigned short color, unsigned int len) {
  self->pushBlock(color, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushPixels_2(TFT_eSprite* self, unsigned char* data_in, unsigned int len) {
  self->pushPixels(data_in, len);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillScreen_1(TFT_eSprite* self, unsigned int color) {
  self->fillScreen(color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawRect_5(TFT_eSprite* self, int x, int y, int w, int h, unsigned int color) {
  self->drawRect(x, y, w, h, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawRoundRect_6(TFT_eSprite* self, int x, int y, int w, int h, int radius, unsigned int color) {
  self->drawRoundRect(x, y, w, h, radius, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillRoundRect_6(TFT_eSprite* self, int x, int y, int w, int h, int radius, unsigned int color) {
  self->fillRoundRect(x, y, w, h, radius, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillRectVGradient_6(TFT_eSprite* self, short x, short y, short w, short h, unsigned int color1, unsigned int color2) {
  self->fillRectVGradient(x, y, w, h, color1, color2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillRectHGradient_6(TFT_eSprite* self, short x, short y, short w, short h, unsigned int color1, unsigned int color2) {
  self->fillRectHGradient(x, y, w, h, color1, color2);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawCircle_4(TFT_eSprite* self, int x, int y, int r, unsigned int color) {
  self->drawCircle(x, y, r, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawCircleHelper_5(TFT_eSprite* self, int x, int y, int r, unsigned char cornername, unsigned int color) {
  self->drawCircleHelper(x, y, r, cornername, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillCircle_4(TFT_eSprite* self, int x, int y, int r, unsigned int color) {
  self->fillCircle(x, y, r, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillCircleHelper_6(TFT_eSprite* self, int x, int y, int r, unsigned char cornername, int delta, unsigned int color) {
  self->fillCircleHelper(x, y, r, cornername, delta, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawEllipse_5(TFT_eSprite* self, short x, short y, int rx, int ry, unsigned short color) {
  self->drawEllipse(x, y, rx, ry, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillEllipse_5(TFT_eSprite* self, short x, short y, int rx, int ry, unsigned short color) {
  self->fillEllipse(x, y, rx, ry, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawTriangle_7(TFT_eSprite* self, int x1, int y1, int x2, int y2, int x3, int y3, unsigned int color) {
  self->drawTriangle(x1, y1, x2, y2, x3, y3, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillTriangle_7(TFT_eSprite* self, int x1, int y1, int x2, int y2, int x3, int y3, unsigned int color) {
  self->fillTriangle(x1, y1, x2, y2, x3, y3, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSmoothArc_8(TFT_eSprite* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color) {
  self->drawSmoothArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSmoothArc_9(TFT_eSprite* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color, bool roundEnds) {
  self->drawSmoothArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawArc_8(TFT_eSprite* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color) {
  self->drawArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawArc_9(TFT_eSprite* self, int x, int y, int r, int ir, unsigned int startAngle, unsigned int endAngle, unsigned int fg_color, unsigned int bg_color, bool smoothArc) {
  self->drawArc(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSmoothCircle_5(TFT_eSprite* self, int x, int y, int r, unsigned int fg_color, unsigned int bg_color) {
  self->drawSmoothCircle(x, y, r, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillSmoothCircle_4(TFT_eSprite* self, int x, int y, int r, unsigned int color) {
  self->fillSmoothCircle(x, y, r, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillSmoothCircle_5(TFT_eSprite* self, int x, int y, int r, unsigned int color, unsigned int bg_color) {
  self->fillSmoothCircle(x, y, r, color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSmoothRoundRect_7(TFT_eSprite* self, int x, int y, int r, int ir, int w, int h, unsigned int fg_color) {
  self->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSmoothRoundRect_8(TFT_eSprite* self, int x, int y, int r, int ir, int w, int h, unsigned int fg_color, unsigned int bg_color) {
  self->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSmoothRoundRect_9(TFT_eSprite* self, int x, int y, int r, int ir, int w, int h, unsigned int fg_color, unsigned int bg_color, unsigned char quadrants) {
  self->drawSmoothRoundRect(x, y, r, ir, w, h, fg_color, bg_color, quadrants);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillSmoothRoundRect_6(TFT_eSprite* self, int x, int y, int w, int h, int radius, unsigned int color) {
  self->fillSmoothRoundRect(x, y, w, h, radius, color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fillSmoothRoundRect_7(TFT_eSprite* self, int x, int y, int w, int h, int radius, unsigned int color, unsigned int bg_color) {
  self->fillSmoothRoundRect(x, y, w, h, radius, color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSpot_4(TFT_eSprite* self, float ax, float ay, float r, unsigned int fg_color) {
  self->drawSpot(ax, ay, r, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawSpot_5(TFT_eSprite* self, float ax, float ay, float r, unsigned int fg_color, unsigned int bg_color) {
  self->drawSpot(ax, ay, r, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawWideLine_6(TFT_eSprite* self, float ax, float ay, float bx, float by, float wd, unsigned int fg_color) {
  self->drawWideLine(ax, ay, bx, by, wd, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawWideLine_7(TFT_eSprite* self, float ax, float ay, float bx, float by, float wd, unsigned int fg_color, unsigned int bg_color) {
  self->drawWideLine(ax, ay, bx, by, wd, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawWedgeLine_7(TFT_eSprite* self, float ax, float ay, float bx, float by, float aw, float bw, unsigned int fg_color) {
  self->drawWedgeLine(ax, ay, bx, by, aw, bw, fg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawWedgeLine_8(TFT_eSprite* self, float ax, float ay, float bx, float by, float aw, float bw, unsigned int fg_color, unsigned int bg_color) {
  self->drawWedgeLine(ax, ay, bx, by, aw, bw, fg_color, bg_color);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setSwapBytes_1(TFT_eSprite* self, bool swap) {
  self->setSwapBytes(swap);
}

bool EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getSwapBytes_0(TFT_eSprite* self) {
  return self->getSwapBytes();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawBitmap_6(TFT_eSprite* self, short x, short y, unsigned char* bitmap, short w, short h, unsigned short fgcolor) {
  self->drawBitmap(x, y, bitmap, w, h, fgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawBitmap_7(TFT_eSprite* self, short x, short y, unsigned char* bitmap, short w, short h, unsigned short fgcolor, unsigned short bgcolor) {
  self->drawBitmap(x, y, bitmap, w, h, fgcolor, bgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setPivot_2(TFT_eSprite* self, short x, short y) {
  self->setPivot(x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getPivotX_0(TFT_eSprite* self) {
  return self->getPivotX();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getPivotY_0(TFT_eSprite* self) {
  return self->getPivotY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushRect_5(TFT_eSprite* self, int x, int y, int w, int h, unsigned short* data) {
  self->pushRect(x, y, w, h, data);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushImage_5(TFT_eSprite* self, int x, int y, int w, int h, unsigned short* data) {
  self->pushImage(x, y, w, h, data);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushImage_6(TFT_eSprite* self, int x, int y, int w, int h, unsigned short* data, unsigned short transparent) {
  self->pushImage(x, y, w, h, data, transparent);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_pushMaskedImage_6(TFT_eSprite* self, int x, int y, int w, int h, unsigned short* img, unsigned char* mask) {
  self->pushMaskedImage(x, y, w, h, img, mask);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawNumber_3(TFT_eSprite* self, int intNumber, int x, int y) {
  return self->drawNumber(intNumber, x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawNumber_4(TFT_eSprite* self, int intNumber, int x, int y, unsigned char font) {
  return self->drawNumber(intNumber, x, y, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawFloat_4(TFT_eSprite* self, float floatNumber, unsigned char decimal, int x, int y) {
  return self->drawFloat(floatNumber, decimal, x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawFloat_5(TFT_eSprite* self, float floatNumber, unsigned char decimal, int x, int y, unsigned char font) {
  return self->drawFloat(floatNumber, decimal, x, y, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawString_3(TFT_eSprite* self, char* string, int x, int y) {
  return self->drawString(string, x, y);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_drawString_4(TFT_eSprite* self, char* string, int x, int y, unsigned char font) {
  return self->drawString(string, x, y, font);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setCursor_2(TFT_eSprite* self, short x, short y) {
  self->setCursor(x, y);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setCursor_3(TFT_eSprite* self, short x, short y, unsigned char font) {
  self->setCursor(x, y, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getCursorX_0(TFT_eSprite* self) {
  return self->getCursorX();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getCursorY_0(TFT_eSprite* self) {
  return self->getCursorY();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextColor_1(TFT_eSprite* self, unsigned short fgcolor) {
  self->setTextColor(fgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextColor_2(TFT_eSprite* self, unsigned short fgcolor, unsigned short bgcolor) {
  self->setTextColor(fgcolor, bgcolor);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextColor_3(TFT_eSprite* self, unsigned short fgcolor, unsigned short bgcolor, bool bgfill) {
  self->setTextColor(fgcolor, bgcolor, bgfill);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextSize_1(TFT_eSprite* self, unsigned char size) {
  self->setTextSize(size);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextWrap_1(TFT_eSprite* self, bool wrapX) {
  self->setTextWrap(wrapX);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextWrap_2(TFT_eSprite* self, bool wrapX, bool wrapY) {
  self->setTextWrap(wrapX, wrapY);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextDatum_1(TFT_eSprite* self, unsigned char datum) {
  self->setTextDatum(datum);
}

unsigned char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getTextDatum_0(TFT_eSprite* self) {
  return self->getTextDatum();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextPadding_1(TFT_eSprite* self, unsigned short x_width) {
  self->setTextPadding(x_width);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_getTextPadding_0(TFT_eSprite* self) {
  return self->getTextPadding();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_setTextFont_1(TFT_eSprite* self, unsigned char font) {
  self->setTextFont(font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_textWidth_1(TFT_eSprite* self, char* string) {
  return self->textWidth(string);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_textWidth_2(TFT_eSprite* self, char* string, unsigned char font) {
  return self->textWidth(string, font);
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fontHeight_0(TFT_eSprite* self) {
  return self->fontHeight();
}

short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_fontHeight_1(TFT_eSprite* self, short font) {
  return self->fontHeight(font);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_color565_3(TFT_eSprite* self, unsigned char red, unsigned char green, unsigned char blue) {
  return self->color565(red, green, blue);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_color8to16_1(TFT_eSprite* self, unsigned char color332) {
  return self->color8to16(color332);
}

unsigned char EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_color16to8_1(TFT_eSprite* self, unsigned short color565) {
  return self->color16to8(color565);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_color16to24_1(TFT_eSprite* self, unsigned short color565) {
  return self->color16to24(color565);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_color24to16_1(TFT_eSprite* self, unsigned int color888) {
  return self->color24to16(color888);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_alphaBlend_3(TFT_eSprite* self, unsigned char alpha, unsigned short fgc, unsigned short bgc) {
  return self->alphaBlend(alpha, fgc, bgc);
}

unsigned short EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_alphaBlend_4(TFT_eSprite* self, unsigned char alpha, unsigned short fgc, unsigned short bgc, unsigned char dither) {
  return self->alphaBlend(alpha, fgc, bgc, dither);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_alphaBlend24_3(TFT_eSprite* self, unsigned char alpha, unsigned int fgc, unsigned int bgc) {
  return self->alphaBlend24(alpha, fgc, bgc);
}

unsigned int EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_alphaBlend24_4(TFT_eSprite* self, unsigned char alpha, unsigned int fgc, unsigned int bgc, unsigned char dither) {
  return self->alphaBlend24(alpha, fgc, bgc, dither);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_loadFont_1(TFT_eSprite* self, unsigned char* array) {
  self->loadFont(array);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite_unloadFont_0(TFT_eSprite* self) {
  self->unloadFont();
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_TFT_eSprite___destroy___0(TFT_eSprite* self) {
  delete self;
}

// DisplayContext

DisplayContext* EMSCRIPTEN_KEEPALIVE emscripten_bind_DisplayContext_DisplayContext_2(int width, int height) {
  return new DisplayContext(width, height);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DisplayContext_DrawToScreen_1(DisplayContext* self, TFT_eSprite* sprite) {
  self->DrawToScreen(sprite);
}

void EMSCRIPTEN_KEEPALIVE emscripten_bind_DisplayContext___destroy___0(DisplayContext* self) {
  delete self;
}

}

