#include <SDL2/SDL.h>
#include <SDL2/SDL_hints.h>
#include <emscripten/bind.h>
#include <emscripten/emscripten.h>

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
    }

    void draw() {
      uint8_t *pixels = new uint8_t[_width * _height * 4];
      for (int y = 0; y < _height; y++) {
        for (int x = 0; x < _width; x++) {
          pixels[y * (_width * 4) + x * 4] = x ^ y;
          pixels[y * (_width * 4) + x * 4 + 1] = 0;
          pixels[y * (_width * 4) + x * 4 + 2] = 0;
          pixels[y * (_width * 4) + x * 4 + 3] = 255;
        }
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

private:
    std::string _canvasId;
    size_t _width;
    size_t _height;
    bool _inited;
    SDL_Window *_window;
    SDL_Renderer *_renderer;
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
    .function("draw", &TFTSpi::draw);
}