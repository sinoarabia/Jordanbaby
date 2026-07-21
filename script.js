// 安曼 6 个黄金店址选项配置
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 100 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 100 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 100 },
    { id: 'khalda', name: 'Khalda', nameAr: 'خلدا', initialVotes: 100 },
    { id: 'umuthaina', name: 'Um Uthaina', nameAr: 'أم أذينة', initialVotes: 100 },
    { id: 'rabieh', name: 'Al-Rabieh', nameAr: 'الرابية', initialVotes: 100 }
];

// 您的 WhatsApp 商业客服号码 (包含国家代码，不带加号)
const WHATSAPP_NUMBER = '962781511811';

function getTotalVotes() {
    return locations.reduce((total, loc) => {
        const savedVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${loc.id}`)) || loc.initialVotes;
        return total + savedVotes;
    }, 0);
}

function renderVotingCards() {
    const gridContainer = document.getElementById('voting-grid');
    const thankYouMsg = document.getElementById('thank-you-msg');
    
    if (!gridContainer) return; 

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
            
            <!-- 按钮文案更新为：通过 WhatsApp 投票 -->
            <button class="vote-btn" onclick="prepareVote('${loc.id}')" ${hasVoted ? 'disabled' : ''}>
                ${hasVoted ? 'تم التصويت / Voted' : 'تصويت عبر واتساب / Vote via WA'}
            </button>
        `;
        gridContainer.appendChild(card);
    });

    if (hasVoted && thankYouMsg) {
        thankYouMsg.style.display = 'block';
    }
}

// ==========================================
// 核心逻辑改造：直接记票并一键唤起 WhatsApp
// ==========================================
function prepareVote(locationId) {
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("You have already voted! !لقد قمت بالتصويت بالفعل");
        return;
    }
    
    const selectedLocationObj = locations.find(l => l.id === locationId);

    // 1. 立即在网站本地更新投票数字，并打上“已投票”记号
    let currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${selectedLocationObj.id}`)) || selectedLocationObj.initialVotes;
    currentVotes++;
    localStorage.setItem(`jordanbaby_votes_${selectedLocationObj.id}`, currentVotes);
    localStorage.setItem('jordanbaby_has_voted', 'true');

    // 2. 刷新页面，让客户看到进度条瞬间上涨的爽快反馈
    renderVotingCards();

    // 3. 组装给客户自动填好的 WhatsApp 消息
    // 阿拉伯语意思是：你好，我刚刚投票给了(选择的区域)！我想领取新店开业的 50% VIP 折扣。
    const message = `مرحباً، لقد قمت بالتصويت لفرع (${selectedLocationObj.nameAr} - ${selectedLocationObj.name})! 🎁\nأريد الحصول على خصم 50% (VIP) عند الافتتاح.`;

    // 4. 生成官方安全的跳转链接并直接拉起 WhatsApp
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    
    // 打开 WhatsApp 聊天界面
    window.open(whatsappUrl, '_blank');
}

function toggleWaPopup() {
    const popup = document.getElementById('wa-popup');
    if(popup) popup.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', renderVotingCards);
