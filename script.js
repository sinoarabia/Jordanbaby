// 安曼 6 个黄金店址选项配置
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 100 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 100 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 100 },
    { id: 'khalda', name: 'Khalda', nameAr: 'خلدا', initialVotes: 100 },
    { id: 'umuthaina', name: 'Um Uthaina', nameAr: 'أم أذينة', initialVotes: 100 },
    { id: 'rabieh', name: 'Al-Rabieh', nameAr: 'الرابية', initialVotes: 100 }
];

// 使用您最新提供的真实 Web app URL
const GOOGLE_API_URL = 'https://script.google.com/macros/s/AKfycbxeelnQQeCvsOPapmteTxrbDiQRgOofoF01tW04lEy2-ROysz65clH_WpEBfKnUPbcu/exec';

let selectedLocationObj = null;

function getTotalVotes() {
    return locations.reduce((total, loc) => {
        const savedVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${loc.id}`)) || loc.initialVotes;
        return total + savedVotes;
    }, 0);
}

function renderVotingCards() {
    const gridContainer = document.getElementById('voting-grid');
    const thankYouMsg = document.getElementById('thank-you-msg');
    
    // 安全检查，防止页面未加载完全时报错
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
            <button class="vote-btn" onclick="prepareVote('${loc.id}')" ${hasVoted ? 'disabled' : ''}>
                ${hasVoted ? 'تم التصويت / Voted' : 'تصويت / Vote'}
            </button>
        `;
        gridContainer.appendChild(card);
    });

    if (hasVoted && thankYouMsg) {
        thankYouMsg.style.display = 'block';
    }
}

function prepareVote(locationId) {
    if (localStorage.getItem('jordanbaby_has_voted') === 'true') {
        alert("You have already voted! !لقد قمت بالتصويت بالفعل");
        return;
    }
    selectedLocationObj = locations.find(l => l.id === locationId);
    
    const areaSelect = document.getElementById('lead-area');
    if(areaSelect) {
        areaSelect.value = selectedLocationObj.name;
    }

    const modal = document.getElementById('lead-modal');
    if(modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('lead-modal');
    if(modal) modal.style.display = 'none';
}

async function submitLeadData(event) {
    event.preventDefault();
    
    // 增加防重复点击体验
    const submitBtn = document.querySelector('.submit-lead-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'جاري الإرسال... / Sending...';
    submitBtn.disabled = true;

    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const babyAge = document.getElementById('lead-baby-age').value;
    const area = document.getElementById('lead-area').value;

    // 组装表单数据
    const formData = new URLSearchParams();
    formData.append("通知说明", "🎁 收到一份带详细客户画像的投票线索！");
    formData.append("投票区域", selectedLocationObj ? selectedLocationObj.name : area);
    formData.append("姓名", name);
    formData.append("WhatsApp", phone);
    formData.append("宝宝年龄段", babyAge);
    formData.append("居住区域", area);
    formData.append("提交时间", new Date().toLocaleString());

    // 发送数据
    try {
        if(GOOGLE_API_URL) {
            await fetch(GOOGLE_API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 
                    'Content-Type': 'application/x-www-form-urlencoded' 
                },
                body: formData.toString() 
            });
        }
    } catch (error) {
        console.error("数据写入表格失败", error);
    } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    }

    // 更新本地投票数字
    if (selectedLocationObj) {
        let currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${selectedLocationObj.id}`)) || selectedLocationObj.initialVotes;
        currentVotes++;
        localStorage.setItem(`jordanbaby_votes_${selectedLocationObj.id}`, currentVotes);
    }
    
    localStorage.setItem('jordanbaby_has_voted', 'true');

    closeModal();
    renderVotingCards();
    alert("شكراً لك! تم تسجيل صوتك بنجاح والحصول على خصم VIP.");
}

function toggleWaPopup() {
    const popup = document.getElementById('wa-popup');
    if(popup) popup.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', renderVotingCards);
