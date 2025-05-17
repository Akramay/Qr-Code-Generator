const isPremiumUser = true;


document.addEventListener('DOMContentLoaded',async () => {
  const qrTypeRadios = document.querySelectorAll('input[name="qrType"]');
  const qrFieldsGroups = document.querySelectorAll('.qr-fields');
  const qrForm = document.getElementById('qrForm');
  const qrCodeContainer = document.getElementById('qrCodeContainer');
  const qrHistorySection = document.getElementById('qr-history-section');
  const qrHistoryContainer = document.getElementById('qr-history-container');


  const customizeBtn = document.getElementById('customizeBtn');
  const customizationPanel = document.getElementById('customizationPanel');

  customizeBtn.addEventListener('click', () => {
    if (customizationPanel.style.display === 'none' || !customizationPanel.style.display) {
      customizationPanel.style.display = 'block';
      customizeBtn.textContent = 'Hide Customization';
    } else {
      customizationPanel.style.display = 'none';
      customizeBtn.textContent = 'Customize QR Code';
    }
  });


  function readFileAsDataURL(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = e => resolve(e.target.result);
      reader.onerror = err => reject(err);
      reader.readAsDataURL(file);
    });
  }



  

  if (isPremiumUser && qrHistorySection && qrHistoryContainer) {
    qrHistorySection.style.display = 'block';
    document.getElementById('customizeBtn').style.display = 'block'
    loadQRHistory();
  }

  qrTypeRadios.forEach(radio => {
    radio.addEventListener('change', () => {
      const selectedType = radio.value;
      qrFieldsGroups.forEach(group => {
        group.style.display = (group.dataset.type === selectedType) ? 'block' : 'none';
      });
    });
  });

  qrForm.addEventListener('submit', async e => {
    e.preventDefault();

    const selectedType = document.querySelector('input[name="qrType"]:checked')?.value;
    let qrData = '';
    let text = '';

    switch (selectedType) {
      case 'text':
        qrData = document.getElementById('textValue').value;
        text = `Text: ${qrData}`;
        break;
      case 'link':
        qrData = document.getElementById('linkValue').value;
        text = `Link: ${qrData}`;
        break;
      case 'vcard':
        const name = document.getElementById('vcardName').value;
        const phone = document.getElementById('vcardPhone').value;
        const email = document.getElementById('vcardEmail').value;
        const company = document.getElementById('vcardCompany').value;
        const address = document.getElementById('vcardAddress').value;
        qrData = `BEGIN:VCARD VERSION:3.0 N:${name} TEL:${phone} EMAIL:${email} ORG:${company} ADR:${address} END:VCARD`;
        text = `VCard info for ${name}`;
        break;
      case 'email':
        const to = document.getElementById('emailAddress').value;
        const subject = document.getElementById('emailSubject').value;
        qrData = `mailto:${to}?subject=${encodeURIComponent(subject)}`;
        text = `Email "${subject}" to ${to}`;
        break;
      case 'wifi':
        const ssid = document.getElementById('wifiSSID').value;
        const password = document.getElementById('wifiPassword').value;
        const encryption = document.getElementById('wifiEncryption').value;
        qrData = `WIFI:T:${encryption};S:${ssid};P:${password};;`;
        text = `WiFi QR for ${ssid}`;
        break;
      default:
        qrData = '';
    }

    qrCodeContainer.innerHTML = '';


    let qrCode = new QRCodeStyling({
    width: 220,
    height: 220,
    data: qrData,
    dotsOptions: {
      color: "#000000",
      type: "rounded",
    },
    backgroundOptions: {
      color: "#ffffff",
    },
    imageOptions: {
      crossOrigin: "anonymous",
      margin: 5,
    },
    image: "",
  });

  qrCode.append(qrCodeContainer);

  if(isPremiumUser){
    const dotColor = document.getElementById('dotColor').value;
    const bgColor = document.getElementById('bgColor').value;
    const logoFile = document.getElementById('logoUpload').files[0];

    let logoDataUrl = "";
    if (logoFile) {
      logoDataUrl = await readFileAsDataURL(logoFile);
    }

    // Update QR code styling and data
    qrCode.update({
      data: qrData,
      dotsOptions: { color: dotColor },
      backgroundOptions: { color: bgColor },
      image: logoDataUrl || "",
    });
  }
    


    setTimeout(() => {
      const qrCodeEl = document.querySelector('#qrCodeContainer canvas, #qrCodeContainer img');
      if (qrCodeEl && isPremiumUser) {
        const dataURL = qrCodeEl.toDataURL ? qrCodeEl.toDataURL() : qrCodeEl.src;
        saveToHistory(dataURL, text);
      }
    }, 500);
  });

  function saveToHistory(dataURL, qrMetaData) {
    let qrHistory = JSON.parse(localStorage.getItem('qrHistory') || '[]');
    qrHistory.unshift({image: dataURL, createdAt: Date.now(), text: qrMetaData});
    qrHistory = qrHistory.slice(0, 10);
    localStorage.setItem('qrHistory', JSON.stringify(qrHistory));
    loadQRHistory();
  }

  function loadQRHistory() {
    qrHistoryContainer.innerHTML = '';
    const savedQRCodes = JSON.parse(localStorage.getItem('qrHistory') || '[]');
    savedQRCodes.forEach((entry, index) => {
      const img = document.createElement('img');
      img.src = entry.image;
      img.alt = `QR Code ${index + 1}`;
      img.title = entry.text;
      img.style.width = '120px';
      img.style.height = '120px';
      img.style.border = '1px solid #46b2e0';
      img.style.borderRadius = '8px';
      qrHistoryContainer.appendChild(img);
    });
  }
});
