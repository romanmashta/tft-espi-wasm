#include "DisplayContext.h"

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
}

void DisplayContext::DrawToScreen(TFT_eSprite* sprite) {
  uint16_t* buffer = new uint16_t[_width * _height * sizeof(uint16_t)];
  for (size_t i = 0; i < _width * _height; i++) {
    uint16_t color = ((uint16_t *)sprite->getPointer())[i];
    buffer[i] = ((color & 0x00FF) << 8) | ((color & 0xFF00) >> 8);
  }

  SDL_UpdateTexture(_displayTexture, NULL, buffer, _width * sizeof(uint16_t));

  SDL_RenderClear(_renderer);
  SDL_RenderCopy(_renderer, _displayTexture, NULL, NULL);
  SDL_RenderPresent(_renderer);
  delete[] buffer;
}

DisplayContext::~DisplayContext() {
  SDL_DestroyTexture(_displayTexture);
  SDL_DestroyRenderer(_renderer);
  SDL_DestroyWindow(_window);
}
