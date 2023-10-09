#include <emscripten/emscripten.h>
#include "DisplayContext.h"

int main() {
  emscripten_set_main_loop([]() {
//    DisplayContext::DrawToScreen();
  }, 0, 1);
  emscripten_set_main_loop_timing(EM_TIMING_SETIMMEDIATE, 0);
}
