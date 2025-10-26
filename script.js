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
        description: "Faculty of Public Relations and Communication, Van Lang University từ Facebook.."
    }
];

// Dữ liệu sự kiện (dễ dàng tùy chỉnh)
const classs = [
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
        box.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <h3>${item.name}</h3>
            <p>${item.description}</p>
            <a href="${item.url}">Link</a>
        `;
        container.appendChild(box);
    });
}

// Render thông báo và sự kiện
renderItems('updates', updates);
renderItems('classs', classs);