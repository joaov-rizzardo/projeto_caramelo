// Builds a static Pix "copia e cola" payload (BR Code / EMV), the string
// bank apps expect inside a Pix QR code. No amount is set, so the donor
// chooses how much to give.

function field(id: string, value: string) {
  return id + String(value.length).padStart(2, "0") + value;
}

// EMV fields only allow plain ASCII: drop accents and cap the length.
function ascii(text: string, max: number) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toUpperCase()
    .slice(0, max);
}

// CRC16-CCITT (poly 0x1021, init 0xFFFF), as required by the BR Code spec.
function crc16(payload: string) {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let b = 0; b < 8; b++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

export function pixPayload({
  key,
  name,
  city,
}: {
  key: string;
  name: string;
  city: string;
}) {
  const body =
    field("00", "01") +
    field("26", field("00", "br.gov.bcb.pix") + field("01", key)) +
    field("52", "0000") +
    field("53", "986") +
    field("58", "BR") +
    field("59", ascii(name, 25)) +
    field("60", ascii(city, 15)) +
    field("62", field("05", "***")) +
    "6304";
  return body + crc16(body);
}
