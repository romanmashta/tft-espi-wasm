
// Bindings utilities

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function WrapperObject() {
}
WrapperObject.prototype = Object.create(WrapperObject.prototype);
WrapperObject.prototype.constructor = WrapperObject;
WrapperObject.prototype.__class__ = WrapperObject;
WrapperObject.__cache__ = {};
Module['WrapperObject'] = WrapperObject;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant)
    @param {*=} __class__ */
function getCache(__class__) {
  return (__class__ || WrapperObject).__cache__;
}
Module['getCache'] = getCache;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant)
    @param {*=} __class__ */
function wrapPointer(ptr, __class__) {
  var cache = getCache(__class__);
  var ret = cache[ptr];
  if (ret) return ret;
  ret = Object.create((__class__ || WrapperObject).prototype);
  ret.ptr = ptr;
  return cache[ptr] = ret;
}
Module['wrapPointer'] = wrapPointer;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function castObject(obj, __class__) {
  return wrapPointer(obj.ptr, __class__);
}
Module['castObject'] = castObject;

Module['NULL'] = wrapPointer(0);

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function destroy(obj) {
  if (!obj['__destroy__']) throw 'Error: Cannot destroy object. (Did you create it yourself?)';
  obj['__destroy__']();
  // Remove from cache, so the object can be GC'd and refs added onto it released
  delete getCache(obj.__class__)[obj.ptr];
}
Module['destroy'] = destroy;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function compare(obj1, obj2) {
  return obj1.ptr === obj2.ptr;
}
Module['compare'] = compare;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function getPointer(obj) {
  return obj.ptr;
}
Module['getPointer'] = getPointer;

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function getClass(obj) {
  return obj.__class__;
}
Module['getClass'] = getClass;

// Converts big (string or array) values into a C-style storage, in temporary space

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
var ensureCache = {
  buffer: 0,  // the main buffer of temporary storage
  size: 0,   // the size of buffer
  pos: 0,    // the next free offset in buffer
  temps: [], // extra allocations
  needed: 0, // the total size we need next time

  prepare() {
    if (ensureCache.needed) {
      // clear the temps
      for (var i = 0; i < ensureCache.temps.length; i++) {
        Module['_webidl_free'](ensureCache.temps[i]);
      }
      ensureCache.temps.length = 0;
      // prepare to allocate a bigger buffer
      Module['_webidl_free'](ensureCache.buffer);
      ensureCache.buffer = 0;
      ensureCache.size += ensureCache.needed;
      // clean up
      ensureCache.needed = 0;
    }
    if (!ensureCache.buffer) { // happens first time, or when we need to grow
      ensureCache.size += 128; // heuristic, avoid many small grow events
      ensureCache.buffer = Module['_webidl_malloc'](ensureCache.size);
      assert(ensureCache.buffer);
    }
    ensureCache.pos = 0;
  },
  alloc(array, view) {
    assert(ensureCache.buffer);
    var bytes = view.BYTES_PER_ELEMENT;
    var len = array.length * bytes;
    len = (len + 7) & -8; // keep things aligned to 8 byte boundaries
    var ret;
    if (ensureCache.pos + len >= ensureCache.size) {
      // we failed to allocate in the buffer, ensureCache time around :(
      assert(len > 0); // null terminator, at least
      ensureCache.needed += len;
      ret = Module['_webidl_malloc'](len);
      ensureCache.temps.push(ret);
    } else {
      // we can allocate in the buffer
      ret = ensureCache.buffer + ensureCache.pos;
      ensureCache.pos += len;
    }
    return ret;
  },
  copy(array, view, offset) {
    offset >>>= 0;
    var bytes = view.BYTES_PER_ELEMENT;
    switch (bytes) {
      case 2: offset >>>= 1; break;
      case 4: offset >>>= 2; break;
      case 8: offset >>>= 3; break;
    }
    for (var i = 0; i < array.length; i++) {
      view[offset + i] = array[i];
    }
  },
};

/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureString(value) {
  if (typeof value === 'string') {
    var intArray = intArrayFromString(value);
    var offset = ensureCache.alloc(intArray, HEAP8);
    ensureCache.copy(intArray, HEAP8, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureInt8(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP8);
    ensureCache.copy(value, HEAP8, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureInt16(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP16);
    ensureCache.copy(value, HEAP16, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureInt32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAP32);
    ensureCache.copy(value, HEAP32, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureFloat32(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF32);
    ensureCache.copy(value, HEAPF32, offset);
    return offset;
  }
  return value;
}
/** @suppress {duplicate} (TODO: avoid emitting this multiple times, it is redundant) */
function ensureFloat64(value) {
  if (typeof value === 'object') {
    var offset = ensureCache.alloc(value, HEAPF64);
    ensureCache.copy(value, HEAPF64, offset);
    return offset;
  }
  return value;
}


// TFT_eSPI
/** @suppress {undefinedVars, duplicate} @this{Object} */function TFT_eSPI(w, h) {
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  this.ptr = _emscripten_bind_TFT_eSPI_TFT_eSPI_2(w, h);
  getCache(TFT_eSPI)[this.ptr] = this;
};;
TFT_eSPI.prototype = Object.create(WrapperObject.prototype);
TFT_eSPI.prototype.constructor = TFT_eSPI;
TFT_eSPI.prototype.__class__ = TFT_eSPI;
TFT_eSPI.__cache__ = {};
Module['TFT_eSPI'] = TFT_eSPI;

TFT_eSPI.prototype['init'] = TFT_eSPI.prototype.init = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSPI_init_0(self);
};;

TFT_eSPI.prototype['drawPixel'] = TFT_eSPI.prototype.drawPixel = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawPixel_3(self, x, y, color);
};;

TFT_eSPI.prototype['drawChar'] = TFT_eSPI.prototype.drawChar = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, c, color, bg, size) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (c && typeof c === 'object') c = c.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (bg && typeof bg === 'object') bg = bg.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (color === undefined) { _emscripten_bind_TFT_eSPI_drawChar_3(self, x, y, c);  return }
  if (bg === undefined) { _emscripten_bind_TFT_eSPI_drawChar_4(self, x, y, c, color);  return }
  if (size === undefined) { _emscripten_bind_TFT_eSPI_drawChar_5(self, x, y, c, color, bg);  return }
  _emscripten_bind_TFT_eSPI_drawChar_6(self, x, y, c, color, bg, size);
};;

TFT_eSPI.prototype['drawLine'] = TFT_eSPI.prototype.drawLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(xs, ys, xe, ye, color) {
  var self = this.ptr;
  if (xs && typeof xs === 'object') xs = xs.ptr;
  if (ys && typeof ys === 'object') ys = ys.ptr;
  if (xe && typeof xe === 'object') xe = xe.ptr;
  if (ye && typeof ye === 'object') ye = ye.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawLine_5(self, xs, ys, xe, ye, color);
};;

TFT_eSPI.prototype['drawFastVLine'] = TFT_eSPI.prototype.drawFastVLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawFastVLine_4(self, x, y, h, color);
};;

TFT_eSPI.prototype['drawFastHLine'] = TFT_eSPI.prototype.drawFastHLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawFastHLine_4(self, x, y, w, color);
};;

TFT_eSPI.prototype['fillRect'] = TFT_eSPI.prototype.fillRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillRect_5(self, x, y, w, h, color);
};;

TFT_eSPI.prototype['height'] = TFT_eSPI.prototype.height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_height_0(self);
};;

TFT_eSPI.prototype['width'] = TFT_eSPI.prototype.width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_width_0(self);
};;

TFT_eSPI.prototype['readPixel'] = TFT_eSPI.prototype.readPixel = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return _emscripten_bind_TFT_eSPI_readPixel_2(self, x, y);
};;

TFT_eSPI.prototype['setWindow'] = TFT_eSPI.prototype.setWindow = /** @suppress {undefinedVars, duplicate} @this{Object} */function(xs, ys, xe, ye) {
  var self = this.ptr;
  if (xs && typeof xs === 'object') xs = xs.ptr;
  if (ys && typeof ys === 'object') ys = ys.ptr;
  if (xe && typeof xe === 'object') xe = xe.ptr;
  if (ye && typeof ye === 'object') ye = ye.ptr;
  _emscripten_bind_TFT_eSPI_setWindow_4(self, xs, ys, xe, ye);
};;

TFT_eSPI.prototype['pushColor'] = TFT_eSPI.prototype.pushColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color, len) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (len && typeof len === 'object') len = len.ptr;
  if (len === undefined) { _emscripten_bind_TFT_eSPI_pushColor_1(self, color);  return }
  _emscripten_bind_TFT_eSPI_pushColor_2(self, color, len);
};;

TFT_eSPI.prototype['setRotation'] = TFT_eSPI.prototype.setRotation = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  _emscripten_bind_TFT_eSPI_setRotation_1(self, r);
};;

TFT_eSPI.prototype['getRotation'] = TFT_eSPI.prototype.getRotation = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getRotation_0(self);
};;

TFT_eSPI.prototype['setOrigin'] = TFT_eSPI.prototype.setOrigin = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_TFT_eSPI_setOrigin_2(self, x, y);
};;

TFT_eSPI.prototype['getOriginX'] = TFT_eSPI.prototype.getOriginX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getOriginX_0(self);
};;

