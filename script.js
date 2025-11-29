// CẤU HÌNH
const folderPath = './image/'; // Nhớ có dấu chấm
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

    // Hàm đệ quy tìm ảnh
    function findAndLoadImage() {
        // Danh sách các đuôi file có thể xảy ra
        // GitHub phân biệt hoa thường nên ta phải thử hết
        const extensions = ['.jpg', '.JPG', '.jpeg', '.JPEG', '.png', '.PNG'];
        
        // Hàm thử từng đuôi một
        function tryExtension(extIndex) {
            if (extIndex >= extensions.length) {
                // Đã thử hết đuôi mà không thấy -> Dừng
                console.log(`Dừng tại ảnh số ${index}. Không tìm thấy file hợp lệ.`);
                loader.innerHTML = "<p>Đã tải hết ảnh.</p>";
                setTimeout(() => loader.style.display = 'none', 3000);
                return;
            }

            const currentExt = extensions[extIndex];
            const fileName = `${index}${currentExt}`; // Ví dụ: 1.jpg
            const img = new Image();
            
            img.src = folderPath + fileName;

            img.onload = function() {
                // Tìm thấy!
                console.log(`Đã tìm thấy: ${fileName}`);
                createGalleryItem(img.src, fileName);
                index++; // Tăng số thứ tự
                findAndLoadImage(); // Tìm tiếp ảnh sau
            };

            img.onerror = function() {
                // Không thấy đuôi này, thử đuôi tiếp theo trong danh sách
                tryExtension(extIndex + 1);
            };
        }

        // Bắt đầu thử từ đuôi đầu tiên
        tryExtension(0);
    }

    findAndLoadImage();
}

// --- CÁC HÀM GIAO DIỆN (GIỮ NGUYÊN) ---
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

    // Đọc EXIF (Cần thư viện exif-js trong file html)
    if (typeof EXIF !== 'undefined') {
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
            
            if(info === "") info = "<div>Không có thông số EXIF</div>";
            exifInfoBox.innerHTML = info;
        });
    } else {
        exifInfoBox.innerHTML = "Lỗi: Chưa cài thư viện EXIF";
    }
}

function closeLightbox() {
    lightbox.style.display = "none";
    document.body.style.overflow = "auto";
}

closeBtn.onclick = closeLightbox;
lightbox.onclick = (e) => { if (e.target === lightbox || e.target.classList.contains('lightbox-wrapper')) closeLightbox(); };

window.onload = loadImagesAuto;