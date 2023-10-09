#pragma once

#include <emscripten/emscripten.h>
#include <emscripten/bind.h>
#include <TFT_eSPI.h>

class Spi {
public:
  Spi(TFT_eSPI *tft_eSPI);

  Spi(size_t width, size_t height);

  ~Spi();

  void init();
  void draw();

  virtual void drawPixel(int32_t x, int32_t y, uint32_t color),
      drawChar(int32_t x, int32_t y, uint16_t c, uint32_t color, uint32_t bg, uint8_t size),
      drawLine(int32_t xs, int32_t ys, int32_t xe, int32_t ye, uint32_t color),
      drawFastVLine(int32_t x, int32_t y, int32_t h, uint32_t color),
      drawFastHLine(int32_t x, int32_t y, int32_t w, uint32_t color),
      fillRect(int32_t x, int32_t y, int32_t w, int32_t h, uint32_t color);

  virtual int16_t drawChar(uint16_t uniCode, int32_t x, int32_t y, uint8_t font),
      drawChar(uint16_t uniCode, int32_t x, int32_t y),
      height(void),
      width(void);

  virtual uint16_t readPixel(int32_t x, int32_t y);

  virtual void setWindow(int32_t xs, int32_t ys, int32_t xe, int32_t ye);

  virtual void pushColor(uint16_t color);

  void setRotation(uint8_t r);

  uint8_t getRotation(void);

  void setOrigin(int32_t x, int32_t y);

  int32_t getOriginX(void);

  int32_t getOriginY(void);

  void invertDisplay(bool i);

  void setAddrWindow(int32_t xs, int32_t ys, int32_t w, int32_t h);


  void setViewport(int32_t x, int32_t y, int32_t w, int32_t h, bool vpDatum = true);

  bool checkViewport(int32_t x, int32_t y, int32_t w, int32_t h);

  int32_t getViewportX(void);

  int32_t getViewportY(void);

  int32_t getViewportWidth(void);

  int32_t getViewportHeight(void);

  bool getViewportDatum(void);

  void frameViewport(uint16_t color, int32_t w);

  void resetViewport(void);

  bool clipAddrWindow(int32_t *x, int32_t *y, int32_t *w, int32_t *h);

  bool clipWindow(int32_t *xs, int32_t *ys, int32_t *xe, int32_t *ye);

  void pushColor(uint16_t color, uint32_t len),
      pushColors(uint16_t *data, uint32_t len, bool swap = true),
      pushColors(uint8_t *data, uint32_t len);

  void pushBlock(uint16_t color, uint32_t len);

  void pushPixels(const void *data_in, uint32_t len);

  void fillScreen(uint32_t color),
      drawRect(int32_t x, int32_t y, int32_t w, int32_t h, uint32_t color),
      drawRoundRect(int32_t x, int32_t y, int32_t w, int32_t h, int32_t radius, uint32_t color),
      fillRoundRect(int32_t x, int32_t y, int32_t w, int32_t h, int32_t radius, uint32_t color);

  void fillRectVGradient(int16_t x, int16_t y, int16_t w, int16_t h, uint32_t color1, uint32_t color2);

  void fillRectHGradient(int16_t x, int16_t y, int16_t w, int16_t h, uint32_t color1, uint32_t color2);

  void drawCircle(int32_t x, int32_t y, int32_t r, uint32_t color),
      drawCircleHelper(int32_t x, int32_t y, int32_t r, uint8_t cornername, uint32_t color),
      fillCircle(int32_t x, int32_t y, int32_t r, uint32_t color),
      fillCircleHelper(int32_t x, int32_t y, int32_t r, uint8_t cornername, int32_t delta, uint32_t color),

      drawEllipse(int16_t x, int16_t y, int32_t rx, int32_t ry, uint16_t color),
      fillEllipse(int16_t x, int16_t y, int32_t rx, int32_t ry, uint16_t color),

      drawTriangle(int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t x3, int32_t y3, uint32_t color),
      fillTriangle(int32_t x1, int32_t y1, int32_t x2, int32_t y2, int32_t x3, int32_t y3, uint32_t color);

  uint16_t drawPixel(int32_t x, int32_t y, uint32_t color, uint8_t alpha, uint32_t bg_color = 0x00FFFFFF);

  void
  drawSmoothArc(int32_t x, int32_t y, int32_t r, int32_t ir, uint32_t startAngle, uint32_t endAngle, uint32_t fg_color,
                uint32_t bg_color, bool roundEnds = false);

  void drawArc(int32_t x, int32_t y, int32_t r, int32_t ir, uint32_t startAngle, uint32_t endAngle, uint32_t fg_color,
               uint32_t bg_color, bool smoothArc = true);

  void drawSmoothCircle(int32_t x, int32_t y, int32_t r, uint32_t fg_color, uint32_t bg_color);

  void fillSmoothCircle(int32_t x, int32_t y, int32_t r, uint32_t color, uint32_t bg_color = 0x00FFFFFF);

