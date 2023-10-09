#pragma once

#include <SDL2/SDL.h>
#include <SDL2/SDL_hints.h>
#include <TFT_eSPI.h>

//singleton
class DisplayContext{
public:
  static DisplayContext& GetInstance(size_t width = 0, size_t height = 0) {
    static DisplayContext instance(width, height);
    return instance;
  }

  DisplayContext(DisplayContext const&) = delete;
  void operator=(DisplayContext const&)  = delete;

  TFT_eSPI* getTft();
  static void DrawToScreen();
private:
  static bool _initialized;
  void DrawToScreenInternal();
  DisplayContext(size_t width, size_t height);
  ~DisplayContext();

  size_t _width;
  size_t _height;
  SDL_Window *_window;
  SDL_Renderer *_renderer;
  SDL_Texture *_displayTexture;
  TFT_eSPI* _tft;
  TFT_eSprite* _rootSprite;
};
