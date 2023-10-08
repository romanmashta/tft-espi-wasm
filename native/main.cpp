#include <SDL2/SDL.h>
#include <SDL2/SDL_hints.h>
#include <emscripten/bind.h>
#include <emscripten/emscripten.h>
#include <TFT_eSPI.h>

class TFTSpi {
public:
    TFTSpi(size_t width, size_t height, emscripten::val canvasIdVal)
      : _width(width), _height(height), _inited(false), _window(nullptr) {
      if (!canvasIdVal.isUndefined()) {
        _canvasId = canvasIdVal.as<std::string>();
      }
    }

    void init() {
      if (_inited) return;
      _inited = true;
      if (!_canvasId.empty()) {
        SDL_SetHint("SDL_EMSCRIPTEN_CANVAS_SELECTOR", _canvasId.c_str());
      }
      SDL_Init(SDL_INIT_VIDEO);
      SDL_CreateWindowAndRenderer(_width, _height, SDL_WINDOW_OPENGL, &_window,
                                  &_renderer);
      _tft = new TFT_eSPI();
      _sprite = new TFT_eSprite(_tft);
      _sprite->createSprite(_width, _height);
    }

    void draw() {
      uint8_t *pixels = new uint8_t[_width * _height * 4];
      uint16_t *spr = (uint16_t*)_sprite->getPointer();

      for (int i = 0; i < _width * _height; i++) {
        uint16_t c = spr[i];
        pixels[i * 4] = (c & 0xF800) >> 8;
        pixels[i * 4 + 1] = (c & 0x07E0) >> 3;
        pixels[i * 4 + 2] = (c & 0x001F) << 3;
        pixels[i * 4 + 3] = 255;
      }

      // Create a texture to hold the pixel data
      SDL_Texture *texture = SDL_CreateTexture(
        _renderer,
        SDL_PIXELFORMAT_ARGB8888,
        SDL_TEXTUREACCESS_STATIC,
        _width,
        _height
      );

      // Update the texture with the pixel data
      SDL_UpdateTexture(texture, NULL, pixels, _width * sizeof(uint32_t));

      // Render the texture
      SDL_RenderClear(_renderer);
      SDL_RenderCopy(_renderer, texture, NULL, NULL);
      SDL_RenderPresent(_renderer);

      // Clean up
      SDL_DestroyTexture(texture);
      delete[] pixels;
    }

    void drawLine(int16_t x0, int16_t y0, int16_t x1, int16_t y1, uint32_t color) {
      _sprite->drawLine(x0, y0, x1, y1, color);
    }

    void drawString(const std::string& string, int16_t x, int16_t y, uint8_t font) {
      _sprite->drawString(string.c_str(), x, y, font);
    }

    void setFont(uint8_t font) {
      _sprite->setTextFont(font);
    }

    void drawSmoothRoundRect(int16_t x, int16_t y, int16_t w, int16_t h, int16_t r, uint32_t color) {
      _sprite->drawRoundRect(x, y, w, h, r, color);
    }

private:
    std::string _canvasId;
    size_t _width;
    size_t _height;
    bool _inited;
    SDL_Window *_window;
    SDL_Renderer *_renderer;
    TFT_eSPI* _tft;
    TFT_eSprite* _sprite;
};

int main() {
  emscripten_set_main_loop([]() {
  }, 0, 1);
  emscripten_set_main_loop_timing(EM_TIMING_SETIMMEDIATE, 0);
}

// Binding code
using namespace emscripten;

EMSCRIPTEN_BINDINGS(my_class_example) {
  class_<TFTSpi>("TFTSpi")
    .constructor<int, int, emscripten::val>()
    .function("init", &TFTSpi::init)
    .function("draw", &TFTSpi::draw)
    .function("drawLine", &TFTSpi::drawLine)
    .function("drawString", &TFTSpi::drawString)
    .function("setFont", &TFTSpi::setFont)
    .function("drawSmoothRoundRect", &TFTSpi::drawSmoothRoundRect)
    ;
}