TFT_eSPI.prototype['getOriginY'] = TFT_eSPI.prototype.getOriginY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getOriginY_0(self);
};;

TFT_eSPI.prototype['invertDisplay'] = TFT_eSPI.prototype.invertDisplay = /** @suppress {undefinedVars, duplicate} @this{Object} */function(i) {
  var self = this.ptr;
  if (i && typeof i === 'object') i = i.ptr;
  _emscripten_bind_TFT_eSPI_invertDisplay_1(self, i);
};;

TFT_eSPI.prototype['setAddrWindow'] = TFT_eSPI.prototype.setAddrWindow = /** @suppress {undefinedVars, duplicate} @this{Object} */function(xs, ys, w, h) {
  var self = this.ptr;
  if (xs && typeof xs === 'object') xs = xs.ptr;
  if (ys && typeof ys === 'object') ys = ys.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  _emscripten_bind_TFT_eSPI_setAddrWindow_4(self, xs, ys, w, h);
};;

TFT_eSPI.prototype['setViewport'] = TFT_eSPI.prototype.setViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, vpDatum) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (vpDatum && typeof vpDatum === 'object') vpDatum = vpDatum.ptr;
  if (vpDatum === undefined) { _emscripten_bind_TFT_eSPI_setViewport_4(self, x, y, w, h);  return }
  _emscripten_bind_TFT_eSPI_setViewport_5(self, x, y, w, h, vpDatum);
};;

TFT_eSPI.prototype['checkViewport'] = TFT_eSPI.prototype.checkViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  return !!(_emscripten_bind_TFT_eSPI_checkViewport_4(self, x, y, w, h));
};;

TFT_eSPI.prototype['getViewportX'] = TFT_eSPI.prototype.getViewportX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getViewportX_0(self);
};;

TFT_eSPI.prototype['getViewportY'] = TFT_eSPI.prototype.getViewportY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getViewportY_0(self);
};;

TFT_eSPI.prototype['getViewportWidth'] = TFT_eSPI.prototype.getViewportWidth = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getViewportWidth_0(self);
};;

TFT_eSPI.prototype['getViewportHeight'] = TFT_eSPI.prototype.getViewportHeight = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getViewportHeight_0(self);
};;

TFT_eSPI.prototype['getViewportDatum'] = TFT_eSPI.prototype.getViewportDatum = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TFT_eSPI_getViewportDatum_0(self));
};;

TFT_eSPI.prototype['frameViewport'] = TFT_eSPI.prototype.frameViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color, w) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  _emscripten_bind_TFT_eSPI_frameViewport_2(self, color, w);
};;

TFT_eSPI.prototype['resetViewport'] = TFT_eSPI.prototype.resetViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSPI_resetViewport_0(self);
};;

TFT_eSPI.prototype['pushColors'] = TFT_eSPI.prototype.pushColors = /** @suppress {undefinedVars, duplicate} @this{Object} */function(data, len, swap) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof data == 'object') { data = ensureInt16(data); }
  if (len && typeof len === 'object') len = len.ptr;
  if (swap && typeof swap === 'object') swap = swap.ptr;
  if (swap === undefined) { _emscripten_bind_TFT_eSPI_pushColors_2(self, data, len);  return }
  _emscripten_bind_TFT_eSPI_pushColors_3(self, data, len, swap);
};;

TFT_eSPI.prototype['pushBlock'] = TFT_eSPI.prototype.pushBlock = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color, len) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (len && typeof len === 'object') len = len.ptr;
  _emscripten_bind_TFT_eSPI_pushBlock_2(self, color, len);
};;

TFT_eSPI.prototype['pushPixels'] = TFT_eSPI.prototype.pushPixels = /** @suppress {undefinedVars, duplicate} @this{Object} */function(data_in, len) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof data_in == 'object') { data_in = ensureInt8(data_in); }
  if (len && typeof len === 'object') len = len.ptr;
  _emscripten_bind_TFT_eSPI_pushPixels_2(self, data_in, len);
};;

TFT_eSPI.prototype['fillScreen'] = TFT_eSPI.prototype.fillScreen = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillScreen_1(self, color);
};;

TFT_eSPI.prototype['drawRect'] = TFT_eSPI.prototype.drawRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawRect_5(self, x, y, w, h, color);
};;

TFT_eSPI.prototype['drawRoundRect'] = TFT_eSPI.prototype.drawRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, radius, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawRoundRect_6(self, x, y, w, h, radius, color);
};;

TFT_eSPI.prototype['fillRoundRect'] = TFT_eSPI.prototype.fillRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, radius, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillRoundRect_6(self, x, y, w, h, radius, color);
};;

TFT_eSPI.prototype['fillRectVGradient'] = TFT_eSPI.prototype.fillRectVGradient = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color1, color2) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color1 && typeof color1 === 'object') color1 = color1.ptr;
  if (color2 && typeof color2 === 'object') color2 = color2.ptr;
  _emscripten_bind_TFT_eSPI_fillRectVGradient_6(self, x, y, w, h, color1, color2);
};;

TFT_eSPI.prototype['fillRectHGradient'] = TFT_eSPI.prototype.fillRectHGradient = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color1, color2) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color1 && typeof color1 === 'object') color1 = color1.ptr;
  if (color2 && typeof color2 === 'object') color2 = color2.ptr;
  _emscripten_bind_TFT_eSPI_fillRectHGradient_6(self, x, y, w, h, color1, color2);
};;

TFT_eSPI.prototype['drawCircle'] = TFT_eSPI.prototype.drawCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawCircle_4(self, x, y, r, color);
};;

TFT_eSPI.prototype['drawCircleHelper'] = TFT_eSPI.prototype.drawCircleHelper = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, cornername, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (cornername && typeof cornername === 'object') cornername = cornername.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawCircleHelper_5(self, x, y, r, cornername, color);
};;

TFT_eSPI.prototype['fillCircle'] = TFT_eSPI.prototype.fillCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillCircle_4(self, x, y, r, color);
};;

TFT_eSPI.prototype['fillCircleHelper'] = TFT_eSPI.prototype.fillCircleHelper = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, cornername, delta, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (cornername && typeof cornername === 'object') cornername = cornername.ptr;
  if (delta && typeof delta === 'object') delta = delta.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillCircleHelper_6(self, x, y, r, cornername, delta, color);
};;

TFT_eSPI.prototype['drawEllipse'] = TFT_eSPI.prototype.drawEllipse = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, rx, ry, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (rx && typeof rx === 'object') rx = rx.ptr;
  if (ry && typeof ry === 'object') ry = ry.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawEllipse_5(self, x, y, rx, ry, color);
};;

TFT_eSPI.prototype['fillEllipse'] = TFT_eSPI.prototype.fillEllipse = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, rx, ry, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (rx && typeof rx === 'object') rx = rx.ptr;
  if (ry && typeof ry === 'object') ry = ry.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillEllipse_5(self, x, y, rx, ry, color);
};;

TFT_eSPI.prototype['drawTriangle'] = TFT_eSPI.prototype.drawTriangle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x1, y1, x2, y2, x3, y3, color) {
  var self = this.ptr;
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  if (x3 && typeof x3 === 'object') x3 = x3.ptr;
  if (y3 && typeof y3 === 'object') y3 = y3.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_drawTriangle_7(self, x1, y1, x2, y2, x3, y3, color);
};;

TFT_eSPI.prototype['fillTriangle'] = TFT_eSPI.prototype.fillTriangle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x1, y1, x2, y2, x3, y3, color) {
  var self = this.ptr;
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  if (x3 && typeof x3 === 'object') x3 = x3.ptr;
  if (y3 && typeof y3 === 'object') y3 = y3.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSPI_fillTriangle_7(self, x1, y1, x2, y2, x3, y3, color);
};;

TFT_eSPI.prototype['drawSmoothArc'] = TFT_eSPI.prototype.drawSmoothArc = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (ir && typeof ir === 'object') ir = ir.ptr;
  if (startAngle && typeof startAngle === 'object') startAngle = startAngle.ptr;
  if (endAngle && typeof endAngle === 'object') endAngle = endAngle.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (roundEnds && typeof roundEnds === 'object') roundEnds = roundEnds.ptr;
  if (roundEnds === undefined) { _emscripten_bind_TFT_eSPI_drawSmoothArc_8(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color);  return }
  _emscripten_bind_TFT_eSPI_drawSmoothArc_9(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds);
};;

TFT_eSPI.prototype['drawArc'] = TFT_eSPI.prototype.drawArc = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (ir && typeof ir === 'object') ir = ir.ptr;
  if (startAngle && typeof startAngle === 'object') startAngle = startAngle.ptr;
  if (endAngle && typeof endAngle === 'object') endAngle = endAngle.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (smoothArc && typeof smoothArc === 'object') smoothArc = smoothArc.ptr;
  if (smoothArc === undefined) { _emscripten_bind_TFT_eSPI_drawArc_8(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color);  return }
  _emscripten_bind_TFT_eSPI_drawArc_9(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc);
};;

TFT_eSPI.prototype['drawSmoothCircle'] = TFT_eSPI.prototype.drawSmoothCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, fg_color, bg_color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  _emscripten_bind_TFT_eSPI_drawSmoothCircle_5(self, x, y, r, fg_color, bg_color);
};;

