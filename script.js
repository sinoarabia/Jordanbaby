// 安曼店址选项配置及初始模拟票数
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 342 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 215 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 480 },
    { id: 'tlaalali', name: "Tla' Al-Ali", nameAr: 'تلاع العلي', initialVotes: 189 }
];

const gridContainer = document.getElementById('voting-grid');
const thankYouMsg = document.getElementById('thank-you-msg');

function getTotalVotes() {
    return locations.reduce((total, loc) => {
        const savedVotes = parseInt(localStorage.getItem(`votes_${loc.id}`)) || loc.initialVotes;
        return total + savedVotes;
    }, 0);
}

function renderVotingCards() {
    gridContainer.innerHTML = ''; 
    const totalVotes = getTotalVotes();
    const hasVoted = localStorage.getItem('jordanbaby_has_voted') === 'true';

    locations.forEach(loc => {
        const currentVotes = parseInt(localStorage.getItem(`votes_${loc.id}`)) || loc.initialVotes;
        const percentage = totalVotes === 0 ? 0 : Math.round((currentVotes / totalVotes) * 100);

        const card = document.createElement('div');
        card.className = 'vote-card';

        // 彻底移除了这里的中文，保留纯粹的阿拉伯语和英语
        card.innerHTML = `
            <h3 dir="rtl">${loc.nameAr}</h3>
            <p>${loc.name}</p>
            <div class="vote-bar-container">
                <div class="vote-bar" style="width: ${percentage}%"></div>
            </div>
            <p>${currentVotes} Votes (${percentage}%)</p>
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

function submitVote(locationId) {
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("You have already voted! !لقد قمت بالتصويت بالفعل");
        return;
    }

    const location = locations.find(l => l.id === locationId);
    let currentVotes = parseInt(localStorage.getItem(`votes_${location.id}`)) || location.initialVotes;
    currentVotes++;
    
    localStorage.setItem(`votes_${location.id}`, currentVotes);
    localStorage.setItem('jordanbaby_has_voted', 'true');

    renderVotingCards();
}

document.addEventListener('DOMContentLoaded', renderVotingCards);
