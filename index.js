let imgBox = document.getElementById("imgBox");
let qrImage = document.getElementById("qrImage");
let qrText = document.getElementById("qrText");
let qrColor = document.getElementById("color");
let downloadBtn = document.getElementById("downloadBtn");


function generateQR() {
    if (qrText.value.length > 0) {

        let qrColorValue = qrColor.value.replace("#", "");  // Get the color without the '#'
        let qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=" + encodeURIComponent(qrText.value) + "&color=" + qrColorValue;
        qrImage.src = qrUrl;
        imgBox.classList.add("show-img");
        downloadBtn.style.display = "block";

    }
    else {
        qrText.classList.add('error');
        setTimeout(() => {
            qrText.classList.remove('error');
        }, 1000);
    }
}

async function downloadQR() {
    try {
        let imgUrl = qrImage.src;
        let response = await fetch(imgUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        let blob = await response.blob();
        let link = document.createElement('a');
        let url = URL.createObjectURL(blob);
        link.href = url;
        link.download = 'qr-code.png';  // Force download as png file
        document.body.appendChild(link);
        link.click();  // Trigger the download
        document.body.removeChild(link);
        URL.revokeObjectURL(url);  // Release memory
    } 
    catch (error) {
        console.error('Error fetching the QR code image:', error);
    }
}