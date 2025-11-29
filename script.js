// CẤU HÌNH
const folderPath = './image/'; 
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

// Các biến Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const exifInfoBox = document.getElementById('exif-info');
const downloadBtn = document.getElementById('download-btn');
const closeBtn = document.getElementsByClassName('close-btn')[0];

function loadImagesAuto() {
    let index = 1;

    // Hàm thử tìm ảnh với nhiều cái tên khác nhau
    function tryLoadNextImage() {
        // Danh sách các tên file có thể xảy ra
        const possibleNames = [
            `${index}.jpg`,      // 1.jpg
            `${index}.JPG`,      // 1.JPG (In hoa)
            `${index}.jpeg`,     // 1.jpeg
            `${index}.png`,      // 1.png
            `(${index}).jpg`,    // (1).jpg
            `(${index}).JPG`,    // (1).JPG
            ` (${index}).jpg`,   //  (1).jpg (Có dấu cách đầu)
            ` (${index}).JPG`    //  (1).JPG (Có dấu cách đầu)
        ];

        // Hàm đệ quy để thử từng tên trong danh sách trên
        function attemptLoad(candidateList, nameIndex) {
            if (nameIndex >= candidateList.length) {
                // Đã thử hết các tên mà vẫn không thấy -> Dừng lại
                console.log(`Dừng tại số ${index}. Không tìm thấy ảnh nào khớp.`);
                loader.innerHTML = "<p>Đã tải xong toàn bộ ảnh.</p>";
                setTimeout(() => loader.style.display = 'none', 3000);
                return;
            }

            const fileName = candidateList[nameIndex];
            const img = new Image();
            img.src = folderPath + fileName;

            img.onload = function() {
                // Tìm thấy rồi!
                console.log(`Đã tìm thấy: ${fileName}`);
                createGalleryItem(img.src, fileName);
                index++; 
                tryLoadNextImage(); // Tìm số tiếp theo
            };

            img.onerror = function() {
                // Không thấy tên này, thử tên tiếp theo trong danh sách
                attemptLoad(candidateList, nameIndex + 1);
            };
        }

        // Bắt đầu thử danh sách tên cho số thứ tự hiện tại
        attemptLoad(possibleNames, 0);
    }

    tryLoadNextImage();
}

// --- CÁC HÀM XỬ LÝ GIAO DIỆN (GIỮ NGUYÊN) ---
function createGalleryItem(src, fileName) {
    const item = document.createElement('div');
    item.className = 'gallery-item';
    const imageTag = document.createElement('img');
    imageTag.src = src;
    imageTag.alt = fileName;
    item.onclick = () => openLightbox(imageTag, src);
    item.appendChild(imageTag);
    gallery.insertBefore(item, loader);
}

function openLightbox(imgElement, src) {
    lightbox.style.display = "flex";
    lightboxImg.src = src;
    document.body.style.overflow = "hidden";
    downloadBtn.href = src;
    exifInfoBox.innerHTML = "Đang đọc thông số...";

    // Đọc EXIF
    EXIF.getData(imgElement, function() {
        const make = EXIF.getTag(this, "Make") || "";
        const model = EXIF.getTag(this, "Model") || "";
        const iso = EXIF.getTag(this, "ISOSpeedRatings");
        const fNumber = EXIF.getTag(this, "FNumber");
        const exposure = EXIF.getTag(this, "ExposureTime");

        let info = "";
        if(make || model) info += `<div>📷 ${make} ${model}</div>`;
        if(fNumber) info += `<div>⭕ f/${fNumber}</div>`;
        if(exposure) info += `<div>⏱ ${exposure.numerator}/${exposure.denominator}s</div>`;
        if(iso) info += `<div>💡 ISO ${iso}</div>`;
        
        if(info === "") info = "<div>Không có thông số (Metadata trống)</div>";
        exifInfoBox.innerHTML = info;
    });
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

closeBtn.onclick = closeLightbox;
lightbox.onclick = (e) => { if (e.target === lightbox || e.target.classList.contains('lightbox-wrapper')) closeLightbox(); };

window.onload = loadImagesAuto;