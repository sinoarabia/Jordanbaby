// 安曼 6 个黄金店址选项配置
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 100 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 100 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 100 },
    { id: 'khalda', name: 'Khalda', nameAr: 'خلدا', initialVotes: 100 },
    { id: 'umuthaina', name: 'Um Uthaina', nameAr: 'أم أذينة', initialVotes: 100 },
    { id: 'rabieh', name: 'Al-Rabieh', nameAr: 'الرابية', initialVotes: 100 }
];

// 【替换这里】：换成你部署 Google Apps Script 后得到的真实 Web app URL
const GOOGLE_API_URL = 'https://script.google.com/macros/s/AKfycb...https://script.google.com/macros/s/AKfycbw1zEsshLABqNNIgdCH4MXxTFjFv_ij2bscobN3fONehZ84USByJjSYmb7ZH3BYSHxS/exec.../exec';

let selectedLocationObj = null;
const gridContainer = document.getElementById('voting-grid');
const thankYouMsg = document.getElementById('thank-you-msg');

function getTotalVotes() {
    return locations.reduce((total, loc) => {
        const savedVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${loc.id}`)) || loc.initialVotes;
        return total + savedVotes;
    }, 0);
}

function renderVotingCards() {
    gridContainer.innerHTML = ''; 
    const totalVotes = getTotalVotes();
    const hasVoted = localStorage.getItem('jordanbaby_has_voted') === 'true';

    locations.forEach(loc => {
        const currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${loc.id}`)) || loc.initialVotes;
        
        let percentage = 0;
        if (totalVotes > 0) {
            percentage = ((currentVotes / totalVotes) * 100).toFixed(1); 
            if (percentage.endsWith('.0')) {
                percentage = parseInt(percentage);
            }
        }

        const card = document.createElement('div');
        card.className = 'vote-card';

        card.innerHTML = `
            <h3>${loc.name}</h3>
            <p dir="rtl" style="font-size: 1.2rem; font-weight: bold; color: #555;">${loc.nameAr}</p>
            <div class="vote-bar-container">
                <div class="vote-bar" style="width: ${percentage}%"></div>
            </div>
            <p style="font-size: 0.95rem; color: #777;">${currentVotes} Votes (${percentage}%)</p>
            <button class="vote-btn" onclick="prepareVote('${loc.id}')" ${hasVoted ? 'disabled' : ''}>
                ${hasVoted ? 'تم التصويت / Voted' : 'تصويت / Vote'}
            </button>
        `;
        gridContainer.appendChild(card);
    });

    if (hasVoted) {
        thankYouMsg.style.display = 'block';
    }
}

// 第一步：用户点击投票，弹出线索收集表单而不是直接完成
function prepareVote(locationId) {
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("You have already voted! !لقد قمت بالتصويت بالفعل");
        return;
    }
    selectedLocationObj = locations.find(l => l.id === locationId);
    
    // 自动将下拉框默认选中用户选中的区域
    const areaSelect = document.getElementById('lead-area');
    if(areaSelect) {
        areaSelect.value = selectedLocationObj.name;
    }

    // 显示弹窗
    document.getElementById('lead-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('lead-modal').style.display = 'none';
}

// 第二步：用户提交详细表单后，发送到 Google 表格并完成投票
async function submitLeadData(event) {
    event.preventDefault();

    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const babyAge = document.getElementById('lead-baby-age').value;
    const area = document.getElementById('lead-area').value;

    // 1. 发送数据到 Google 表格
    try {
        if(GOOGLE_API_URL && !GOOGLE_API_URL.includes('你的真实链接')) {
            await fetch(GOOGLE_API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "通知说明": "🎁 收到一份带详细客户画像的投票线索！",
                    "投票区域": selectedLocationObj ? selectedLocationObj.name : area,
                    "姓名": name,
                    "WhatsApp": phone,
                    "宝宝年龄段": babyAge,
                    "居住区域": area,
                    "提交时间": new Date().toLocaleString()
                })
            });
        }
    } catch (error) {
        console.error("数据写入表格失败", error);
    }

    // 2. 更新本地状态并刷新投票统计
    if (selectedLocationObj) {
        let currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${selectedLocationObj.id}`)) || selectedLocationObj.initialVotes;
        currentVotes++;
        localStorage.setItem(`jordanbaby_votes_${selectedLocationObj.id}`, currentVotes);
    }
    
    localStorage.setItem('jordanbaby_has_voted', 'true');

    // 关闭弹窗并刷新页面显示
    closeModal();
    renderVotingCards();
    alert("شكراً لك! تم تسجيل صوتك بنجاح والحصول على خصم VIP.");
}

function toggleWaPopup() {
    const popup = document.getElementById('wa-popup');
    popup.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', renderVotingCards);
