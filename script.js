// 安曼店址选项配置及初始模拟票数
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 342 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 215 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 480 },
    { id: 'tlaalali', name: "Tla' Al-Ali", nameAr: 'تلاع العلي', initialVotes: 189 }
];

const gridContainer = document.getElementById('voting-grid');
const thankYouMsg = document.getElementById('thank-you-msg');

// 计算总票数，用于显示比例条
function getTotalVotes() {
    return locations.reduce((total, loc) => {
        const savedVotes = parseInt(localStorage.getItem(`votes_${loc.id}`)) || loc.initialVotes;
        return total + savedVotes;
    }, 0);
}

// 渲染投票卡片
function renderVotingCards() {
    gridContainer.innerHTML = ''; // 清空容器
    const totalVotes = getTotalVotes();
    const hasVoted = localStorage.getItem('jordanbaby_has_voted') === 'true';

    locations.forEach(loc => {
        // 获取本地存储的票数，如果没有则使用初始票数
        const currentVotes = parseInt(localStorage.getItem(`votes_${loc.id}`)) || loc.initialVotes;
        const percentage = totalVotes === 0 ? 0 : Math.round((currentVotes / totalVotes) * 100);

        const card = document.createElement('div');
        card.className = 'vote-card';

        card.innerHTML = `
            <h3>${loc.name}</h3>
            <p dir="rtl">${loc.nameAr}</p>
            <div class="vote-bar-container">
                <div class="vote-bar" style="width: ${percentage}%"></div>
            </div>
            <p>${currentVotes} 票 (${percentage}%)</p>
            <button class="vote-btn" onclick="submitVote('${loc.id}')" ${hasVoted ? 'disabled' : ''}>
                ${hasVoted ? '已投票 Voted' : '投票 Vote / تصويت'}
            </button>
        `;
        gridContainer.appendChild(card);
    });

    if (hasVoted) {
        thankYouMsg.style.display = 'block';
    }
}

// 处理投票点击事件
function submitVote(locationId) {
    // 检查是否已经投过票
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("您已经投过票了！You have already voted!");
        return;
    }

    // 找到被投票的地点并增加票数
    const location = locations.find(l => l.id === locationId);
    let currentVotes = parseInt(localStorage.getItem(`votes_${location.id}`)) || location.initialVotes;
    currentVotes++;
    
    // 更新本地存储
    localStorage.setItem(`votes_${location.id}`, currentVotes);
    localStorage.setItem('jordanbaby_has_voted', 'true');

    // 重新渲染UI
    renderVotingCards();
}

// 页面加载完成后执行渲染
document.addEventListener('DOMContentLoaded', renderVotingCards);