add_subdirectory(libs/TFT_eSPI)

target_sources(${PROJECT_NAME} PRIVATE main.cpp)
target_include_directories(${PROJECT_NAME} PRIVATE
        libs/TFT_eSPI
        ${ArduinoFake_SOURCE_DIR}/src
)

target_link_libraries(${PROJECT_NAME} TFT_eSPI)

