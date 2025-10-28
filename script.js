// Dữ liệu thông báo (dễ dàng tùy chỉnh)
const updates = [
    {
        name: "Album ảnh “Lăng Kính Xanh” đã lên sóng rồi đây.",
        url: "https://www.facebook.com/share/p/1Cd3z7WsNG/",
        image: "image/569011842_1239416761554929_4286877904701532842_n.jpg",
        description: "Faculty of Public Relations and Communication, Van Lang University từ Facebook."
    },
    {
        name: "FINDING “LUDORI” - ĐẰNG SAU CÁI TÊN CÓ GÌ NHỈ? 🧸",
        url: "https://www.facebook.com/share/p/17i5kjUsug/",
        image: "image/568462961_1237573765072562_2770968611549770105_n.jpg",
        description: "Faculty of Public Relations and Communication, Van Lang University từ Facebook."
    }
];

// Dữ liệu sự kiện (dễ dàng tùy chỉnh)
const classs = [
    {
        name: "Thu tiền hội sinh viên K31",
        links: [
            { label: "Tài Liệu", url: "https://drive.google.com/file/d/1m68oazKM7pGeurIVpA6QrqyfhU3mNoWm/view?usp=sharing" },
            { label: "Google Form", url: "https://example.com/original-image" }
        ],
        image: "image/12335151.png",
        description: "Thông báo về việc thu Hội phí Khóa 31 năm học 2025 - 2026 tại Trường Đại học Văn Lang. Nộp trước <strong>20:00 ngày 30/10/2025</strong>."
    },
    {
        name: "Nộp bài tập Elearning Pháp Luật Đại Cương",
        url: "https://elearning.vlu.edu.vn/mod/quiz/view.php?id=430346",
        image: "image/123974617e492.png",
        description: "Thời gian nộp bài tập <strong>từ 27/10/2025 đến hết ngày 07/11/2025</strong>."
    },
    {
        name: "Danh sách nhóm nhiếp ảnh kỹ thuật số",
        url: "https://docs.google.com/spreadsheets/d/1txIPxrHitz56LjDTsm_9PtL5IwlJS0XsefwSKnw4Fhg/edit?gid=0#gid=0",
        image: "image/13581324978751764387.png",
        description: "Google Sheet cho nhóm nhiếp ảnh."
    },
    {
        name: "Danh sách nhóm nhập môn truyền thông đa phương tiện",
        url: "https://docs.google.com/spreadsheets/d/11Xm2FoLGxYuCrnYp7L4wSvBQHolIsBmSI5xRKmqYdyQ/edit?gid=0#gid=0",
        image: "image/13581324978751764387.png",
        description: "Google Sheet cho nhóm nhập môn truyền thông đa phương tiện."
    },
    {
        name: "Nộp bài tập nhập môn truyền thông đa phương tiện",
        url: "https://drive.google.com/drive/folders/1lWJcEEtZAGvSK2-yJpriNfch4yiec2J-",
        image: "image/178382346834.png",
        description: "Nộp bài tập qua Google Drive"
    }
];

// Hàm render nội dung
function renderItems(containerId, items) {
    const container = document.getElementById(containerId);
    items.forEach(item => {
        const box = document.createElement('div');
        box.className = 'bento-box';

        // Chuẩn bị danh sách link (ưu tiên item.url, hoặc dùng item.links array) — tối đa 3
        const linksArr = [];
        if (item.url) {
            linksArr.push({ label: 'Link', url: item.url });
        }
        if (Array.isArray(item.links)) {
            item.links.slice(0, 3).forEach(l => {
                // nếu đã có url trùng lặp, vẫn thêm; bạn có thể điều chỉnh logic nếu cần
                linksArr.push({ label: l.label || 'Link', url: l.url });
            });
        }

        // format **bold** -> <strong>bold</strong>
        function formatDescription(desc) {
            return String(desc).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        }

        const linksHtml = linksArr.map((l, i) =>
            `<a href="${l.url}" target="_blank" rel="noopener noreferrer">${linksArr.length>1 ? (i+1)+'. ' : ''}${l.label}</a>`
        ).join(' ');

        const descHtml = formatDescription(item.description);

        box.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
        `;
        container.appendChild(box);
    });
}

// Render thông báo và sự kiện
renderItems('updates', updates);
renderItems('classs', classs);