  void drawSmoothRoundRect(int32_t x, int32_t y, int32_t r, int32_t ir, int32_t w, int32_t h, uint32_t fg_color,
                           uint32_t bg_color = 0x00FFFFFF, uint8_t quadrants = 0xF);

  void fillSmoothRoundRect(int32_t x, int32_t y, int32_t w, int32_t h, int32_t radius, uint32_t color,
                           uint32_t bg_color = 0x00FFFFFF);

  void drawSpot(float ax, float ay, float r, uint32_t fg_color, uint32_t bg_color = 0x00FFFFFF);

  void
  drawWideLine(float ax, float ay, float bx, float by, float wd, uint32_t fg_color, uint32_t bg_color = 0x00FFFFFF);

  void drawWedgeLine(float ax, float ay, float bx, float by, float aw, float bw, uint32_t fg_color,
                     uint32_t bg_color = 0x00FFFFFF);

  void setSwapBytes(bool swap);

  bool getSwapBytes(void);

  void drawBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor),
      drawBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor, uint16_t bgcolor),
      drawXBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor),
      drawXBitmap(int16_t x, int16_t y, const uint8_t *bitmap, int16_t w, int16_t h, uint16_t fgcolor,
                  uint16_t bgcolor),
      setBitmapColor(uint16_t fgcolor, uint16_t bgcolor); // Define the 2 colours for 1bpp sprites

  void setPivot(int16_t x, int16_t y);

  int16_t getPivotX(void),
      getPivotY(void);

  void readRect(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data);

  void pushRect(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *data, uint16_t transparent);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, const uint16_t *data, uint16_t transparent);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, const uint16_t *data);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint8_t *data, bool bpp8 = true, uint16_t *cmap = nullptr);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, uint8_t *data, uint8_t transparent, bool bpp8 = true,
                 uint16_t *cmap = nullptr);

  void pushImage(int32_t x, int32_t y, int32_t w, int32_t h, const uint8_t *data, bool bpp8, uint16_t *cmap = nullptr);

  void pushMaskedImage(int32_t x, int32_t y, int32_t w, int32_t h, uint16_t *img, uint8_t *mask);

  void readRectRGB(int32_t x, int32_t y, int32_t w, int32_t h, uint8_t *data);


  int16_t drawNumber(long intNumber, int32_t x, int32_t y, uint8_t font),
      drawNumber(long intNumber, int32_t x, int32_t y),

      drawFloat(float floatNumber, uint8_t decimal, int32_t x, int32_t y,
                uint8_t font),
      drawFloat(float floatNumber, uint8_t decimal, int32_t x, int32_t y),

//      drawString(std::string string, int32_t x, int32_t y, uint8_t font),
      drawString(std::string string, int32_t x, int32_t y),
//      drawString(const String &string, int32_t x, int32_t y, uint8_t font),
//      drawString(const String &string, int32_t x, int32_t y),

      drawCentreString(const char *string, int32_t x, int32_t y,
                       uint8_t font),
      drawRightString(const char *string, int32_t x, int32_t y,
                      uint8_t font),
      drawCentreString(const String &string, int32_t x, int32_t y,
                       uint8_t font),
      drawRightString(const String &string, int32_t x, int32_t y,
                      uint8_t font);

  void setCursor(int16_t x, int16_t y),
      setCursor(int16_t x, int16_t y, uint8_t font);

  int16_t getCursorX(void),
      getCursorY(void);

  void //setTextColor(uint16_t color),
      //setTextColor(uint16_t fgcolor, uint16_t bgcolor, bool bgfill = false),
      setTextColor(uint16_t fgcolor, uint16_t bgcolor),
      setTextSize(uint8_t size);

  void setTextWrap(bool wrapX, bool wrapY = false);

  void setTextDatum(uint8_t datum);

  uint8_t getTextDatum(void);

  void setTextPadding(uint16_t x_width);

  uint16_t getTextPadding(void);

  void setFreeFont(const GFXfont *f = NULL),
      setTextFont(uint8_t font);

  int16_t textWidth(const char *string, uint8_t font),
      textWidth(const char *string),
      textWidth(const String &string, uint8_t font),
      textWidth(const String &string),
      fontHeight(int16_t font),
      fontHeight(void);

  uint16_t color565(uint8_t red, uint8_t green, uint8_t blue);

  uint16_t color8to16(uint8_t color332);

  uint8_t color16to8(uint16_t color565);

  uint32_t color16to24(uint16_t color565);

  uint32_t color24to16(uint32_t color888);

  uint16_t alphaBlend(uint8_t alpha, uint16_t fgc, uint16_t bgc);

  uint16_t alphaBlend(uint8_t alpha, uint16_t fgc, uint16_t bgc, uint8_t dither);

  uint32_t alphaBlend24(uint8_t alpha, uint32_t fgc, uint32_t bgc, uint8_t dither = 0);

  void loadFont(emscripten::val jsArray);

  void unloadFont();

  TFT_eSPI *getTftSpi(void);

protected:
  TFT_eSPI *_spi;
};