// 安曼 6 个黄金店址选项配置
const locations = [
    { id: 'abdoun', name: 'Abdoun', nameAr: 'عبدون', initialVotes: 100 },
    { id: 'dabouq', name: 'Dabouq', nameAr: 'دابوق', initialVotes: 100 },
    { id: 'sweifieh', name: 'Al-Sweifieh', nameAr: 'الصويفية', initialVotes: 100 },
    { id: 'khalda', name: 'Khalda', nameAr: 'خلدا', initialVotes: 100 },
    { id: 'umuthaina', name: 'Um Uthaina', nameAr: 'أم أذينة', initialVotes: 100 },
    { id: 'rabieh', name: 'Al-Rabieh', nameAr: 'الرابية', initialVotes: 100 }
];

// 您的 Google 表格接收接口
const GOOGLE_API_URL = 'https://script.google.com/macros/s/AKfycbwcYit_ecnYCue-ZsmoTTozQFaxyhBQGd5dNaqT2ysgVLPKIJir3hnrk_ZyJze09t0/exec';

// 您的 WhatsApp 商业客服号码 (包含国家代码，不带加号)
const WHATSAPP_NUMBER = '962781511811';

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
    
    // 弹窗前，自动把下拉框选到客户点击的区域
    const areaSelect = document.getElementById('lead-area');
    if(areaSelect) {
        areaSelect.value = selectedLocationObj.name;
    }

    // 弹出信息填写表单
    const modal = document.getElementById('lead-modal');
    if(modal) modal.style.display = 'flex';
}

function closeModal() {
    const modal = document.getElementById('lead-modal');
    if(modal) modal.style.display = 'none';
}

async function submitLeadData(event) {
    event.preventDefault(); // 阻止表单默认刷新
    
    const submitBtn = document.querySelector('.submit-lead-btn');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'جاري الإرسال... / Sending...';
    submitBtn.disabled = true;

    // 获取客户在表单里填写的所有信息
    const name = document.getElementById('lead-name').value;
    const phone = document.getElementById('lead-phone').value;
    const babyAge = document.getElementById('lead-baby-age').value;
    const area = document.getElementById('lead-area').value;
    const areaAr = selectedLocationObj ? selectedLocationObj.nameAr : area;

    // ==========================================
    // 动作一：智能组装并瞬间唤起 WhatsApp (防浏览器拦截拦截)
    // ==========================================
    const waMessage = `مرحباً، لقد قمت بالتصويت لفرع (${areaAr} - ${area})! 🎁\nأريد الحصول على خصم 50% (VIP).\n\n📝 بياناتي:\nالاسم (Name): ${name}\nعمر الطفل (Baby Age): ${babyAge}`;
    
    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waMessage)}`;
    
    // 立即打开 WhatsApp，这一步必须放在 fetch 前面，否则浏览器可能拦截新标签页
    window.open(whatsappUrl, '_blank');

    // ==========================================
    // 动作二：静默发送数据到 Google 表格做双重备份
    // ==========================================
    const formData = new URLSearchParams();
    formData.append("通知说明", "🎁 收到一份带详细客户画像的投票线索！");
    formData.append("投票区域", selectedLocationObj ? selectedLocationObj.name : area);
    formData.append("姓名", name);
    formData.append("WhatsApp", phone);
    formData.append("宝宝年龄段", babyAge);
    formData.append("居住区域", area);
    formData.append("提交时间", new Date().toLocaleString());

    try {
        if(GOOGLE_API_URL) {
            // 让浏览器后台静默发送，不阻塞页面交互
            fetch(GOOGLE_API_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: formData.toString() 
            }).catch(e => console.error("静默发送表格失败", e));
        }
    } catch (error) {
        console.error("网络异常", error);
    }

    // ==========================================
    // 动作三：更新本地投票进度条
    // ==========================================
    if (selectedLocationObj) {
        let currentVotes = parseInt(localStorage.getItem(`jordanbaby_votes_${selectedLocationObj.id}`)) || selectedLocationObj.initialVotes;
        currentVotes++;
        localStorage.setItem(`jordanbaby_votes_${selectedLocationObj.id}`, currentVotes);
    }
    
    localStorage.setItem('jordanbaby_has_voted', 'true');

    // 恢复按钮状态、关闭弹窗、刷新页面
    submitBtn.innerHTML = originalBtnText;
    submitBtn.disabled = false;
    closeModal();
    renderVotingCards();
}

function toggleWaPopup() {
    const popup = document.getElementById('wa-popup');
    if(popup) popup.classList.toggle('show');
}

document.addEventListener('DOMContentLoaded', renderVotingCards);
