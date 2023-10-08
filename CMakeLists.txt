cmake_minimum_required(VERSION 3.26)
project(tft-espi-wasm)

add_compile_options(-Wno-non-c-typedef-for-linkage)
add_compile_options(-Wno-implicit-const-int-float-conversion)
add_compile_definitions(DISABLE_ALL_LIBRARY_WARNINGS)

set(CMAKE_CXX_STANDARD 17)
set(USE_FLAGS "-s USE_SDL=2")
set(LINK_FLAGS "-sWASM=1 -sEXPORT_ES6=1 -sEXPORT_NAME='WasmBox' -sINITIAL_MEMORY=32MB -sTOTAL_MEMORY=256MB -sMODULARIZE=1 -sSINGLE_FILE=1 -lembind")
#set(LINK_FLAGS "-sINITIAL_MEMORY=32MB -sTOTAL_MEMORY=256MB -lembind")

set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} ${USE_FLAGS}")
set(CMAKE_C_FLAGS "${CMAKE_C_FLAGS} ${USE_FLAGS}")
set(CMAKE_EXE_LINKER_FLAGS "${CMAKE_EXE_LINKER_FLAGS} ${USE_FLAGS} ${LINK_FLAGS}")
#set(CMAKE_EXECUTABLE_SUFFIX ".html")

find_package(SDL2 REQUIRED)
include_directories(${SDL2_INCLUDE_DIRS})

add_executable(${PROJECT_NAME})

add_subdirectory(native)

target_link_libraries(${PROJECT_NAME} ${SDL2_LIBRARIES} ${LINK_FLAGS})

add_custom_command(
        TARGET ${PROJECT_NAME}
        POST_BUILD
        COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}.js
        ${CMAKE_SOURCE_DIR}/src/${PROJECT_NAME}.js
        COMMAND ${CMAKE_COMMAND} -E copy ${CMAKE_CURRENT_BINARY_DIR}/${PROJECT_NAME}.js
        ${CMAKE_SOURCE_DIR}/dist/${PROJECT_NAME}.js
)
