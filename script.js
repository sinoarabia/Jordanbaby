/* =========================================
   全局重置与基础设置
   ========================================= */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

body {
    background-color: #fcf9f2; 
    color: #4a4a4a;
    line-height: 1.6;
    overflow-x: hidden; 
}

/* =========================================
   头部样式
   ========================================= */
.header {
    text-align: center;
    padding: 30px 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.logo {
    font-size: 2.5rem;
    color: #c98a5c; 
    margin-bottom: 5px;
    letter-spacing: 2px;
}

.sub-logo {
    font-size: 1.6rem;
    color: #b07548;
    margin-bottom: 20px;
    font-weight: 600;
}

.slogan-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 0 10px; 
}

.slogan {
    font-size: 1.1rem;
    margin-bottom: 10px;
    font-weight: 500;
}

.slogan.ar {
    font-size: 1.3rem; 
    color: #2c3e50;
    line-height: 1.5; 
}

.slogan.en {
    color: #7f8c8d;
    line-height: 1.4;
}

/* =========================================
   核心主图样式
   ========================================= */
.hero {
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.main-image {
    width: 100%;
    border-radius: 15px;
    box-shadow: 0 8px 20px rgba(0,0,0,0.1);
    display: block;
}

/* =========================================
   服务卡片布局 (响应式优化)
   ========================================= */
.services {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
    max-width: 1200px;
    margin: 20px auto 40px; 
    padding: 0 20px;
}

.service-card {
    background: #ffffff;
    flex: 1;
    min-width: 300px; 
    padding: 30px 20px; 
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.04);
    border-top: 4px solid #e0c3a8;
    transition: transform 0.3s ease;
}

.service-card:hover {
    transform: translateY(-5px);
}

.service-card.highlight {
    border-top: 4px solid #e74c3c; 
    background: #fffdfa;
}

.service-card h2 {
    font-size: 1.3rem; 
    color: #333;
    margin-bottom: 5px;
    text-align: center;
    direction: rtl; /* 保证标题栏文字在左，Emoji在最右 */
}

.service-card .subtitle {
    font-size: 0.95rem;
    color: #888;
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    text-align: center;
}

.subtitle-group {
    border-bottom: 1px solid #eee;
    margin-bottom: 20px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: column;
    align-items: center; 
}

.subtitle-group .ar-sub { 
    border-bottom: none; 
    margin-bottom: 2px; 
    padding-bottom: 0; 
    color:#555; 
    font-weight: bold;
}

.subtitle-group .en-sub { 
    border-bottom: none; 
    margin-bottom: 0; 
    padding-bottom: 0; 
}

.service-card ul {
    list-style: none;
    padding: 0;
}

/* =========================================
   阿拉伯双语列表核心优化 (Emoji强制定右侧)
   ========================================= */
.bilingual-item {
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 1px dashed #f0e6da;
    display: flex;
    flex-direction: column;
    align-items: center; 
    text-align: center;
}

.bilingual-item:last-child {
    border-bottom: none;
    margin-bottom: 0;
}

.ar-text {
    font-size: 1.1rem; 
    color: #2c3e50;
    font-weight: 600;
    margin-bottom: 4px;
    
    /* 核心修复：强制在一行内从右向左排列，锁定Emoji在右边 */
    display: inline-flex; 
    align-items: center;
    justify-content: center;
    gap: 6px; 
    direction: rtl; 
}

.en-text {
    font-size: 0.85rem; 
    color: #7f8c8d;
}

/* =========================================
   投票区样式
   ========================================= */
.voting-section {
    background-color: #f4eee6;
    padding: 40px 20px; 
    text-align: center;
    margin-top: 40px;
}

.voting-header {
    margin-bottom: 25px;
}

.voting-header h2 {
    font-size: 1.8rem;
    color: #2c3e50;
}

.voting-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
    max-width: 1000px;
    margin: 0 auto;
}

.vote-card {
    background: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
}

.vote-card h3 {
    font-size: 1.4rem;
    margin-bottom: 5px;
    color: #333;
}

.vote-card p {
    color: #666;
    margin-bottom: 15px;
}

.vote-bar-container {
    width: 100%;
    background-color: #e0e0e0;
    border-radius: 20px;
    height: 12px; 
    margin-bottom: 15px;
    overflow: hidden;
}

.vote-bar {
    height: 100%;
    background-color: #c98a5c;
    width: 0%; 
    transition: width 1s ease-in-out;
}

.vote-btn {
    background-color: #2c3e50;
    color: white;
    border: none;
    padding: 10px 25px;
    border-radius: 25px;
    font-size: 1rem;
    cursor: pointer;
    transition: background 0.3s;
    font-weight: bold;
    width: 100%; 
    max-width: 200px; 
}

