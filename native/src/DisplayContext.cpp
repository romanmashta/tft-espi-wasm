#include "DisplayContext.h"

bool DisplayContext::_initialized = false;

DisplayContext::DisplayContext(size_t width, size_t height) {
  SDL_Init(SDL_INIT_VIDEO);
  SDL_CreateWindowAndRenderer(width, height, SDL_WINDOW_OPENGL, &_window,
                              &_renderer);
  _displayTexture = SDL_CreateTexture(
      _renderer,
      SDL_PIXELFORMAT_RGB565,
      SDL_TEXTUREACCESS_STATIC,
      width,
      height
  );

  _width = width;
  _height = height;
  _tft = new TFT_eSPI(width, height);
  _rootSprite = new TFT_eSprite(_tft);
  _rootSprite->createSprite(width, height);
  _initialized = true;
}

void DisplayContext::DrawToScreen() {
  if (!_initialized) {
    return;
  }
  GetInstance().DrawToScreenInternal();
}

void DisplayContext::DrawToScreenInternal() {
  uint32_t *pixels = new uint32_t[_width * _height];
  uint16_t *spr = (uint16_t*)_rootSprite->getPointer();

  for (int i = 0; i < _width * _height; i++) {
    uint16_t c = spr[i];
    //pixels[i] = _rootSprite->color16to24(c);
    //565 to 888
    //pixels[i] = ((c & 0xF800) << 8) | ((c & 0x07E0) << 5) | ((c & 0x001F) << 3);
  }

  SDL_UpdateTexture(_displayTexture, NULL, spr, _width * sizeof(uint16_t));

  SDL_RenderClear(_renderer);
  SDL_RenderCopy(_renderer, _displayTexture, NULL, NULL);
  SDL_RenderPresent(_renderer);

  delete[] pixels;
}


DisplayContext::~DisplayContext() {
  SDL_DestroyTexture(_displayTexture);
  SDL_DestroyRenderer(_renderer);
  SDL_DestroyWindow(_window);
  delete _tft;
  delete _rootSprite;
}

TFT_eSPI *DisplayContext::getTft() {
  return _rootSprite;
}