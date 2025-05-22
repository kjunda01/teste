import { QRCodeCanvas } from "qrcode.react";

const QRCodePlaca = ({ placa }) => {
  return (
    <div className="">
      <QRCodeCanvas value={placa} size={30} level="H" />
    </div>
  );
};

export default QRCodePlaca;
