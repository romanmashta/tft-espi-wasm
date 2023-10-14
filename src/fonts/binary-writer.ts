export class BinaryWriter {
  ByteBuffer: number[];

  constructor() {
    this.ByteBuffer = [];
  }

  WriteInt32(value: number) {
    this.ByteBuffer = [...this.ByteBuffer, ((value >> 24) & 0xFF), ((value >> 16) & 0xFF), ((value >> 8) & 0xFF), (value & 0xFF)];
  }

  WriteInt16(value: number) {
    this.ByteBuffer = [...this.ByteBuffer, ((value >> 8) & 0xFF), (value & 0xFF)];
  }

  WriteInt8(value: number) {
    this.ByteBuffer = [...this.ByteBuffer, (value & 0xFF)];
  }

  WriteBytes(value: number[]) {
    this.ByteBuffer = [...this.ByteBuffer, ...value];
  }

  WriteString(value: string) {
    const bytes = value.split('').map(c => c.charCodeAt(0));
    this.WriteBytes(bytes);
  }
}