TFT_eSPI.prototype['fillSmoothCircle'] = TFT_eSPI.prototype.fillSmoothCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, color, bg_color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSPI_fillSmoothCircle_4(self, x, y, r, color);  return }
  _emscripten_bind_TFT_eSPI_fillSmoothCircle_5(self, x, y, r, color, bg_color);
};;

TFT_eSPI.prototype['drawSmoothRoundRect'] = TFT_eSPI.prototype.drawSmoothRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, ir, w, h, fg_color, bg_color, quadrants) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (ir && typeof ir === 'object') ir = ir.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (quadrants && typeof quadrants === 'object') quadrants = quadrants.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSPI_drawSmoothRoundRect_7(self, x, y, r, ir, w, h, fg_color);  return }
  if (quadrants === undefined) { _emscripten_bind_TFT_eSPI_drawSmoothRoundRect_8(self, x, y, r, ir, w, h, fg_color, bg_color);  return }
  _emscripten_bind_TFT_eSPI_drawSmoothRoundRect_9(self, x, y, r, ir, w, h, fg_color, bg_color, quadrants);
};;

TFT_eSPI.prototype['fillSmoothRoundRect'] = TFT_eSPI.prototype.fillSmoothRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, radius, color, bg_color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSPI_fillSmoothRoundRect_6(self, x, y, w, h, radius, color);  return }
  _emscripten_bind_TFT_eSPI_fillSmoothRoundRect_7(self, x, y, w, h, radius, color, bg_color);
};;

TFT_eSPI.prototype['drawSpot'] = TFT_eSPI.prototype.drawSpot = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ax, ay, r, fg_color, bg_color) {
  var self = this.ptr;
  if (ax && typeof ax === 'object') ax = ax.ptr;
  if (ay && typeof ay === 'object') ay = ay.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSPI_drawSpot_4(self, ax, ay, r, fg_color);  return }
  _emscripten_bind_TFT_eSPI_drawSpot_5(self, ax, ay, r, fg_color, bg_color);
};;

TFT_eSPI.prototype['drawWideLine'] = TFT_eSPI.prototype.drawWideLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ax, ay, bx, by, wd, fg_color, bg_color) {
  var self = this.ptr;
  if (ax && typeof ax === 'object') ax = ax.ptr;
  if (ay && typeof ay === 'object') ay = ay.ptr;
  if (bx && typeof bx === 'object') bx = bx.ptr;
  if (by && typeof by === 'object') by = by.ptr;
  if (wd && typeof wd === 'object') wd = wd.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSPI_drawWideLine_6(self, ax, ay, bx, by, wd, fg_color);  return }
  _emscripten_bind_TFT_eSPI_drawWideLine_7(self, ax, ay, bx, by, wd, fg_color, bg_color);
};;

TFT_eSPI.prototype['drawWedgeLine'] = TFT_eSPI.prototype.drawWedgeLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ax, ay, bx, by, aw, bw, fg_color, bg_color) {
  var self = this.ptr;
  if (ax && typeof ax === 'object') ax = ax.ptr;
  if (ay && typeof ay === 'object') ay = ay.ptr;
  if (bx && typeof bx === 'object') bx = bx.ptr;
  if (by && typeof by === 'object') by = by.ptr;
  if (aw && typeof aw === 'object') aw = aw.ptr;
  if (bw && typeof bw === 'object') bw = bw.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSPI_drawWedgeLine_7(self, ax, ay, bx, by, aw, bw, fg_color);  return }
  _emscripten_bind_TFT_eSPI_drawWedgeLine_8(self, ax, ay, bx, by, aw, bw, fg_color, bg_color);
};;

TFT_eSPI.prototype['setSwapBytes'] = TFT_eSPI.prototype.setSwapBytes = /** @suppress {undefinedVars, duplicate} @this{Object} */function(swap) {
  var self = this.ptr;
  if (swap && typeof swap === 'object') swap = swap.ptr;
  _emscripten_bind_TFT_eSPI_setSwapBytes_1(self, swap);
};;

TFT_eSPI.prototype['getSwapBytes'] = TFT_eSPI.prototype.getSwapBytes = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TFT_eSPI_getSwapBytes_0(self));
};;

TFT_eSPI.prototype['drawBitmap'] = TFT_eSPI.prototype.drawBitmap = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, bitmap, w, h, fgcolor, bgcolor) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (typeof bitmap == 'object') { bitmap = ensureInt8(bitmap); }
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (fgcolor && typeof fgcolor === 'object') fgcolor = fgcolor.ptr;
  if (bgcolor && typeof bgcolor === 'object') bgcolor = bgcolor.ptr;
  if (bgcolor === undefined) { _emscripten_bind_TFT_eSPI_drawBitmap_6(self, x, y, bitmap, w, h, fgcolor);  return }
  _emscripten_bind_TFT_eSPI_drawBitmap_7(self, x, y, bitmap, w, h, fgcolor, bgcolor);
};;

TFT_eSPI.prototype['setPivot'] = TFT_eSPI.prototype.setPivot = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_TFT_eSPI_setPivot_2(self, x, y);
};;

TFT_eSPI.prototype['getPivotX'] = TFT_eSPI.prototype.getPivotX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getPivotX_0(self);
};;

TFT_eSPI.prototype['getPivotY'] = TFT_eSPI.prototype.getPivotY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getPivotY_0(self);
};;

TFT_eSPI.prototype['pushRect'] = TFT_eSPI.prototype.pushRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, data) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (typeof data == 'object') { data = ensureInt16(data); }
  _emscripten_bind_TFT_eSPI_pushRect_5(self, x, y, w, h, data);
};;

TFT_eSPI.prototype['pushImage'] = TFT_eSPI.prototype.pushImage = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, data, transparent) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (typeof data == 'object') { data = ensureInt16(data); }
  if (transparent && typeof transparent === 'object') transparent = transparent.ptr;
  if (transparent === undefined) { _emscripten_bind_TFT_eSPI_pushImage_5(self, x, y, w, h, data);  return }
  _emscripten_bind_TFT_eSPI_pushImage_6(self, x, y, w, h, data, transparent);
};;

TFT_eSPI.prototype['pushMaskedImage'] = TFT_eSPI.prototype.pushMaskedImage = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, img, mask) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (typeof img == 'object') { img = ensureInt16(img); }
  if (typeof mask == 'object') { mask = ensureInt8(mask); }
  _emscripten_bind_TFT_eSPI_pushMaskedImage_6(self, x, y, w, h, img, mask);
};;

TFT_eSPI.prototype['drawNumber'] = TFT_eSPI.prototype.drawNumber = /** @suppress {undefinedVars, duplicate} @this{Object} */function(intNumber, x, y, font) {
  var self = this.ptr;
  if (intNumber && typeof intNumber === 'object') intNumber = intNumber.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSPI_drawNumber_3(self, intNumber, x, y) }
  return _emscripten_bind_TFT_eSPI_drawNumber_4(self, intNumber, x, y, font);
};;

TFT_eSPI.prototype['drawFloat'] = TFT_eSPI.prototype.drawFloat = /** @suppress {undefinedVars, duplicate} @this{Object} */function(floatNumber, decimal, x, y, font) {
  var self = this.ptr;
  if (floatNumber && typeof floatNumber === 'object') floatNumber = floatNumber.ptr;
  if (decimal && typeof decimal === 'object') decimal = decimal.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSPI_drawFloat_4(self, floatNumber, decimal, x, y) }
  return _emscripten_bind_TFT_eSPI_drawFloat_5(self, floatNumber, decimal, x, y, font);
};;

TFT_eSPI.prototype['drawString'] = TFT_eSPI.prototype.drawString = /** @suppress {undefinedVars, duplicate} @this{Object} */function(string, x, y, font) {
  var self = this.ptr;
  ensureCache.prepare();
  if (string && typeof string === 'object') string = string.ptr;
  else string = ensureString(string);
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSPI_drawString_3(self, string, x, y) }
  return _emscripten_bind_TFT_eSPI_drawString_4(self, string, x, y, font);
};;

TFT_eSPI.prototype['setCursor'] = TFT_eSPI.prototype.setCursor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, font) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { _emscripten_bind_TFT_eSPI_setCursor_2(self, x, y);  return }
  _emscripten_bind_TFT_eSPI_setCursor_3(self, x, y, font);
};;

TFT_eSPI.prototype['getCursorX'] = TFT_eSPI.prototype.getCursorX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getCursorX_0(self);
};;

TFT_eSPI.prototype['getCursorY'] = TFT_eSPI.prototype.getCursorY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getCursorY_0(self);
};;

TFT_eSPI.prototype['setTextColor'] = TFT_eSPI.prototype.setTextColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(fgcolor, bgcolor, bgfill) {
  var self = this.ptr;
  if (fgcolor && typeof fgcolor === 'object') fgcolor = fgcolor.ptr;
  if (bgcolor && typeof bgcolor === 'object') bgcolor = bgcolor.ptr;
  if (bgfill && typeof bgfill === 'object') bgfill = bgfill.ptr;
  if (bgcolor === undefined) { _emscripten_bind_TFT_eSPI_setTextColor_1(self, fgcolor);  return }
  if (bgfill === undefined) { _emscripten_bind_TFT_eSPI_setTextColor_2(self, fgcolor, bgcolor);  return }
  _emscripten_bind_TFT_eSPI_setTextColor_3(self, fgcolor, bgcolor, bgfill);
};;

