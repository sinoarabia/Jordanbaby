// 安曼 6 个黄金店址选项配置（初始票数设定为等额，确保初始显示约为 16.6%）
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 100 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 100 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 100 },
    { id: 'khalda', name: 'Khalda', nameAr: 'خلدا', initialVotes: 100 },
    { id: 'umuthaina', name: 'Um Uthaina', nameAr: 'أم أذينة', initialVotes: 100 },
    { id: 'rabieh', name: 'Al-Rabieh', nameAr: 'الرابية', initialVotes: 100 }
];

const gridContainer = document.getElementById('voting-grid');
const thankYouMsg = document.getElementById('thank-you-msg');

// 计算真实总票数（基础票数 + 用户真实投票数）
function getTotalVotes() {
    return locations.reduce((total, loc) => {
        // 从本地存储读取真实票数，如果没有则使用基础票数
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
        
        // 计算真实百分比，保留一位小数让数据显得更真实，如果总票数为0则显示0%
        let percentage = 0;
        if (totalVotes > 0) {
            percentage = ((currentVotes / totalVotes) * 100).toFixed(1); 
            // 如果是以 .0 结尾，去掉 .0 以保持界面整洁
            if (percentage.endsWith('.0')) {
                percentage = parseInt(percentage);
            }
        }

        const card = document.createElement('div');
        card.className = 'vote-card';

        // 彻底移除中文，纯阿拉伯语和英语排版
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

// 处理真实的投票点击事件
function submitVote(locationId) {
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("You have already voted! !لقد قمت بالتصويت بالفعل");
        return;
    }

    // 找到被投票的地点
    const location = locations.find(l => l.id === locationId);
    
    // 获取当前票数并在真实的点击下 +1
    let currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${location.id}`)) || location.initialVotes;
    currentVotes++;
    
    // 更新用户的本地浏览器存储
    localStorage.setItem(`jordanbaby_votes_${location.id}`, currentVotes);
    localStorage.setItem('jordanbaby_has_voted', 'true');

    // 重新渲染UI，展示真实增加后的百分比
    renderVotingCards();
}

// 页面加载完成后执行渲染
document.addEventListener('DOMContentLoaded', renderVotingCards);
