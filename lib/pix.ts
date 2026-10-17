// Builds a static Pix "copia e cola" payload (BR Code / EMV), the string
// bank apps expect inside a Pix QR code. No amount is set, so the donor
// chooses how much to give.

function field(id: string, value: string) {
  return id + String(value.length).padStart(2, "0") + value;
}

// EMV fields only allow plain ASCII: drop accents and cap the length.
function plain(text: string, max: number) {
  return text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^\x20-\x7e]/g, "")
    .trim()
    .slice(0, max);
}

function ascii(text: string, max: number) {
  return plain(text, max).toUpperCase();
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
  description,
}: {
  key: string;
  name: string;
  city: string;
  description?: string;
}) {
  let account = field("00", "br.gov.bcb.pix") + field("01", key);
  // The description (shown to the donor in the bank app) shares field 26's
  // 99-char limit with the GUI and the key, so it gets whatever is left.
  const info = description ? plain(description, 99 - account.length - 4) : "";
  if (info) account += field("02", info);

  const body =
    field("00", "01") +
    field("26", account) +
    field("52", "0000") +
    field("53", "986") +
    field("58", "BR") +
    field("59", ascii(name, 25)) +
    field("60", ascii(city, 15)) +
    field("62", field("05", "***")) +
    "6304";
  return body + crc16(body);
}