TFT_eSPI.prototype['setTextSize'] = TFT_eSPI.prototype.setTextSize = /** @suppress {undefinedVars, duplicate} @this{Object} */function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_TFT_eSPI_setTextSize_1(self, size);
};;

TFT_eSPI.prototype['setTextWrap'] = TFT_eSPI.prototype.setTextWrap = /** @suppress {undefinedVars, duplicate} @this{Object} */function(wrapX, wrapY) {
  var self = this.ptr;
  if (wrapX && typeof wrapX === 'object') wrapX = wrapX.ptr;
  if (wrapY && typeof wrapY === 'object') wrapY = wrapY.ptr;
  if (wrapY === undefined) { _emscripten_bind_TFT_eSPI_setTextWrap_1(self, wrapX);  return }
  _emscripten_bind_TFT_eSPI_setTextWrap_2(self, wrapX, wrapY);
};;

TFT_eSPI.prototype['setTextDatum'] = TFT_eSPI.prototype.setTextDatum = /** @suppress {undefinedVars, duplicate} @this{Object} */function(datum) {
  var self = this.ptr;
  if (datum && typeof datum === 'object') datum = datum.ptr;
  _emscripten_bind_TFT_eSPI_setTextDatum_1(self, datum);
};;

TFT_eSPI.prototype['getTextDatum'] = TFT_eSPI.prototype.getTextDatum = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getTextDatum_0(self);
};;

TFT_eSPI.prototype['setTextPadding'] = TFT_eSPI.prototype.setTextPadding = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x_width) {
  var self = this.ptr;
  if (x_width && typeof x_width === 'object') x_width = x_width.ptr;
  _emscripten_bind_TFT_eSPI_setTextPadding_1(self, x_width);
};;

TFT_eSPI.prototype['getTextPadding'] = TFT_eSPI.prototype.getTextPadding = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSPI_getTextPadding_0(self);
};;

TFT_eSPI.prototype['setTextFont'] = TFT_eSPI.prototype.setTextFont = /** @suppress {undefinedVars, duplicate} @this{Object} */function(font) {
  var self = this.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  _emscripten_bind_TFT_eSPI_setTextFont_1(self, font);
};;

TFT_eSPI.prototype['textWidth'] = TFT_eSPI.prototype.textWidth = /** @suppress {undefinedVars, duplicate} @this{Object} */function(string, font) {
  var self = this.ptr;
  ensureCache.prepare();
  if (string && typeof string === 'object') string = string.ptr;
  else string = ensureString(string);
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSPI_textWidth_1(self, string) }
  return _emscripten_bind_TFT_eSPI_textWidth_2(self, string, font);
};;

TFT_eSPI.prototype['fontHeight'] = TFT_eSPI.prototype.fontHeight = /** @suppress {undefinedVars, duplicate} @this{Object} */function(font) {
  var self = this.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSPI_fontHeight_0(self) }
  return _emscripten_bind_TFT_eSPI_fontHeight_1(self, font);
};;

TFT_eSPI.prototype['color565'] = TFT_eSPI.prototype.color565 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(red, green, blue) {
  var self = this.ptr;
  if (red && typeof red === 'object') red = red.ptr;
  if (green && typeof green === 'object') green = green.ptr;
  if (blue && typeof blue === 'object') blue = blue.ptr;
  return _emscripten_bind_TFT_eSPI_color565_3(self, red, green, blue);
};;

TFT_eSPI.prototype['color8to16'] = TFT_eSPI.prototype.color8to16 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color332) {
  var self = this.ptr;
  if (color332 && typeof color332 === 'object') color332 = color332.ptr;
  return _emscripten_bind_TFT_eSPI_color8to16_1(self, color332);
};;

TFT_eSPI.prototype['color16to8'] = TFT_eSPI.prototype.color16to8 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color565) {
  var self = this.ptr;
  if (color565 && typeof color565 === 'object') color565 = color565.ptr;
  return _emscripten_bind_TFT_eSPI_color16to8_1(self, color565);
};;

TFT_eSPI.prototype['color16to24'] = TFT_eSPI.prototype.color16to24 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color565) {
  var self = this.ptr;
  if (color565 && typeof color565 === 'object') color565 = color565.ptr;
  return _emscripten_bind_TFT_eSPI_color16to24_1(self, color565);
};;

TFT_eSPI.prototype['color24to16'] = TFT_eSPI.prototype.color24to16 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color888) {
  var self = this.ptr;
  if (color888 && typeof color888 === 'object') color888 = color888.ptr;
  return _emscripten_bind_TFT_eSPI_color24to16_1(self, color888);
};;

TFT_eSPI.prototype['alphaBlend'] = TFT_eSPI.prototype.alphaBlend = /** @suppress {undefinedVars, duplicate} @this{Object} */function(alpha, fgc, bgc, dither) {
  var self = this.ptr;
  if (alpha && typeof alpha === 'object') alpha = alpha.ptr;
  if (fgc && typeof fgc === 'object') fgc = fgc.ptr;
  if (bgc && typeof bgc === 'object') bgc = bgc.ptr;
  if (dither && typeof dither === 'object') dither = dither.ptr;
  if (dither === undefined) { return _emscripten_bind_TFT_eSPI_alphaBlend_3(self, alpha, fgc, bgc) }
  return _emscripten_bind_TFT_eSPI_alphaBlend_4(self, alpha, fgc, bgc, dither);
};;

TFT_eSPI.prototype['alphaBlend24'] = TFT_eSPI.prototype.alphaBlend24 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(alpha, fgc, bgc, dither) {
  var self = this.ptr;
  if (alpha && typeof alpha === 'object') alpha = alpha.ptr;
  if (fgc && typeof fgc === 'object') fgc = fgc.ptr;
  if (bgc && typeof bgc === 'object') bgc = bgc.ptr;
  if (dither && typeof dither === 'object') dither = dither.ptr;
  if (dither === undefined) { return _emscripten_bind_TFT_eSPI_alphaBlend24_3(self, alpha, fgc, bgc) }
  return _emscripten_bind_TFT_eSPI_alphaBlend24_4(self, alpha, fgc, bgc, dither);
};;

TFT_eSPI.prototype['loadFont'] = TFT_eSPI.prototype.loadFont = /** @suppress {undefinedVars, duplicate} @this{Object} */function(array) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof array == 'object') { array = ensureInt8(array); }
  _emscripten_bind_TFT_eSPI_loadFont_1(self, array);
};;

TFT_eSPI.prototype['unloadFont'] = TFT_eSPI.prototype.unloadFont = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSPI_unloadFont_0(self);
};;

  TFT_eSPI.prototype['__destroy__'] = TFT_eSPI.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSPI___destroy___0(self);
};
// VoidPtr
/** @suppress {undefinedVars, duplicate} @this{Object} */function VoidPtr() { throw "cannot construct a VoidPtr, no constructor in IDL" }
VoidPtr.prototype = Object.create(WrapperObject.prototype);
VoidPtr.prototype.constructor = VoidPtr;
VoidPtr.prototype.__class__ = VoidPtr;
VoidPtr.__cache__ = {};
Module['VoidPtr'] = VoidPtr;

  VoidPtr.prototype['__destroy__'] = VoidPtr.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_VoidPtr___destroy___0(self);
};
// TFT_eSprite
/** @suppress {undefinedVars, duplicate} @this{Object} */function TFT_eSprite(tft) {
  if (tft && typeof tft === 'object') tft = tft.ptr;
  this.ptr = _emscripten_bind_TFT_eSprite_TFT_eSprite_1(tft);
  getCache(TFT_eSprite)[this.ptr] = this;
};;
TFT_eSprite.prototype = Object.create(TFT_eSPI.prototype);
TFT_eSprite.prototype.constructor = TFT_eSprite;
TFT_eSprite.prototype.__class__ = TFT_eSprite;
TFT_eSprite.__cache__ = {};
Module['TFT_eSprite'] = TFT_eSprite;

TFT_eSprite.prototype['createSprite'] = TFT_eSprite.prototype.createSprite = /** @suppress {undefinedVars, duplicate} @this{Object} */function(width, height, frames) {
  var self = this.ptr;
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  if (frames && typeof frames === 'object') frames = frames.ptr;
  if (frames === undefined) { _emscripten_bind_TFT_eSprite_createSprite_2(self, width, height);  return }
  _emscripten_bind_TFT_eSprite_createSprite_3(self, width, height, frames);
};;

TFT_eSprite.prototype['created'] = TFT_eSprite.prototype.created = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TFT_eSprite_created_0(self));
};;

TFT_eSprite.prototype['setColorDepth'] = TFT_eSprite.prototype.setColorDepth = /** @suppress {undefinedVars, duplicate} @this{Object} */function(b) {
  var self = this.ptr;
  if (b && typeof b === 'object') b = b.ptr;
  _emscripten_bind_TFT_eSprite_setColorDepth_1(self, b);
};;

TFT_eSprite.prototype['getColorDepth'] = TFT_eSprite.prototype.getColorDepth = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getColorDepth_0(self);
};;

