"use client";

import { useEffect, useRef } from 'react';

// A simple library to generate QR codes in the browser.
const qrcode = (() => {
  //---------------------------------------------------------------------
  //
  // QR Code Generator for JavaScript
  //
  // Copyright (c) 2009 Kazuhiko Arase
  //
  // URL: http://www.d-project.com/
  //
  // Licensed under the MIT license:
  //   http://www.opensource.org/licenses/mit-license.php
  //
  // The word 'QR Code' is registered trademark of
  // DENSO WAVE INCORPORATED
  //   http://www.denso-wave.com/qrcode/faqpatent-e.html
  //
  //---------------------------------------------------------------------

  const qrcode = function() {

    const _this = {
    };

    let _typeNumber = -1;
    let _errorCorrectionLevel = 2; // ErrorCorrectionLevel.H
    let _modules: boolean[][] | null = null;
    let _moduleCount = 0;

    const _PAD0 = 0xEC;
    const _PAD1 = 0x11;

    const _createBytes = (buffer: any, rsBlocks: any[]) => {
      let offset = 0;
      let maxDcCount = 0;
      let maxEcCount = 0;
      const dcdata = new Array(rsBlocks.length);
      const ecdata = new Array(rsBlocks.length);
      for (let r = 0; r < rsBlocks.length; r += 1) {
        const dcCount = rsBlocks[r].dataCount;
        const ecCount = rsBlocks[r].totalCount - dcCount;
        maxDcCount = Math.max(maxDcCount, dcCount);
        maxEcCount = Math.max(maxEcCount, ecCount);
        dcdata[r] = new Array(dcCount);
        for (let i = 0; i < dcdata[r].length; i += 1) {
          dcdata[r][i] = 0xff & buffer.getBuffer()[i + offset];
        }
        offset += dcCount;
        const rsPoly = _getErrorCorrectPolynomial(ecCount);
        const rawPoly = _polynomial(dcdata[r], rsPoly.getLength() - 1);
        const modPoly = rawPoly.mod(rsPoly);
        ecdata[r] = new Array(rsPoly.getLength() - 1);
        for (let i = 0; i < ecdata[r].length; i += 1) {
          const modIndex = i + modPoly.getLength() - ecdata[r].length;
          ecdata[r][i] = (modIndex >= 0)? modPoly.get(modIndex) : 0;
        }
      }
      let totalCodeCount = 0;
      for (let i = 0; i < rsBlocks.length; i += 1) {
        totalCodeCount += rsBlocks[i].totalCount;
      }
      const data = new Array(totalCodeCount);
      let index = 0;
      for (let i = 0; i < maxDcCount; i += 1) {
        for (let r = 0; r < rsBlocks.length; r += 1) {
          if (i < dcdata[r].length) {
            data[index] = dcdata[r][i];
            index += 1;
          }
        }
      }
      for (let i = 0; i < maxEcCount; i += 1) {
        for (let r = 0; r < rsBlocks.length; r += 1) {
          if (i < ecdata[r].length) {
            data[index] = ecdata[r][i];
            index += 1;
          }
        }
      }
      return data;
    };

    const _createData = (typeNumber: number, errorCorrectionLevel: number, data: string) => {
      const rsBlocks = _rsBlock.getRSBlocks(typeNumber, errorCorrectionLevel);
      const buffer = _bitBuffer();
      const qr8BitByte = _qr8BitByte(data);
      buffer.put(qr8BitByte.getMode(), 4);
      buffer.put(qr8BitByte.getLength(), _util.getLengthInBits(qr8BitByte.getMode(), typeNumber) );
      qr8BitByte.write(buffer);
      let bitLength = 0;
      for (let i = 0; i < rsBlocks.length; i += 1) {
        bitLength += rsBlocks[i].dataCount;
      }
      if (buffer.getLengthInBits() > bitLength * 8) {
        throw new Error('code length overflow. ('
          + buffer.getLengthInBits()
          + '>'
          + bitLength * 8
          + ')' );
      }
      if (buffer.getLengthInBits() + 4 <= bitLength * 8) {
        buffer.put(0, 4);
      }
      while (buffer.getLengthInBits() % 8 != 0) {
        buffer.putBit(false);
      }
      while (true) {
        if (buffer.getLengthInBits() >= bitLength * 8) {
          break;
        }
        buffer.put(_PAD0, 8);
        if (buffer.getLengthInBits() >= bitLength * 8) {
          break;
        }
        buffer.put(_PAD1, 8);
      }
      return _createBytes(buffer, rsBlocks);
    };

    _this.make = (data: string, options: any) => {

      _typeNumber = options.typeNumber;
      _errorCorrectionLevel = options.errorCorrectionLevel;

      _modules = null;
      _moduleCount = 0;

      const G15 = (1 << 10) | (1 << 8) | (1 << 5) | (1 << 4) | (1 << 2) | (1 << 1) | (1 << 0);
      const G15_MASK = (1 << 14) | (1 << 12) | (1 << 10) | (1 << 4) | (1 << 1);

      const _getBCHTypeInfo = (data: number) => {
        let d = data << 10;
        while (_getBCHDigit(d) - _getBCHDigit(G15) >= 0) {
          d ^= (G15 << (_getBCHDigit(d) - _getBCHDigit(G15) ) );
        }
        return ( (data << 10) | d) ^ G15_MASK;
      };

      const _getBCHDigit = (data: number) => {
        let digit = 0;
        while (data != 0) {
          digit += 1;
          data >>>= 1;
        }
        return digit;
      };

      const _setupTypeInfo = (test: boolean, maskPattern: number) => {
        const data = (_errorCorrectionLevel << 3) | maskPattern;
        const bits = _getBCHTypeInfo(data);
        for (let i = 0; i < 15; i += 1) {
          const mod = (!test && ( (bits >> i) & 1) == 1);
          if (i < 6) {
            _modules![i][8] = mod;
          } else if (i < 8) {
            _modules![i + 1][8] = mod;
          } else {
            _modules![_moduleCount - 15 + i][8] = mod;
          }
        }
        for (let i = 0; i < 15; i += 1) {
          const mod = (!test && ( (bits >> i) & 1) == 1);
          if (i < 8) {
            _modules![8][_moduleCount - i - 1] = mod;
          } else if (i < 9) {
            _modules![8][15 - i - 1 + 1] = mod;
          } else {
            _modules![8][15 - i - 1] = mod;
          }
        }
        _modules![_moduleCount - 8][8] = (!test);
      };

      const _setupTypeNumber = (test: boolean) => {

        const G18 = (1 << 12) | (1 << 11) | (1 << 10) | (1 << 9) | (1 << 8) | (1 << 5) | (1 << 2) | (1 << 0);
        const _getBCHTypeNumber = (data: number) => {
          let d = data << 12;
          while (_getBCHDigit(d) - _getBCHDigit(G18) >= 0) {
            d ^= (G18 << (_getBCHDigit(d) - _getBCHDigit(G18) ) );
          }
          return (data << 12) | d;
        };

        const bits = _getBCHTypeNumber(_typeNumber);
        for (let i = 0; i < 18; i += 1) {
          const mod = (!test && ( (bits >> i) & 1) == 1);
          _modules![Math.floor(i / 3)][i % 3 + _moduleCount - 8 - 3] = mod;
        }
        for (let i = 0; i < 18; i += 1) {
          const mod = (!test && ( (bits >> i) & 1) == 1);
          _modules![i % 3 + _moduleCount - 8 - 3][Math.floor(i / 3)] = mod;
        }
      };

      const _mapData = (data: any, maskPattern: number) => {

        const _getMask = (maskPattern: number, i: number, j: number) => {
          switch (maskPattern) {
          case 0 : return (i + j) % 2 == 0;
          case 1 : return i % 2 == 0;
          case 2 : return j % 3 == 0;
          case 3 : return (i + j) % 3 == 0;
          case 4 : return (Math.floor(i / 2) + Math.floor(j / 3) ) % 2 == 0;
          case 5 : return (i * j) % 2 + (i * j) % 3 == 0;
          case 6 : return ( (i * j) % 2 + (i * j) % 3) % 2 == 0;
          case 7 : return ( (i * j) % 3 + (i + j) % 2) % 2 == 0;
          default :
            throw new Error('bad maskPattern:' + maskPattern);
          }
        };

        let inc = -1;
        let row = _moduleCount - 1;
        let bitIndex = 7;
        let byteIndex = 0;
        for (let col = _moduleCount - 1; col > 0; col -= 2) {
          if (col == 6) {
            col -= 1;
          }
          while (true) {
            for (let c = 0; c < 2; c += 1) {
              if (_modules![row][col - c] == null) {
                let dark = false;
                if (byteIndex < data.length) {
                  dark = ( ( (data[byteIndex] >>> bitIndex) & 1) == 1);
                }
                const mask = _getMask(maskPattern, row, col - c);
                if (mask) {
                  dark = !dark;
                }
                _modules![row][col - c] = dark;
                bitIndex -= 1;
                if (bitIndex == -1) {
                  byteIndex += 1;
                  bitIndex = 7;
                }
              }
            }
            row += inc;
            if (row < 0 || _moduleCount <= row) {
              row -= inc;
              inc = -inc;
              break;
            }
          }
        }
      };

      const _setupPositionProbePattern = (row: number, col: number) => {
        for (let r = -1; r <= 7; r += 1) {
          if (row + r <= -1 || _moduleCount <= row + r) continue;
          for (let c = -1; c <= 7; c += 1) {
            if (col + c <= -1 || _moduleCount <= col + c) continue;
            if ( (0 <= r && r <= 6 && (c == 0 || c == 6) )
                || (0 <= c && c <= 6 && (r == 0 || r == 6) )
                || (2 <= r && r <= 4 && 2 <= c && c <= 4) ) {
              _modules![row + r][col + c] = true;
            } else {
              _modules![row + r][col + c] = false;
            }
          }
        }
      };

      const _setupTimingPattern = () => {
        for (let r = 8; r < _moduleCount - 8; r += 1) {
          if (_modules![r][6] != null) {
            continue;
          }
          _modules![r][6] = (r % 2 == 0);
        }
        for (let c = 8; c < _moduleCount - 8; c += 1) {
          if (_modules![6][c] != null) {
            continue;
          }
          _modules![6][c] = (c % 2 == 0);
        }
      };

      const _setupPositionAdjustPattern = () => {
        const pos = _util.getPatternPosition(_typeNumber);
        for (let i = 0; i < pos.length; i += 1) {
          for (let j = 0; j < pos.length; j += 1) {
            const row = pos[i];
            const col = pos[j];
            if (_modules![row][col] != null) {
              continue;
            }
            for (let r = -2; r <= 2; r += 1) {
              for (let c = -2; c <= 2; c += 1) {
                if (r == -2 || r == 2 || c == -2 || c == 2
                    || (r == 0 && c == 0) ) {
                  _modules![row + r][col + c] = true;
                } else {
                  _modules![row + r][col + c] = false;
                }
              }
            }
          }
        }
      };

      _moduleCount = _typeNumber * 4 + 17;
      _modules = new Array(_moduleCount);
      for (let i = 0; i < _moduleCount; i += 1) {
        _modules[i] = new Array(_moduleCount);
      }

      _setupPositionProbePattern(0, 0);
      _setupPositionProbePattern(_moduleCount - 7, 0);
      _setupPositionProbePattern(0, _moduleCount - 7);
      _setupPositionAdjustPattern();
      _setupTimingPattern();
      _setupTypeInfo(false, options.maskPattern);

      if (_typeNumber >= 7) {
        _setupTypeNumber(false);
      }

      const dataBytes = _createData(_typeNumber, _errorCorrectionLevel, data);

      _mapData(dataBytes, options.maskPattern);
    };

    _this.getModuleCount = () => {
      return _moduleCount;
    };

    _this.isDark = (row: number, col: number) => {
      if (_modules != null
          && _modules[row] != null
          && _modules[row][col] != null) {
        return _modules[row][col];
      } else {
        throw new Error(row + ',' + col);
      }
    };

    return _this;
  };

  const _qr8BitByte = (data: string) => {
    const _mode = 4;
    const _data = data;
    const _bytes = _stringToBytes(data);

    const _this = {
    };

    _this.getMode = () => {
      return _mode;
    };

    _this.getLength = () => {
      return _bytes.length;
    };

    _this.write = (buffer: any) => {
      for (let i = 0; i < _bytes.length; i += 1) {
        buffer.put(_bytes[i], 8);
      }
    };

    return _this;
  };

  const _polynomial = function(num: number[], shift: number) {

    if (num.length == undefined) {
      throw new Error(num.length + '/' + shift);
    }

    let _num = (function() {
      let offset = 0;
      while (offset < num.length && num[offset] == 0) {
        offset += 1;
      }
      const _num = new Array(num.length - offset + shift);
      for (let i = 0; i < num.length - offset; i += 1) {
        _num[i] = num[i + offset];
      }
      return _num;
    })();

    const _this = {
    };

    _this.get = (index: number) => {
      return _num[index];
    };

    _this.getLength = () => {
      return _num.length;
    };

    _this.mod = (e: any) => {
      const _log = _math.log;
      const _exp = _math.exp;
      if (_this.getLength() - e.getLength() < 0) {
        return _this;
      }
      const ratio = _log(_this.get(0) ) - _log(e.get(0) );
      const num = new Array(_this.getLength() );
      for (let i = 0; i < _this.getLength(); i += 1) {
        num[i] = _this.get(i);
      }
      for (let i = 0; i < e.getLength(); i += 1) {
        num[i] ^= _exp(_log(e.get(i) ) + ratio);
      }
      return _polynomial(num, 0).mod(e);
    };

    return _this;
  };

  const _rsBlock = function() {

    const _rsBlockTable = [

      // L
      // M
      // Q
      // H

      // 1
      [1, 26, 19],
      [1, 26, 16],
      [1, 26, 13],
      [1, 26, 9],

      // 2
      [1, 44, 34],
      [1, 44, 28],
      [1, 44, 22],
      [1, 44, 16],

      // 3
      [1, 70, 55],
      [1, 70, 44],
      [2, 35, 17],
      [2, 35, 13],

      // 4
      [1, 100, 80],
      [2, 50, 32],
      [2, 50, 24],
      [4, 25, 9],

      // 5
      [1, 134, 108],
      [2, 67, 43],
      [2, 33, 15, 2, 34, 16],
      [2, 33, 11, 2, 34, 12],

      // 6
      [2, 86, 68],
      [4, 43, 27],
      [4, 43, 19],
      [4, 43, 15],

      // 7
      [2, 98, 78],
      [4, 49, 31],
      [2, 32, 14, 4, 33, 15],
      [4, 39, 13, 1, 40, 14],

      // 8
      [2, 121, 97],
      [2, 60, 38, 2, 61, 39],
      [4, 40, 18, 2, 41, 19],
      [4, 40, 14, 2, 41, 15],

      // 9
      [2, 146, 116],
      [3, 58, 36, 2, 59, 37],
      [4, 36, 16, 4, 37, 17],
      [4, 36, 12, 4, 37, 13],

      // 10
      [2, 86, 68, 2, 87, 69],
      [4, 69, 43, 1, 70, 44],
      [6, 43, 19, 2, 44, 20],
      [6, 43, 15, 2, 44, 16],

      // 11
      [4, 101, 81],
      [1, 80, 50, 4, 81, 51],
      [4, 50, 22, 4, 51, 23],
      [3, 36, 12, 8, 37, 13],

      // 12
      [2, 116, 92, 2, 117, 93],
      [6, 58, 36, 2, 59, 37],
      [4, 46, 20, 6, 47, 21],
      [7, 42, 14, 4, 43, 15],

      // 13
      [4, 133, 107],
      [8, 59, 37, 1, 60, 38],
      [8, 44, 20, 4, 45, 21],
      [12, 33, 11, 4, 34, 12],

      // 14
      [3, 145, 115, 1, 146, 116],
      [4, 64, 40, 5, 65, 41],
      [11, 36, 16, 5, 37, 17],
      [11, 36, 12, 5, 37, 13],

      // 15
      [5, 109, 87, 1, 110, 88],
      [5, 65, 41, 5, 66, 42],
      [5, 54, 24, 7, 55, 25],
      [11, 36, 12],

      // 16
      [5, 122, 98, 1, 123, 99],
      [7, 73, 45, 3, 74, 46],
      [15, 43, 19, 2, 44, 20],
      [3, 45, 15, 13, 46, 16],

      // 17
      [1, 135, 107, 5, 136, 108],
      [10, 74, 46, 1, 75, 47],
      [1, 50, 22, 15, 51, 23],
      [2, 42, 14, 17, 43, 15],

      // 18
      [5, 150, 120, 1, 151, 121],
      [9, 69, 43, 4, 70, 44],
      [17, 50, 22, 1, 51, 23],
      [2, 42, 14, 19, 43, 15],

      // 19
      [3, 141, 113, 4, 142, 114],
      [3, 70, 44, 11, 71, 45],
      [17, 47, 21, 4, 48, 22],
      [9, 39, 13, 16, 40, 14],

      // 20
      [3, 135, 107, 5, 136, 108],
      [3, 67, 41, 13, 68, 42],
      [15, 54, 24, 5, 55, 25],
      [15, 43, 15, 10, 44, 16],

      // 21
      [4, 144, 116, 4, 145, 117],
      [17, 68, 42],
      [17, 50, 22, 6, 51, 23],
      [19, 46, 16, 6, 47, 17],

      // 22
      [2, 139, 111, 7, 140, 112],
      [17, 74, 46],
      [7, 54, 24, 16, 55, 25],
      [34, 37, 13],

      // 23
      [4, 151, 121, 5, 152, 122],
      [4, 75, 47, 14, 76, 48],
      [11, 54, 24, 14, 55, 25],
      [16, 45, 15, 14, 46, 16],

      // 24
      [6, 147, 117, 4, 148, 118],
      [6, 73, 45, 14, 74, 46],
      [11, 54, 24, 16, 55, 25],
      [30, 46, 16, 2, 47, 17],

      // 25
      [8, 132, 106, 4, 133, 107],
      [8, 75, 47, 13, 76, 48],
      [7, 54, 24, 22, 55, 25],
      [22, 45, 15, 13, 46, 16],

      // 26
      [10, 142, 114, 2, 143, 115],
      [19, 74, 46, 4, 75, 47],
      [28, 50, 22, 6, 51, 23],
      [33, 46, 16, 4, 47, 17],

      // 27
      [8, 152, 122, 4, 153, 123],
      [22, 73, 45, 3, 74, 46],
      [8, 53, 23, 26, 54, 24],
      [12, 45, 15, 28, 46, 16],

      // 28
      [3, 147, 117, 10, 148, 118],
      [3, 73, 45, 23, 74, 46],
      [4, 54, 24, 31, 55, 25],
      [11, 45, 15, 31, 46, 16],

      // 29
      [7, 146, 116, 7, 147, 117],
      [21, 73, 45, 7, 74, 46],
      [1, 53, 23, 37, 54, 24],
      [19, 45, 15, 26, 46, 16],

      // 30
      [5, 145, 115, 10, 146, 116],
      [19, 75, 47, 10, 76, 48],
      [15, 54, 24, 25, 55, 25],
      [23, 45, 15, 25, 46, 16],

      // 31
      [13, 145, 115, 3, 146, 116],
      [2, 74, 46, 29, 75, 47],
      [42, 54, 24, 1, 55, 25],
      [23, 45, 15, 28, 46, 16],

      // 32
      [17, 145, 115],
      [10, 74, 46, 23, 75, 47],
      [10, 54, 24, 35, 55, 25],
      [19, 45, 15, 35, 46, 16],

      // 33
      [17, 145, 115, 1, 146, 116],
      [14, 74, 46, 21, 75, 47],
      [29, 54, 24, 19, 55, 25],
      [11, 45, 15, 46, 46, 16],

      // 34
      [13, 145, 115, 6, 146, 116],
      [14, 74, 46, 23, 75, 47],
      [44, 54, 24, 7, 55, 25],
      [59, 46, 16, 1, 47, 17],

      // 35
      [12, 151, 121, 7, 152, 122],
      [12, 75, 47, 26, 76, 48],
      [39, 54, 24, 14, 55, 25],
      [22, 45, 15, 41, 46, 16],

      // 36
      [6, 151, 121, 14, 152, 122],
      [6, 75, 47, 34, 76, 48],
      [46, 54, 24, 10, 55, 25],
      [2, 45, 15, 64, 46, 16],

      // 37
      [17, 152, 122, 4, 153, 123],
      [29, 74, 46, 14, 75, 47],
      [49, 54, 24, 10, 55, 25],
      [24, 45, 15, 46, 46, 16],

      // 38
      [4, 152, 122, 18, 153, 123],
      [13, 74, 46, 32, 75, 47],
      [48, 54, 24, 14, 55, 25],
      [42, 45, 15, 32, 46, 16],

      // 39
      [20, 147, 117, 4, 148, 118],
      [40, 75, 47, 7, 76, 48],
      [43, 54, 24, 22, 55, 25],
      [10, 45, 15, 67, 46, 16],

      // 40
      [19, 148, 118, 6, 149, 119],
      [18, 75, 47, 31, 76, 48],
      [34, 54, 24, 34, 55, 25],
      [20, 45, 15, 61, 46, 16]
    ];

    const _getRsBlockTable = (typeNumber: number, errorCorrectionLevel: number) => {

      switch(errorCorrectionLevel) {
      case 1 : // L
        return _rsBlockTable[(typeNumber - 1) * 4 + 0];
      case 0 : // M
        return _rsBlockTable[(typeNumber - 1) * 4 + 1];
      case 3 : // Q
        return _rsBlockTable[(typeNumber - 1) * 4 + 2];
      case 2 : // H
        return _rsBlockTable[(typeNumber - 1) * 4 + 3];
      default :
        return undefined;
      }
    };

    const _this = {
    };

    _this.getRSBlocks = (typeNumber: number, errorCorrectionLevel: number) => {

      const rsBlock = _getRsBlockTable(typeNumber, errorCorrectionLevel);

      if (rsBlock == undefined) {
        throw new Error('bad rs block @ typeNumber:' + typeNumber + '/errorCorrectionLevel:' + errorCorrectionLevel);
      }

      const length = rsBlock.length / 3;
      const list: any[] = [];

      for (let i = 0; i < length; i += 1) {
        const count = rsBlock[i * 3 + 0];
        const totalCount = rsBlock[i * 3 + 1];
        const dataCount = rsBlock[i * 3 + 2];
        for (let j = 0; j < count; j += 1) {
          list.push( { totalCount: totalCount, dataCount: dataCount } );
        }
      }

      return list;
    };

    return _this;
  }();

  const _math = function() {

    const _logTable = new Array(256);
    const _expTable = new Array(256);

    for (let i = 0; i < 8; i += 1) {
      _expTable[i] = 1 << i;
    }
    for (let i = 8; i < 256; i += 1) {
      _expTable[i] = _expTable[i - 4]
        ^ _expTable[i - 5]
        ^ _expTable[i - 6]
        ^ _expTable[i - 8];
    }
    for (let i = 0; i < 255; i += 1) {
      _logTable[_expTable[i] ] = i;
    }

    const _this = {
    };

    _this.log = (n: number) => {
      if (n < 1) {
        throw new Error('log(' + n + ')');
      }
      return _logTable[n];
    };

    _this.exp = (n: number) => {
      while (n < 0) {
        n += 255;
      }
      while (n >= 256) {
        n -= 255;
      }
      return _expTable[n];
    };

    return _this;
  }();

  const _util = function() {
    const _this = {
    };
    _this.getPatternPosition = (typeNumber: number) => {
      const patternPosition = [
        [],
        [6, 18],
        [6, 22],
        [6, 26],
        [6, 30],
        [6, 34],
        [6, 22, 38],
        [6, 24, 42],
        [6, 26, 46],
        [6, 28, 50],
        [6, 30, 54],
        [6, 32, 58],
        [6, 34, 62],
        [6, 26, 46, 66],
        [6, 26, 48, 70],
        [6, 26, 50, 74],
        [6, 30, 54, 78],
        [6, 30, 56, 82],
        [6, 30, 58, 86],
        [6, 34, 62, 90],
        [6, 28, 50, 72, 94],
        [6, 26, 50, 74, 98],
        [6, 30, 54, 78, 102],
        [6, 28, 54, 80, 106],
        [6, 32, 58, 84, 110],
        [6, 30, 58, 86, 114],
        [6, 34, 62, 90, 118],
        [6, 26, 50, 74, 98, 122],
        [6, 30, 54, 78, 102, 126],
        [6, 26, 52, 78, 104, 130],
        [6, 30, 56, 82, 108, 134],
        [6, 34, 60, 86, 112, 138],
        [6, 30, 58, 86, 114, 142],
        [6, 34, 62, 90, 118, 146],
        [6, 30, 54, 78, 102, 126, 150],
        [6, 24, 50, 76, 102, 128, 154],
        [6, 28, 54, 80, 106, 132, 158],
        [6, 32, 58, 84, 110, 136, 162],
        [6, 26, 54, 82, 110, 138, 166],
        [6, 30, 58, 86, 114, 142, 170]
      ];
      return patternPosition[typeNumber - 1];
    };
    _this.getLengthInBits = (mode: number, type: number) => {
      const lengthInBits = {
        '1': { '1': 10, '2': 9, '3': 8, '4': 8 },
        '2': { '1': 12, '2': 11, '3': 16, '4': 10 },
        '3': { '1': 14, '2': 13, '3': 16, '4': 12 }
      };
      if (1 <= type && type < 10) {
        switch(mode) {
        case 1 : return 10;
        case 2 : return 9;
        case 4 : return 8;
        case 8 : return 8;
        default :
          throw new Error('mode:' + mode);
        }
      } else if (type < 27) {
        switch(mode) {
        case 1 : return 12;
        case 2 : return 11;
        case 4 : return 16;
        case 8 : return 10;
        default :
          throw new Error('mode:' + mode);
        }
      } else if (type < 41) {
        switch(mode) {
        case 1 : return 14;
        case 2 : return 13;
        case 4 : return 16;
        case 8 : return 12;
        default :
          throw new Error('mode:' + mode);
        }
      } else {
        throw new Error('type:' + type);
      }
    };
    _this.getLostPoint = (qrcode: any) => {
      const moduleCount = qrcode.getModuleCount();
      let lostPoint = 0;
      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount; col += 1) {
          let sameCount = 0;
          const dark = qrcode.isDark(row, col);
          for (let r = -1; r <= 1; r += 1) {
            if (row + r < 0 || moduleCount <= row + r) {
              continue;
            }
            for (let c = -1; c <= 1; c += 1) {
              if (col + c < 0 || moduleCount <= col + c) {
                continue;
              }
              if (r == 0 && c == 0) {
                continue;
              }
              if (dark == qrcode.isDark(row + r, col + c) ) {
                sameCount += 1;
              }
            }
          }
          if (sameCount > 5) {
            lostPoint += (3 + sameCount - 5);
          }
        }
      }
      for (let row = 0; row < moduleCount - 1; row += 1) {
        for (let col = 0; col < moduleCount - 1; col += 1) {
          let count = 0;
          if (qrcode.isDark(row, col) ) count += 1;
          if (qrcode.isDark(row + 1, col) ) count += 1;
          if (qrcode.isDark(row, col + 1) ) count += 1;
          if (qrcode.isDark(row + 1, col + 1) ) count += 1;
          if (count == 0 || count == 4) {
            lostPoint += 3;
          }
        }
      }
      for (let row = 0; row < moduleCount; row += 1) {
        for (let col = 0; col < moduleCount - 6; col += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row, col + 1)
              &&  qrcode.isDark(row, col + 2)
              &&  qrcode.isDark(row, col + 3)
              &&  qrcode.isDark(row, col + 4)
              && !qrcode.isDark(row, col + 5)
              &&  qrcode.isDark(row, col + 6) ) {
            lostPoint += 40;
          }
        }
      }
      for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount - 6; row += 1) {
          if (qrcode.isDark(row, col)
              && !qrcode.isDark(row + 1, col)
              &&  qrcode.isDark(row + 2, col)
              &&  qrcode.isDark(row + 3, col)
              &&  qrcode.isDark(row + 4, col)
              && !qrcode.isDark(row + 5, col)
              &&  qrcode.isDark(row + 6, col) ) {
            lostPoint += 40;
          }
        }
      }
      let darkCount = 0;
      for (let col = 0; col < moduleCount; col += 1) {
        for (let row = 0; row < moduleCount; row += 1) {
          if (qrcode.isDark(row, col) ) {
            darkCount += 1;
          }
        }
      }
      const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
      lostPoint += ratio * 10;
      return lostPoint;
    };
    return _this;
  }();

  const _bitBuffer = function() {
    let _buffer: any[] = [];
    let _length = 0;
    const _this = {
    };
    _this.getBuffer = () => {
      return _buffer;
    };
    _this.get = (index) => {
      const bufIndex = Math.floor(index / 8);
      return ( (_buffer[bufIndex] >>> (7 - index % 8) ) & 1) == 1;
    };
    _this.put = (num, length) => {
      for (let i = 0; i < length; i += 1) {
        _this.putBit( ( (num >>> (length - i - 1) ) & 1) == 1);
      }
    };
    _this.getLengthInBits = () => {
      return _length;
    };
    _this.putBit = (bit) => {
      const bufIndex = Math.floor(_length / 8);
      if (_buffer.length <= bufIndex) {
        _buffer.push(0);
      }
      if (bit) {
        _buffer[bufIndex] |= (0x80 >>> (_length % 8) );
      }
      _length += 1;
    };
    return _this;
  };

  const _stringToBytes = (s: string) => {
    // http://stackoverflow.com/questions/18729405/how-to-convert-utf8-string-to-byte-array
    function toUTF8Array(str: string) {
      let utf8: number[] = [];
      for (let i=0; i < str.length; i++) {
        let charcode = str.charCodeAt(i);
        if (charcode < 0x80) utf8.push(charcode);
        else if (charcode < 0x800) {
          utf8.push(0xc0 | (charcode >> 6),
            0x80 | (charcode & 0x3f));
        }
        else if (charcode < 0xd800 || charcode >= 0xe000) {
          utf8.push(0xe0 | (charcode >> 12),
            0x80 | ((charcode>>6) & 0x3f),
            0x80 | (charcode & 0x3f));
        }
        // surrogate pair
        else {
          i++;
          // UTF-16 encodes 0x10000-0x10FFFF by
          // subtracting 0x10000 and splitting the
          // 20 bits of 0x0-0xFFFFF into two halves
          charcode = 0x10000 + (((charcode & 0x3ff)<<10)
            | (str.charCodeAt(i) & 0x3ff));
          utf8.push(0xf0 | (charcode >>18),
            0x80 | ((charcode>>12) & 0x3f),
            0x80 | ((charcode>>6) & 0x3f),
            0x80 | (charcode & 0x3f));
        }
      }
      return utf8;
    }
    return toUTF8Array(s);
  };

  const _getErrorCorrectPolynomial = (errorCorrectLength: number) => {
    let a = _polynomial([1], 0);
    for (let i = 0; i < errorCorrectLength; i += 1) {
      a = a.mod(_polynomial([1, _math.exp(i)], 0) );
    }
    return a;
  };

  const _createCanvas = (
    qrcode: any,
    options: any
  ) => {

    let canvas;

    if (typeof options.canvas == 'string') {
      canvas = document.getElementById(options.canvas);
    } else {
      canvas = options.canvas;
    }

    if (typeof CanvasRenderingContext2D == 'undefined') {
      throw 'please use other render method.';
    }

    const ctx = canvas.getContext('2d');
    const moduleCount = qrcode.getModuleCount();
    const width = options.width || moduleCount * 2;
    const height = options.height || moduleCount * 2;
    const moduleSize = Math.min(width / moduleCount, height / moduleCount);
    canvas.width = width;
    canvas.height = height;

    // clear canvas
    ctx.clearRect(0, 0, width, height);
    // background
    if (options.background) {
      ctx.fillStyle = options.background;
      ctx.fillRect(0, 0, width, height);
    }
    
    // foreground
    ctx.fillStyle = options.foreground || '#000000';
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount; col += 1) {
        if (qrcode.isDark(row, col) ) {
          ctx.fillRect(
            col * moduleSize,
            row * moduleSize,
            moduleSize,
            moduleSize
          );
        }
      }
    }
  };

  const _createSvg = (
    qrcode: any,
    options: any
  ) => {

    const moduleCount = qrcode.getModuleCount();
    const width = options.width || (moduleCount * 2);
    const height = options.height || (moduleCount * 2);
    const moduleSize = Math.min(width / moduleCount, height / moduleCount);

    let svg = '';
    svg += '<svg';
    svg += ' width="' + width + 'px"';
    svg += ' height="' + height + 'px"';
    svg += ' viewBox="0 0 ' + moduleCount + ' ' + moduleCount + '"';
    svg += ' xmlns="http://www.w3.org/2000/svg"';
    svg += '>';

    // background
    if (options.background) {
      svg += '<rect';
      svg += ' x="0"';
      svg += ' y="0"';
      svg += ' width="' + moduleCount + '"';
      svg += ' height="' + moduleCount + '"';
      svg += ' style="fill:' + options.background + ';"';
      svg += ' />';
    }

    // foreground
    svg += '<path';
    svg += ' d="';
    const fill = options.foreground || '#000000';
    let d = '';
    for (let row = 0; row < moduleCount; row += 1) {
      for (let col = 0; col < moduleCount; col += 1) {
        if (qrcode.isDark(row, col) ) {
          d += 'M' + col + ',' + row + 'h1v1h-1z';
        }
      }
    }
    svg += d;
    svg += '"';
    svg += ' style="fill:' + fill + ';"';
    svg += ' />';

    svg += '</svg>';

    return svg;
  };

  const _createImage = (
    qrcode: any,
    options: any
  ) => {
    let img;
    if (typeof options.image == 'string') {
      img = document.getElementById(options.image);
    } else {
      img = options.image;
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(
      _createSvg(qrcode, options) );
  };

  const _createTable = (
    qrcode: any,
    options: any
  ) => {
    
    let table;
    if (typeof options.table == 'string') {
      table = document.getElementById(options.table);
    } else {
      table = options.table;
    }

    const moduleCount = qrcode.getModuleCount();
    
    const fg = 'background-color:' +
      (options.foreground || '#000000') + ';';
    const bg = 'background-color:' +
      (options.background || 'white') + ';';

    let tbl = '';
    tbl += '<table style="border:0;border-collapse:collapse;">';
    for (let row = 0; row < moduleCount; row += 1) {
      tbl += '<tr>';
      for (let col = 0; col < moduleCount; col += 1) {
        tbl += '<td style="width:1px;height:1px;';
        if (qrcode.isDark(row, col) ) {
          tbl += fg;
        } else {
          tbl += bg;
        }
        tbl += '"></td>';
      }
      tbl += '</tr>';
    }
    tbl += '</table>';
    table.innerHTML = tbl;
  };

  const _this = (text: string, options: any) => {

    const _options = {
      typeNumber: -1,
      errorCorrectionLevel: 'M',
      render: 'canvas',
      width: 256,
      height: 256,
      foreground: '#000000',
      background: '#ffffff',
      ...options
    };

    const _errorCorrectionLevel = {
      L: 1, M: 0, Q: 3, H: 2
    }[_options.errorCorrectionLevel] || 0;

    const _qrcode = qrcode();

    if (_options.typeNumber < 0) {
      const textLength = _stringToBytes(text).length;
      let typeNumber = 1;
      let length = 0;
      
      let found = false;
      for (let t = 1; t <= 40; t += 1) {
        const rsBlock = _rsBlock.getRSBlocks(t, _errorCorrectionLevel);
        let l = 0;
        for (let i = 0; i < rsBlock.length; i += 1) {
          l += rsBlock[i].dataCount;
        }
  
        if (textLength <= l) {
          typeNumber = t;
          length = l;
          found = true;
          break;
        }
      }
  
      if (!found) {
        throw new Error('code length overflow. (' + textLength + ' > ' + length + ')');
      }
      _options.typeNumber = typeNumber;
    }


    let bestMaskPattern = -1;
    let minLostPoint = 0;

    for (let maskPattern = 0; maskPattern < 8; maskPattern += 1) {
      _qrcode.make(text, {
        typeNumber: _options.typeNumber,
        errorCorrectionLevel: _errorCorrectionLevel,
        maskPattern: maskPattern
      });
      const lostPoint = _util.getLostPoint(_qrcode);
      if (bestMaskPattern == -1 || minLostPoint > lostPoint) {
        minLostPoint = lostPoint;
        bestMaskPattern = maskPattern;
      }
    }

    _options.maskPattern = bestMaskPattern;
    _qrcode.make(text, _options);

    switch(_options.render) {
    case 'canvas':
      _createCanvas(_qrcode, _options);
      break;
    case 'svg':
      _createSvg(_qrcode, _options);
      break;
    case 'image':
      _createImage(_qrcode, _options);
      break;
    case 'table':
      _createTable(_qrcode, _options);
      break;
    default:
      break;
    }

    return _qrcode;
  };

  return _this;
})();

export function UpiQrCode({ upiLink }: { upiLink: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef.current && upiLink) {
            qrcode(upiLink, {
                canvas: canvasRef.current,
                width: 200,
                height: 200,
                background: '#ffffff',
                foreground: '#000000',
                errorCorrectionLevel: 'M',
            });
        }
    }, [upiLink]);

    return <canvas ref={canvasRef}></canvas>;
}
