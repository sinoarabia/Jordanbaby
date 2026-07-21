// 安曼 6 个黄金店址选项配置
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 100 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 100 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 100 },
    { id: 'khalda', name: 'Khalda', nameAr: 'خلدا', initialVotes: 100 },
    { id: 'umuthaina', name: 'Um Uthaina', nameAr: 'أم أذينة', initialVotes: 100 },
    { id: 'rabieh', name: 'Al-Rabieh', nameAr: 'الرابية', initialVotes: 100 }
];

// 你的专属 Formspree 数据接收接口
const FORMSPREE_URL = 'https://formspree.io/f/mkodzwla';

const gridContainer = document.getElementById('voting-grid');
const thankYouMsg = document.getElementById('thank-you-msg');

// 计算真实总票数
function getTotalVotes() {
    return locations.reduce((total, loc) => {
        const savedVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${loc.id}`)) || loc.initialVotes;
        return total + savedVotes;
    }, 0);
}

// 渲染投票卡片
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
            <button class="vote-btn" onclick="submitVote('${loc.id}')" ${hasVoted ? 'disabled' : ''}>
                ${hasVoted ? 'تم التصويت / Voted' : 'تصويت / Vote'}
            </button>
        `;
        gridContainer.appendChild(card);
    });

    if (hasVoted) {
        thankYouMsg.style.display = 'block';
    }
}

// 处理投票点击（加入后台数据发送功能）
async function submitVote(locationId) {
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("You have already voted! !لقد قمت بالتصويت بالفعل");
        return;
    }

    const location = locations.find(l => l.id === locationId);

    // 1. 核心商业逻辑：将投票结果发送到你的邮箱后台
    try {
        if(FORMSPREE_URL && !FORMSPREE_URL.includes('你的表单ID')) {
            await fetch(FORMSPREE_URL, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "通知说明": "🎉 收到一份新的选址投票！(Jordan Baby Care)",
                    "顾客投票区域": location.name,
                    "提交时间": new Date().toLocaleString()
                })
            });
        }
    } catch (error) {
        console.error("后台统计连接失败，但不影响前台顾客体验", error);
    }

    // 2. 更新网页前端显示（防止同一个人无限刷票）
    let currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${location.id}`)) || location.initialVotes;
    currentVotes++;
    
    localStorage.setItem(`jordanbaby_votes_${location.id}`, currentVotes);
    localStorage.setItem('jordanbaby_has_voted', 'true');

    renderVotingCards();
}

// 控制 WhatsApp 弹窗显示/隐藏
function toggleWaPopup() {
    const popup = document.getElementById('wa-popup');
    popup.classList.toggle('show');
}

// 页面加载完成后渲染
document.addEventListener('DOMContentLoaded', renderVotingCards);