TFT_eSprite.prototype['createPalette'] = TFT_eSprite.prototype.createPalette = /** @suppress {undefinedVars, duplicate} @this{Object} */function(palette, colors) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof palette == 'object') { palette = ensureInt16(palette); }
  if (colors && typeof colors === 'object') colors = colors.ptr;
  if (colors === undefined) { _emscripten_bind_TFT_eSprite_createPalette_1(self, palette);  return }
  _emscripten_bind_TFT_eSprite_createPalette_2(self, palette, colors);
};;

TFT_eSprite.prototype['setPaletteColor'] = TFT_eSprite.prototype.setPaletteColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(index, color) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_setPaletteColor_2(self, index, color);
};;

TFT_eSprite.prototype['getPaletteColor'] = TFT_eSprite.prototype.getPaletteColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(index) {
  var self = this.ptr;
  if (index && typeof index === 'object') index = index.ptr;
  return _emscripten_bind_TFT_eSprite_getPaletteColor_1(self, index);
};;

TFT_eSprite.prototype['setBitmapColor'] = TFT_eSprite.prototype.setBitmapColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(fg, bg) {
  var self = this.ptr;
  if (fg && typeof fg === 'object') fg = fg.ptr;
  if (bg && typeof bg === 'object') bg = bg.ptr;
  _emscripten_bind_TFT_eSprite_setBitmapColor_2(self, fg, bg);
};;

TFT_eSprite.prototype['fillSprite'] = TFT_eSprite.prototype.fillSprite = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillSprite_1(self, color);
};;

TFT_eSprite.prototype['setScrollRect'] = TFT_eSprite.prototype.setScrollRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (color === undefined) { _emscripten_bind_TFT_eSprite_setScrollRect_4(self, x, y, w, h);  return }
  _emscripten_bind_TFT_eSprite_setScrollRect_5(self, x, y, w, h, color);
};;

TFT_eSprite.prototype['scroll'] = TFT_eSprite.prototype.scroll = /** @suppress {undefinedVars, duplicate} @this{Object} */function(dx, dy) {
  var self = this.ptr;
  if (dx && typeof dx === 'object') dx = dx.ptr;
  if (dy && typeof dy === 'object') dy = dy.ptr;
  if (dy === undefined) { _emscripten_bind_TFT_eSprite_scroll_1(self, dx);  return }
  _emscripten_bind_TFT_eSprite_scroll_2(self, dx, dy);
};;

TFT_eSprite.prototype['pushRotated'] = TFT_eSprite.prototype.pushRotated = /** @suppress {undefinedVars, duplicate} @this{Object} */function(spr, angle, transp) {
  var self = this.ptr;
  if (spr && typeof spr === 'object') spr = spr.ptr;
  if (angle && typeof angle === 'object') angle = angle.ptr;
  if (transp && typeof transp === 'object') transp = transp.ptr;
  if (transp === undefined) { return !!(_emscripten_bind_TFT_eSprite_pushRotated_2(self, spr, angle)) }
  return !!(_emscripten_bind_TFT_eSprite_pushRotated_3(self, spr, angle, transp));
};;

TFT_eSprite.prototype['pushSprite'] = TFT_eSprite.prototype.pushSprite = /** @suppress {undefinedVars, duplicate} @this{Object} */function(tx, ty, sx, sy, sw, sh) {
  var self = this.ptr;
  if (tx && typeof tx === 'object') tx = tx.ptr;
  if (ty && typeof ty === 'object') ty = ty.ptr;
  if (sx && typeof sx === 'object') sx = sx.ptr;
  if (sy && typeof sy === 'object') sy = sy.ptr;
  if (sw && typeof sw === 'object') sw = sw.ptr;
  if (sh && typeof sh === 'object') sh = sh.ptr;
  return !!(_emscripten_bind_TFT_eSprite_pushSprite_6(self, tx, ty, sx, sy, sw, sh));
};;

TFT_eSprite.prototype['pushToSprite'] = TFT_eSprite.prototype.pushToSprite = /** @suppress {undefinedVars, duplicate} @this{Object} */function(dspr, x, y, transparent) {
  var self = this.ptr;
  if (dspr && typeof dspr === 'object') dspr = dspr.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (transparent && typeof transparent === 'object') transparent = transparent.ptr;
  if (transparent === undefined) { return !!(_emscripten_bind_TFT_eSprite_pushToSprite_3(self, dspr, x, y)) }
  return !!(_emscripten_bind_TFT_eSprite_pushToSprite_4(self, dspr, x, y, transparent));
};;

TFT_eSprite.prototype['printToSprite'] = TFT_eSprite.prototype.printToSprite = /** @suppress {undefinedVars, duplicate} @this{Object} */function(string) {
  var self = this.ptr;
  ensureCache.prepare();
  if (string && typeof string === 'object') string = string.ptr;
  else string = ensureString(string);
  _emscripten_bind_TFT_eSprite_printToSprite_1(self, string);
};;

TFT_eSprite.prototype['init'] = TFT_eSprite.prototype.init = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSprite_init_0(self);
};;

TFT_eSprite.prototype['drawPixel'] = TFT_eSprite.prototype.drawPixel = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawPixel_3(self, x, y, color);
};;

TFT_eSprite.prototype['drawChar'] = TFT_eSprite.prototype.drawChar = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, c, color, bg, size) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (c && typeof c === 'object') c = c.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (bg && typeof bg === 'object') bg = bg.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  if (color === undefined) { _emscripten_bind_TFT_eSprite_drawChar_3(self, x, y, c);  return }
  if (bg === undefined) { _emscripten_bind_TFT_eSprite_drawChar_4(self, x, y, c, color);  return }
  if (size === undefined) { _emscripten_bind_TFT_eSprite_drawChar_5(self, x, y, c, color, bg);  return }
  _emscripten_bind_TFT_eSprite_drawChar_6(self, x, y, c, color, bg, size);
};;

TFT_eSprite.prototype['drawLine'] = TFT_eSprite.prototype.drawLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(xs, ys, xe, ye, color) {
  var self = this.ptr;
  if (xs && typeof xs === 'object') xs = xs.ptr;
  if (ys && typeof ys === 'object') ys = ys.ptr;
  if (xe && typeof xe === 'object') xe = xe.ptr;
  if (ye && typeof ye === 'object') ye = ye.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawLine_5(self, xs, ys, xe, ye, color);
};;

TFT_eSprite.prototype['drawFastVLine'] = TFT_eSprite.prototype.drawFastVLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawFastVLine_4(self, x, y, h, color);
};;

TFT_eSprite.prototype['drawFastHLine'] = TFT_eSprite.prototype.drawFastHLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawFastHLine_4(self, x, y, w, color);
};;

TFT_eSprite.prototype['fillRect'] = TFT_eSprite.prototype.fillRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillRect_5(self, x, y, w, h, color);
};;

TFT_eSprite.prototype['height'] = TFT_eSprite.prototype.height = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_height_0(self);
};;

TFT_eSprite.prototype['width'] = TFT_eSprite.prototype.width = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_width_0(self);
};;

TFT_eSprite.prototype['readPixel'] = TFT_eSprite.prototype.readPixel = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  return _emscripten_bind_TFT_eSprite_readPixel_2(self, x, y);
};;

TFT_eSprite.prototype['setWindow'] = TFT_eSprite.prototype.setWindow = /** @suppress {undefinedVars, duplicate} @this{Object} */function(xs, ys, xe, ye) {
  var self = this.ptr;
  if (xs && typeof xs === 'object') xs = xs.ptr;
  if (ys && typeof ys === 'object') ys = ys.ptr;
  if (xe && typeof xe === 'object') xe = xe.ptr;
  if (ye && typeof ye === 'object') ye = ye.ptr;
  _emscripten_bind_TFT_eSprite_setWindow_4(self, xs, ys, xe, ye);
};;

TFT_eSprite.prototype['pushColor'] = TFT_eSprite.prototype.pushColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color, len) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (len && typeof len === 'object') len = len.ptr;
  if (len === undefined) { _emscripten_bind_TFT_eSprite_pushColor_1(self, color);  return }
  _emscripten_bind_TFT_eSprite_pushColor_2(self, color, len);
};;

TFT_eSprite.prototype['setRotation'] = TFT_eSprite.prototype.setRotation = /** @suppress {undefinedVars, duplicate} @this{Object} */function(r) {
  var self = this.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  _emscripten_bind_TFT_eSprite_setRotation_1(self, r);
};;

TFT_eSprite.prototype['getRotation'] = TFT_eSprite.prototype.getRotation = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getRotation_0(self);
};;

TFT_eSprite.prototype['setOrigin'] = TFT_eSprite.prototype.setOrigin = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_TFT_eSprite_setOrigin_2(self, x, y);
};;

TFT_eSprite.prototype['getOriginX'] = TFT_eSprite.prototype.getOriginX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getOriginX_0(self);
};;

TFT_eSprite.prototype['getOriginY'] = TFT_eSprite.prototype.getOriginY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getOriginY_0(self);
};;

TFT_eSprite.prototype['invertDisplay'] = TFT_eSprite.prototype.invertDisplay = /** @suppress {undefinedVars, duplicate} @this{Object} */function(i) {
  var self = this.ptr;
  if (i && typeof i === 'object') i = i.ptr;
  _emscripten_bind_TFT_eSprite_invertDisplay_1(self, i);
};;

