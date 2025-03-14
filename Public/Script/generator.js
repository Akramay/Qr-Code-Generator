const qrTypeRadios = document.querySelectorAll('input[name="qrType"]');
const qrFieldsGroups = document.querySelectorAll('.qr-fields');
const qrForm = document.getElementById('qrForm');
const qrCodeContainer = document.getElementById('qrCodeContainer');


qrTypeRadios.forEach(radio => {
  radio.addEventListener('change', () => {
    const selectedType = radio.value;
    qrFieldsGroups.forEach(group => {
      group.style.display = (group.dataset.type === selectedType) ? 'block' : 'none';
    });
  });
});


qrForm.addEventListener('submit', e => {
  e.preventDefault();

  const selectedType = document.querySelector('input[name="qrType"]:checked').value;
  let qrData = '';

 
  switch (selectedType) {
    case 'text':
      qrData = document.getElementById('textValue').value;
      break;
    case 'link':
      qrData = document.getElementById('linkValue').value;
      break;
    case 'vcard':
      const name = document.getElementById('vcardName').value;
      const phone = document.getElementById('vcardPhone').value;
      const email = document.getElementById('vcardEmail').value;
      const company = document.getElementById('vcardCompany').value;
      const address = document.getElementById('vcardAddress').value;
      qrData = `BEGIN:VCARD VERSION:3.0 N:${name} TEL:${phone} EMAIL:${email} ORG:${company} ADR:${address} END:VCARD`;
      break;
    case 'email':
      const to = document.getElementById('emailAddress').value;
      const subject = document.getElementById('emailSubject').value;
      const body = document.getElementById('emailBody').value;
      qrData = `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      break;
    case 'wifi':
      const ssid = document.getElementById('wifiSSID').value;
      const password = document.getElementById('wifiPassword').value;
      const encryption = document.getElementById('wifiEncryption').value;
      // WiFi format: WIFI:T:<encryption>;S:<ssid>;P:<password>;;
      qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
      break;
    default:
      qrData = '';
  }

  
  qrCodeContainer.innerHTML = '';


  new QRCode(qrCodeContainer, {
    text: qrData,
    width: 220,
    height: 220,
    colorDark : "#ffffff",
    colorLight : "#0a0f1f",
    correctLevel : QRCode.CorrectLevel.H
  });
});