.vote-btn:hover {
    background-color: #1a252f;
}

.vote-btn:disabled {
    background-color: #95a5a6;
    cursor: not-allowed;
}

.hidden-msg {
    display: none;
    color: #27ae60;
    font-size: 1.1rem;
    font-weight: bold;
    margin-top: 25px;
    line-height: 1.5;
}

/* =========================================
   页脚与高清国旗样式
   ========================================= */
footer {
    text-align: center;
    padding: 30px 20px;
    background-color: #2c3e50; 
    color: #fff;
    font-size: 0.95rem;
    position: relative;
    z-index: 10;
}

.global-flags {
    margin-bottom: 15px;
    display: flex;
    justify-content: center;
    gap: 15px; 
    flex-wrap: wrap;
    align-items: center;
}

.global-flags .fi {
    width: 28px !important;
    height: 20px !important;
    border-radius: 2px;
    transition: transform 0.3s ease;
    cursor: default;
    box-shadow: 0 2px 4px rgba(0,0,0,0.3); 
}

.global-flags .fi:hover {
    transform: translateY(-3px) scale(1.15); 
}

footer p {
    color: #a0b2c6; 
    letter-spacing: 1px;
}

/* =========================================
   WhatsApp 悬浮组件核心样式 (完美适配手机版)
   ========================================= */
.whatsapp-widget {
    position: fixed;
    bottom: 25px; 
    right: 20px; 
    z-index: 9999;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
}

.wa-icon {
    background-color: #25D366;
    width: 60px; 
    height: 60px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(37, 211, 102, 0.4);
    animation: pulse-bounce 2s infinite; 
    transition: transform 0.3s ease;
    margin-top: 15px;
}

.wa-icon:hover {
    transform: scale(1.1);
}

.wa-icon svg {
    width: 35px; 
    height: 35px;
}

@keyframes pulse-bounce {
    0% { transform: scale(1) translateY(0); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
    50% { transform: scale(1.05) translateY(-8px); box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
    100% { transform: scale(1) translateY(0); box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
}

.wa-popup {
    display: none; 
    width: 300px; 
    background: #ffffff;
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    border: 1px solid #f0e6da;
    transform-origin: bottom right;
}

@media (max-width: 350px) {
    .wa-popup { width: 280px; }
}

.wa-popup.show {
    display: block;
    animation: slide-up 0.3s ease-out forwards;
}

@keyframes slide-up {
    from { opacity: 0; transform: translateY(20px) scale(0.9); }
    to { opacity: 1; transform: translateY(0) scale(1); }
}

.wa-popup-header {
    background: linear-gradient(135deg, #c98a5c, #b07548);
    color: white;
    padding: 15px;
    position: relative;
    text-align: center;
}

.wa-popup-header h4 {
    margin: 0;
    font-size: 1.2rem;
    color: white;
}

.wa-popup-header .en-title {
    font-size: 0.9rem;
    font-weight: 400;
    opacity: 0.9;
    color: white;
}

.wa-popup-close {
    position: absolute;
    top: 5px;
    left: 15px; 
    font-size: 1.6rem;
    cursor: pointer;
    color: rgba(255,255,255,0.8);
    transition: color 0.3s;
    line-height: 1;
}

.wa-popup-close:hover {
    color: white;
}

.wa-popup-body {
    padding: 20px 15px;
    text-align: center;
}

.wa-popup-body .ar-text-wa {
    font-weight: 600;
    color: #2c3e50;
    margin-bottom: 5px;
    font-size: 1.05rem;
}

.wa-popup-body .en-text-wa {
    font-size: 0.85rem;
    color: #7f8c8d;
    margin-bottom: 12px;
}

.wa-offer {
    background: #fdfbf7;
    border: 1.5px dashed #c98a5c;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
}

.wa-offer .highlight-offer {
    color: #d35400; 
    margin-bottom: 5px;
    font-size: 0.95rem;
}

.wa-offer .en-text-wa.highlight-offer {
    margin-bottom: 0;
    font-size: 0.8rem;
}

.wa-chat-btn {
    display: block;
    background-color: #25D366;
    color: white;
    text-decoration: none;
    padding: 12px;
    border-radius: 25px;
    font-weight: bold;
    font-size: 1rem;
    transition: background 0.3s, transform 0.3s;
    box-shadow: 0 4px 10px rgba(37, 211, 102, 0.3);
}

.wa-chat-btn:hover {
    background-color: #1ebe57;
    transform: translateY(-2px);
    color: white;
}