TFT_eSprite.prototype['setAddrWindow'] = TFT_eSprite.prototype.setAddrWindow = /** @suppress {undefinedVars, duplicate} @this{Object} */function(xs, ys, w, h) {
  var self = this.ptr;
  if (xs && typeof xs === 'object') xs = xs.ptr;
  if (ys && typeof ys === 'object') ys = ys.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  _emscripten_bind_TFT_eSprite_setAddrWindow_4(self, xs, ys, w, h);
};;

TFT_eSprite.prototype['setViewport'] = TFT_eSprite.prototype.setViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, vpDatum) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (vpDatum && typeof vpDatum === 'object') vpDatum = vpDatum.ptr;
  if (vpDatum === undefined) { _emscripten_bind_TFT_eSprite_setViewport_4(self, x, y, w, h);  return }
  _emscripten_bind_TFT_eSprite_setViewport_5(self, x, y, w, h, vpDatum);
};;

TFT_eSprite.prototype['checkViewport'] = TFT_eSprite.prototype.checkViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  return !!(_emscripten_bind_TFT_eSprite_checkViewport_4(self, x, y, w, h));
};;

TFT_eSprite.prototype['getViewportX'] = TFT_eSprite.prototype.getViewportX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getViewportX_0(self);
};;

TFT_eSprite.prototype['getViewportY'] = TFT_eSprite.prototype.getViewportY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getViewportY_0(self);
};;

TFT_eSprite.prototype['getViewportWidth'] = TFT_eSprite.prototype.getViewportWidth = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getViewportWidth_0(self);
};;

TFT_eSprite.prototype['getViewportHeight'] = TFT_eSprite.prototype.getViewportHeight = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getViewportHeight_0(self);
};;

TFT_eSprite.prototype['getViewportDatum'] = TFT_eSprite.prototype.getViewportDatum = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TFT_eSprite_getViewportDatum_0(self));
};;

TFT_eSprite.prototype['frameViewport'] = TFT_eSprite.prototype.frameViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color, w) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  _emscripten_bind_TFT_eSprite_frameViewport_2(self, color, w);
};;

TFT_eSprite.prototype['resetViewport'] = TFT_eSprite.prototype.resetViewport = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSprite_resetViewport_0(self);
};;

TFT_eSprite.prototype['pushColors'] = TFT_eSprite.prototype.pushColors = /** @suppress {undefinedVars, duplicate} @this{Object} */function(data, len, swap) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof data == 'object') { data = ensureInt16(data); }
  if (len && typeof len === 'object') len = len.ptr;
  if (swap && typeof swap === 'object') swap = swap.ptr;
  if (swap === undefined) { _emscripten_bind_TFT_eSprite_pushColors_2(self, data, len);  return }
  _emscripten_bind_TFT_eSprite_pushColors_3(self, data, len, swap);
};;

TFT_eSprite.prototype['pushBlock'] = TFT_eSprite.prototype.pushBlock = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color, len) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (len && typeof len === 'object') len = len.ptr;
  _emscripten_bind_TFT_eSprite_pushBlock_2(self, color, len);
};;

TFT_eSprite.prototype['pushPixels'] = TFT_eSprite.prototype.pushPixels = /** @suppress {undefinedVars, duplicate} @this{Object} */function(data_in, len) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof data_in == 'object') { data_in = ensureInt8(data_in); }
  if (len && typeof len === 'object') len = len.ptr;
  _emscripten_bind_TFT_eSprite_pushPixels_2(self, data_in, len);
};;

TFT_eSprite.prototype['fillScreen'] = TFT_eSprite.prototype.fillScreen = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color) {
  var self = this.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillScreen_1(self, color);
};;

TFT_eSprite.prototype['drawRect'] = TFT_eSprite.prototype.drawRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawRect_5(self, x, y, w, h, color);
};;

TFT_eSprite.prototype['drawRoundRect'] = TFT_eSprite.prototype.drawRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, radius, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawRoundRect_6(self, x, y, w, h, radius, color);
};;

TFT_eSprite.prototype['fillRoundRect'] = TFT_eSprite.prototype.fillRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, radius, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillRoundRect_6(self, x, y, w, h, radius, color);
};;

TFT_eSprite.prototype['fillRectVGradient'] = TFT_eSprite.prototype.fillRectVGradient = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color1, color2) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color1 && typeof color1 === 'object') color1 = color1.ptr;
  if (color2 && typeof color2 === 'object') color2 = color2.ptr;
  _emscripten_bind_TFT_eSprite_fillRectVGradient_6(self, x, y, w, h, color1, color2);
};;

TFT_eSprite.prototype['fillRectHGradient'] = TFT_eSprite.prototype.fillRectHGradient = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, color1, color2) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (color1 && typeof color1 === 'object') color1 = color1.ptr;
  if (color2 && typeof color2 === 'object') color2 = color2.ptr;
  _emscripten_bind_TFT_eSprite_fillRectHGradient_6(self, x, y, w, h, color1, color2);
};;

TFT_eSprite.prototype['drawCircle'] = TFT_eSprite.prototype.drawCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawCircle_4(self, x, y, r, color);
};;

TFT_eSprite.prototype['drawCircleHelper'] = TFT_eSprite.prototype.drawCircleHelper = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, cornername, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (cornername && typeof cornername === 'object') cornername = cornername.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawCircleHelper_5(self, x, y, r, cornername, color);
};;

TFT_eSprite.prototype['fillCircle'] = TFT_eSprite.prototype.fillCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillCircle_4(self, x, y, r, color);
};;

TFT_eSprite.prototype['fillCircleHelper'] = TFT_eSprite.prototype.fillCircleHelper = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, cornername, delta, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (cornername && typeof cornername === 'object') cornername = cornername.ptr;
  if (delta && typeof delta === 'object') delta = delta.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillCircleHelper_6(self, x, y, r, cornername, delta, color);
};;

TFT_eSprite.prototype['drawEllipse'] = TFT_eSprite.prototype.drawEllipse = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, rx, ry, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (rx && typeof rx === 'object') rx = rx.ptr;
  if (ry && typeof ry === 'object') ry = ry.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawEllipse_5(self, x, y, rx, ry, color);
};;

TFT_eSprite.prototype['fillEllipse'] = TFT_eSprite.prototype.fillEllipse = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, rx, ry, color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (rx && typeof rx === 'object') rx = rx.ptr;
  if (ry && typeof ry === 'object') ry = ry.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillEllipse_5(self, x, y, rx, ry, color);
};;

TFT_eSprite.prototype['drawTriangle'] = TFT_eSprite.prototype.drawTriangle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x1, y1, x2, y2, x3, y3, color) {
  var self = this.ptr;
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  if (x3 && typeof x3 === 'object') x3 = x3.ptr;
  if (y3 && typeof y3 === 'object') y3 = y3.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_drawTriangle_7(self, x1, y1, x2, y2, x3, y3, color);
};;

TFT_eSprite.prototype['fillTriangle'] = TFT_eSprite.prototype.fillTriangle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x1, y1, x2, y2, x3, y3, color) {
  var self = this.ptr;
  if (x1 && typeof x1 === 'object') x1 = x1.ptr;
  if (y1 && typeof y1 === 'object') y1 = y1.ptr;
  if (x2 && typeof x2 === 'object') x2 = x2.ptr;
  if (y2 && typeof y2 === 'object') y2 = y2.ptr;
  if (x3 && typeof x3 === 'object') x3 = x3.ptr;
  if (y3 && typeof y3 === 'object') y3 = y3.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  _emscripten_bind_TFT_eSprite_fillTriangle_7(self, x1, y1, x2, y2, x3, y3, color);
};;

TFT_eSprite.prototype['drawSmoothArc'] = TFT_eSprite.prototype.drawSmoothArc = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (ir && typeof ir === 'object') ir = ir.ptr;
  if (startAngle && typeof startAngle === 'object') startAngle = startAngle.ptr;
  if (endAngle && typeof endAngle === 'object') endAngle = endAngle.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (roundEnds && typeof roundEnds === 'object') roundEnds = roundEnds.ptr;
  if (roundEnds === undefined) { _emscripten_bind_TFT_eSprite_drawSmoothArc_8(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color);  return }
  _emscripten_bind_TFT_eSprite_drawSmoothArc_9(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color, roundEnds);
};;

TFT_eSprite.prototype['drawArc'] = TFT_eSprite.prototype.drawArc = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (ir && typeof ir === 'object') ir = ir.ptr;
  if (startAngle && typeof startAngle === 'object') startAngle = startAngle.ptr;
  if (endAngle && typeof endAngle === 'object') endAngle = endAngle.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (smoothArc && typeof smoothArc === 'object') smoothArc = smoothArc.ptr;
  if (smoothArc === undefined) { _emscripten_bind_TFT_eSprite_drawArc_8(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color);  return }
  _emscripten_bind_TFT_eSprite_drawArc_9(self, x, y, r, ir, startAngle, endAngle, fg_color, bg_color, smoothArc);
};;

TFT_eSprite.prototype['drawSmoothCircle'] = TFT_eSprite.prototype.drawSmoothCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, fg_color, bg_color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  _emscripten_bind_TFT_eSprite_drawSmoothCircle_5(self, x, y, r, fg_color, bg_color);
};;

TFT_eSprite.prototype['fillSmoothCircle'] = TFT_eSprite.prototype.fillSmoothCircle = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, color, bg_color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSprite_fillSmoothCircle_4(self, x, y, r, color);  return }
  _emscripten_bind_TFT_eSprite_fillSmoothCircle_5(self, x, y, r, color, bg_color);
};;

