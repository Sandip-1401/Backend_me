import QRCode from 'qrcode';

export class QRUtil {
  static async generateQR(data: any) {
    const qrData = JSON.stringify(data);

    const qrImage = await QRCode.toDataURL(qrData);

    return qrImage;
  }
}
