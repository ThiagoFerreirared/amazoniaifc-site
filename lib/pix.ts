/**
 * Gera um payload Pix "copia e cola" no formato BR Code (EMV QRCPS-MPM).
 * É uma simulação: a chave é fictícia, então o código não cobra de verdade,
 * mas tem a estrutura e o CRC corretos para parecer real e ser escaneável.
 */

interface PixInput {
  key: string;
  name: string;
  city: string;
  amount: number;
  txid: string;
}

function tlv(id: string, value: string): string {
  const len = value.length.toString().padStart(2, "0");
  return `${id}${len}${value}`;
}

function crc16(payload: string): string {
  let crc = 0xffff;
  for (let i = 0; i < payload.length; i++) {
    crc ^= payload.charCodeAt(i) << 8;
    for (let j = 0; j < 8; j++) {
      crc = crc & 0x8000 ? (crc << 1) ^ 0x1021 : crc << 1;
      crc &= 0xffff;
    }
  }
  return crc.toString(16).toUpperCase().padStart(4, "0");
}

/**
 * Remove acentos e caracteres fora do padrao aceito em nome/cidade.
 * normalize("NFD") separa o acento em marca combinante, e o filtro abaixo
 * mantem apenas letras, numeros e espaco, descartando as marcas.
 */
function sanitize(text: string): string {
  return text.normalize("NFD").toUpperCase().replace(/[^A-Z0-9 ]/g, "");
}

export function buildPixPayload({ key, name, city, amount, txid }: PixInput): string {
  const mai = tlv("26", tlv("00", "br.gov.bcb.pix") + tlv("01", key));
  const additional = tlv("62", tlv("05", txid.slice(0, 25)));

  const base =
    tlv("00", "01") +
    mai +
    tlv("52", "0000") +
    tlv("53", "986") +
    tlv("54", amount.toFixed(2)) +
    tlv("58", "BR") +
    tlv("59", sanitize(name).slice(0, 25)) +
    tlv("60", sanitize(city).slice(0, 15)) +
    additional +
    "6304";

  return base + crc16(base);
}