TFT_eSprite.prototype['drawSmoothRoundRect'] = TFT_eSprite.prototype.drawSmoothRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, r, ir, w, h, fg_color, bg_color, quadrants) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (ir && typeof ir === 'object') ir = ir.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (quadrants && typeof quadrants === 'object') quadrants = quadrants.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSprite_drawSmoothRoundRect_7(self, x, y, r, ir, w, h, fg_color);  return }
  if (quadrants === undefined) { _emscripten_bind_TFT_eSprite_drawSmoothRoundRect_8(self, x, y, r, ir, w, h, fg_color, bg_color);  return }
  _emscripten_bind_TFT_eSprite_drawSmoothRoundRect_9(self, x, y, r, ir, w, h, fg_color, bg_color, quadrants);
};;

TFT_eSprite.prototype['fillSmoothRoundRect'] = TFT_eSprite.prototype.fillSmoothRoundRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, radius, color, bg_color) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (radius && typeof radius === 'object') radius = radius.ptr;
  if (color && typeof color === 'object') color = color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSprite_fillSmoothRoundRect_6(self, x, y, w, h, radius, color);  return }
  _emscripten_bind_TFT_eSprite_fillSmoothRoundRect_7(self, x, y, w, h, radius, color, bg_color);
};;

TFT_eSprite.prototype['drawSpot'] = TFT_eSprite.prototype.drawSpot = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ax, ay, r, fg_color, bg_color) {
  var self = this.ptr;
  if (ax && typeof ax === 'object') ax = ax.ptr;
  if (ay && typeof ay === 'object') ay = ay.ptr;
  if (r && typeof r === 'object') r = r.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSprite_drawSpot_4(self, ax, ay, r, fg_color);  return }
  _emscripten_bind_TFT_eSprite_drawSpot_5(self, ax, ay, r, fg_color, bg_color);
};;

TFT_eSprite.prototype['drawWideLine'] = TFT_eSprite.prototype.drawWideLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ax, ay, bx, by, wd, fg_color, bg_color) {
  var self = this.ptr;
  if (ax && typeof ax === 'object') ax = ax.ptr;
  if (ay && typeof ay === 'object') ay = ay.ptr;
  if (bx && typeof bx === 'object') bx = bx.ptr;
  if (by && typeof by === 'object') by = by.ptr;
  if (wd && typeof wd === 'object') wd = wd.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSprite_drawWideLine_6(self, ax, ay, bx, by, wd, fg_color);  return }
  _emscripten_bind_TFT_eSprite_drawWideLine_7(self, ax, ay, bx, by, wd, fg_color, bg_color);
};;

TFT_eSprite.prototype['drawWedgeLine'] = TFT_eSprite.prototype.drawWedgeLine = /** @suppress {undefinedVars, duplicate} @this{Object} */function(ax, ay, bx, by, aw, bw, fg_color, bg_color) {
  var self = this.ptr;
  if (ax && typeof ax === 'object') ax = ax.ptr;
  if (ay && typeof ay === 'object') ay = ay.ptr;
  if (bx && typeof bx === 'object') bx = bx.ptr;
  if (by && typeof by === 'object') by = by.ptr;
  if (aw && typeof aw === 'object') aw = aw.ptr;
  if (bw && typeof bw === 'object') bw = bw.ptr;
  if (fg_color && typeof fg_color === 'object') fg_color = fg_color.ptr;
  if (bg_color && typeof bg_color === 'object') bg_color = bg_color.ptr;
  if (bg_color === undefined) { _emscripten_bind_TFT_eSprite_drawWedgeLine_7(self, ax, ay, bx, by, aw, bw, fg_color);  return }
  _emscripten_bind_TFT_eSprite_drawWedgeLine_8(self, ax, ay, bx, by, aw, bw, fg_color, bg_color);
};;

TFT_eSprite.prototype['setSwapBytes'] = TFT_eSprite.prototype.setSwapBytes = /** @suppress {undefinedVars, duplicate} @this{Object} */function(swap) {
  var self = this.ptr;
  if (swap && typeof swap === 'object') swap = swap.ptr;
  _emscripten_bind_TFT_eSprite_setSwapBytes_1(self, swap);
};;

TFT_eSprite.prototype['getSwapBytes'] = TFT_eSprite.prototype.getSwapBytes = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return !!(_emscripten_bind_TFT_eSprite_getSwapBytes_0(self));
};;

TFT_eSprite.prototype['drawBitmap'] = TFT_eSprite.prototype.drawBitmap = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, bitmap, w, h, fgcolor, bgcolor) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (typeof bitmap == 'object') { bitmap = ensureInt8(bitmap); }
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (fgcolor && typeof fgcolor === 'object') fgcolor = fgcolor.ptr;
  if (bgcolor && typeof bgcolor === 'object') bgcolor = bgcolor.ptr;
  if (bgcolor === undefined) { _emscripten_bind_TFT_eSprite_drawBitmap_6(self, x, y, bitmap, w, h, fgcolor);  return }
  _emscripten_bind_TFT_eSprite_drawBitmap_7(self, x, y, bitmap, w, h, fgcolor, bgcolor);
};;

TFT_eSprite.prototype['setPivot'] = TFT_eSprite.prototype.setPivot = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  _emscripten_bind_TFT_eSprite_setPivot_2(self, x, y);
};;

TFT_eSprite.prototype['getPivotX'] = TFT_eSprite.prototype.getPivotX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getPivotX_0(self);
};;

TFT_eSprite.prototype['getPivotY'] = TFT_eSprite.prototype.getPivotY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getPivotY_0(self);
};;

TFT_eSprite.prototype['pushRect'] = TFT_eSprite.prototype.pushRect = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, data) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (typeof data == 'object') { data = ensureInt16(data); }
  _emscripten_bind_TFT_eSprite_pushRect_5(self, x, y, w, h, data);
};;

TFT_eSprite.prototype['pushImage'] = TFT_eSprite.prototype.pushImage = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, data, transparent) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (typeof data == 'object') { data = ensureInt16(data); }
  if (transparent && typeof transparent === 'object') transparent = transparent.ptr;
  if (transparent === undefined) { _emscripten_bind_TFT_eSprite_pushImage_5(self, x, y, w, h, data);  return }
  _emscripten_bind_TFT_eSprite_pushImage_6(self, x, y, w, h, data, transparent);
};;

TFT_eSprite.prototype['pushMaskedImage'] = TFT_eSprite.prototype.pushMaskedImage = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, w, h, img, mask) {
  var self = this.ptr;
  ensureCache.prepare();
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (w && typeof w === 'object') w = w.ptr;
  if (h && typeof h === 'object') h = h.ptr;
  if (typeof img == 'object') { img = ensureInt16(img); }
  if (typeof mask == 'object') { mask = ensureInt8(mask); }
  _emscripten_bind_TFT_eSprite_pushMaskedImage_6(self, x, y, w, h, img, mask);
};;

TFT_eSprite.prototype['drawNumber'] = TFT_eSprite.prototype.drawNumber = /** @suppress {undefinedVars, duplicate} @this{Object} */function(intNumber, x, y, font) {
  var self = this.ptr;
  if (intNumber && typeof intNumber === 'object') intNumber = intNumber.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSprite_drawNumber_3(self, intNumber, x, y) }
  return _emscripten_bind_TFT_eSprite_drawNumber_4(self, intNumber, x, y, font);
};;

TFT_eSprite.prototype['drawFloat'] = TFT_eSprite.prototype.drawFloat = /** @suppress {undefinedVars, duplicate} @this{Object} */function(floatNumber, decimal, x, y, font) {
  var self = this.ptr;
  if (floatNumber && typeof floatNumber === 'object') floatNumber = floatNumber.ptr;
  if (decimal && typeof decimal === 'object') decimal = decimal.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSprite_drawFloat_4(self, floatNumber, decimal, x, y) }
  return _emscripten_bind_TFT_eSprite_drawFloat_5(self, floatNumber, decimal, x, y, font);
};;

TFT_eSprite.prototype['drawString'] = TFT_eSprite.prototype.drawString = /** @suppress {undefinedVars, duplicate} @this{Object} */function(string, x, y, font) {
  var self = this.ptr;
  ensureCache.prepare();
  if (string && typeof string === 'object') string = string.ptr;
  else string = ensureString(string);
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSprite_drawString_3(self, string, x, y) }
  return _emscripten_bind_TFT_eSprite_drawString_4(self, string, x, y, font);
};;

TFT_eSprite.prototype['setCursor'] = TFT_eSprite.prototype.setCursor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x, y, font) {
  var self = this.ptr;
  if (x && typeof x === 'object') x = x.ptr;
  if (y && typeof y === 'object') y = y.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { _emscripten_bind_TFT_eSprite_setCursor_2(self, x, y);  return }
  _emscripten_bind_TFT_eSprite_setCursor_3(self, x, y, font);
};;

TFT_eSprite.prototype['getCursorX'] = TFT_eSprite.prototype.getCursorX = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getCursorX_0(self);
};;

TFT_eSprite.prototype['getCursorY'] = TFT_eSprite.prototype.getCursorY = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getCursorY_0(self);
};;

