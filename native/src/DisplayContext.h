#pragma once

#include <SDL2/SDL.h>
#include <SDL2/SDL_hints.h>
#include <TFT_eSPI.h>

class DisplayContext{
public:
  DisplayContext(size_t width, size_t height);
  ~DisplayContext();

  void DrawToScreen(TFT_eSprite* sprite);
private:
  size_t _width;
  size_t _height;
  SDL_Window *_window;
  SDL_Renderer *_renderer;
  SDL_Texture *_displayTexture;
};