TFT_eSprite.prototype['setTextColor'] = TFT_eSprite.prototype.setTextColor = /** @suppress {undefinedVars, duplicate} @this{Object} */function(fgcolor, bgcolor, bgfill) {
  var self = this.ptr;
  if (fgcolor && typeof fgcolor === 'object') fgcolor = fgcolor.ptr;
  if (bgcolor && typeof bgcolor === 'object') bgcolor = bgcolor.ptr;
  if (bgfill && typeof bgfill === 'object') bgfill = bgfill.ptr;
  if (bgcolor === undefined) { _emscripten_bind_TFT_eSprite_setTextColor_1(self, fgcolor);  return }
  if (bgfill === undefined) { _emscripten_bind_TFT_eSprite_setTextColor_2(self, fgcolor, bgcolor);  return }
  _emscripten_bind_TFT_eSprite_setTextColor_3(self, fgcolor, bgcolor, bgfill);
};;

TFT_eSprite.prototype['setTextSize'] = TFT_eSprite.prototype.setTextSize = /** @suppress {undefinedVars, duplicate} @this{Object} */function(size) {
  var self = this.ptr;
  if (size && typeof size === 'object') size = size.ptr;
  _emscripten_bind_TFT_eSprite_setTextSize_1(self, size);
};;

TFT_eSprite.prototype['setTextWrap'] = TFT_eSprite.prototype.setTextWrap = /** @suppress {undefinedVars, duplicate} @this{Object} */function(wrapX, wrapY) {
  var self = this.ptr;
  if (wrapX && typeof wrapX === 'object') wrapX = wrapX.ptr;
  if (wrapY && typeof wrapY === 'object') wrapY = wrapY.ptr;
  if (wrapY === undefined) { _emscripten_bind_TFT_eSprite_setTextWrap_1(self, wrapX);  return }
  _emscripten_bind_TFT_eSprite_setTextWrap_2(self, wrapX, wrapY);
};;

TFT_eSprite.prototype['setTextDatum'] = TFT_eSprite.prototype.setTextDatum = /** @suppress {undefinedVars, duplicate} @this{Object} */function(datum) {
  var self = this.ptr;
  if (datum && typeof datum === 'object') datum = datum.ptr;
  _emscripten_bind_TFT_eSprite_setTextDatum_1(self, datum);
};;

TFT_eSprite.prototype['getTextDatum'] = TFT_eSprite.prototype.getTextDatum = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getTextDatum_0(self);
};;

TFT_eSprite.prototype['setTextPadding'] = TFT_eSprite.prototype.setTextPadding = /** @suppress {undefinedVars, duplicate} @this{Object} */function(x_width) {
  var self = this.ptr;
  if (x_width && typeof x_width === 'object') x_width = x_width.ptr;
  _emscripten_bind_TFT_eSprite_setTextPadding_1(self, x_width);
};;

TFT_eSprite.prototype['getTextPadding'] = TFT_eSprite.prototype.getTextPadding = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  return _emscripten_bind_TFT_eSprite_getTextPadding_0(self);
};;

TFT_eSprite.prototype['setTextFont'] = TFT_eSprite.prototype.setTextFont = /** @suppress {undefinedVars, duplicate} @this{Object} */function(font) {
  var self = this.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  _emscripten_bind_TFT_eSprite_setTextFont_1(self, font);
};;

TFT_eSprite.prototype['textWidth'] = TFT_eSprite.prototype.textWidth = /** @suppress {undefinedVars, duplicate} @this{Object} */function(string, font) {
  var self = this.ptr;
  ensureCache.prepare();
  if (string && typeof string === 'object') string = string.ptr;
  else string = ensureString(string);
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSprite_textWidth_1(self, string) }
  return _emscripten_bind_TFT_eSprite_textWidth_2(self, string, font);
};;

TFT_eSprite.prototype['fontHeight'] = TFT_eSprite.prototype.fontHeight = /** @suppress {undefinedVars, duplicate} @this{Object} */function(font) {
  var self = this.ptr;
  if (font && typeof font === 'object') font = font.ptr;
  if (font === undefined) { return _emscripten_bind_TFT_eSprite_fontHeight_0(self) }
  return _emscripten_bind_TFT_eSprite_fontHeight_1(self, font);
};;

TFT_eSprite.prototype['color565'] = TFT_eSprite.prototype.color565 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(red, green, blue) {
  var self = this.ptr;
  if (red && typeof red === 'object') red = red.ptr;
  if (green && typeof green === 'object') green = green.ptr;
  if (blue && typeof blue === 'object') blue = blue.ptr;
  return _emscripten_bind_TFT_eSprite_color565_3(self, red, green, blue);
};;

TFT_eSprite.prototype['color8to16'] = TFT_eSprite.prototype.color8to16 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color332) {
  var self = this.ptr;
  if (color332 && typeof color332 === 'object') color332 = color332.ptr;
  return _emscripten_bind_TFT_eSprite_color8to16_1(self, color332);
};;

TFT_eSprite.prototype['color16to8'] = TFT_eSprite.prototype.color16to8 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color565) {
  var self = this.ptr;
  if (color565 && typeof color565 === 'object') color565 = color565.ptr;
  return _emscripten_bind_TFT_eSprite_color16to8_1(self, color565);
};;

TFT_eSprite.prototype['color16to24'] = TFT_eSprite.prototype.color16to24 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color565) {
  var self = this.ptr;
  if (color565 && typeof color565 === 'object') color565 = color565.ptr;
  return _emscripten_bind_TFT_eSprite_color16to24_1(self, color565);
};;

TFT_eSprite.prototype['color24to16'] = TFT_eSprite.prototype.color24to16 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(color888) {
  var self = this.ptr;
  if (color888 && typeof color888 === 'object') color888 = color888.ptr;
  return _emscripten_bind_TFT_eSprite_color24to16_1(self, color888);
};;

TFT_eSprite.prototype['alphaBlend'] = TFT_eSprite.prototype.alphaBlend = /** @suppress {undefinedVars, duplicate} @this{Object} */function(alpha, fgc, bgc, dither) {
  var self = this.ptr;
  if (alpha && typeof alpha === 'object') alpha = alpha.ptr;
  if (fgc && typeof fgc === 'object') fgc = fgc.ptr;
  if (bgc && typeof bgc === 'object') bgc = bgc.ptr;
  if (dither && typeof dither === 'object') dither = dither.ptr;
  if (dither === undefined) { return _emscripten_bind_TFT_eSprite_alphaBlend_3(self, alpha, fgc, bgc) }
  return _emscripten_bind_TFT_eSprite_alphaBlend_4(self, alpha, fgc, bgc, dither);
};;

TFT_eSprite.prototype['alphaBlend24'] = TFT_eSprite.prototype.alphaBlend24 = /** @suppress {undefinedVars, duplicate} @this{Object} */function(alpha, fgc, bgc, dither) {
  var self = this.ptr;
  if (alpha && typeof alpha === 'object') alpha = alpha.ptr;
  if (fgc && typeof fgc === 'object') fgc = fgc.ptr;
  if (bgc && typeof bgc === 'object') bgc = bgc.ptr;
  if (dither && typeof dither === 'object') dither = dither.ptr;
  if (dither === undefined) { return _emscripten_bind_TFT_eSprite_alphaBlend24_3(self, alpha, fgc, bgc) }
  return _emscripten_bind_TFT_eSprite_alphaBlend24_4(self, alpha, fgc, bgc, dither);
};;

TFT_eSprite.prototype['loadFont'] = TFT_eSprite.prototype.loadFont = /** @suppress {undefinedVars, duplicate} @this{Object} */function(array) {
  var self = this.ptr;
  ensureCache.prepare();
  if (typeof array == 'object') { array = ensureInt8(array); }
  _emscripten_bind_TFT_eSprite_loadFont_1(self, array);
};;

TFT_eSprite.prototype['unloadFont'] = TFT_eSprite.prototype.unloadFont = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSprite_unloadFont_0(self);
};;

  TFT_eSprite.prototype['__destroy__'] = TFT_eSprite.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_TFT_eSprite___destroy___0(self);
};
// DisplayContext
/** @suppress {undefinedVars, duplicate} @this{Object} */function DisplayContext(width, height) {
  if (width && typeof width === 'object') width = width.ptr;
  if (height && typeof height === 'object') height = height.ptr;
  this.ptr = _emscripten_bind_DisplayContext_DisplayContext_2(width, height);
  getCache(DisplayContext)[this.ptr] = this;
};;
DisplayContext.prototype = Object.create(WrapperObject.prototype);
DisplayContext.prototype.constructor = DisplayContext;
DisplayContext.prototype.__class__ = DisplayContext;
DisplayContext.__cache__ = {};
Module['DisplayContext'] = DisplayContext;

DisplayContext.prototype['DrawToScreen'] = DisplayContext.prototype.DrawToScreen = /** @suppress {undefinedVars, duplicate} @this{Object} */function(sprite) {
  var self = this.ptr;
  if (sprite && typeof sprite === 'object') sprite = sprite.ptr;
  _emscripten_bind_DisplayContext_DrawToScreen_1(self, sprite);
};;

  DisplayContext.prototype['__destroy__'] = DisplayContext.prototype.__destroy__ = /** @suppress {undefinedVars, duplicate} @this{Object} */function() {
  var self = this.ptr;
  _emscripten_bind_DisplayContext___destroy___0(self);
};