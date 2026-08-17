document.addEventListener('DOMContentLoaded', () => {
    const bookContainer = document.getElementById('book-container');

    if (typeof menuData === 'undefined' || typeof St === 'undefined') {
        bookContainer.innerHTML = '<p style="text-align:center; padding: 20px; color: white;">Veriler veya kütüphane yüklenemedi.</p>';
        return;
    }

    // 1. Generate HTML for pages
    let htmlContent = '';

    // Cover Page
    htmlContent += `
        <div class="page">
            <div class="page-content cover-page">
                <div class="logo-icon">☕</div>
                <h1>KALE SERENTİ</h1>
                <h1>CAFEMİZE</h1>
                <h1>HOŞGELDİNİZ</h1>
                <br>
                <p>Menüyü Görmek İçin Kaydırın</p>
            </div>
        </div>
    `;

    // Category Pages
    menuData.forEach((category) => {
        const itemsPerPage = 6;
        for (let i = 0; i < category.items.length; i += itemsPerPage) {
            const pageItems = category.items.slice(i, i + itemsPerPage);
            
            let itemsHtml = pageItems.map(item => `
                <div class="menu-item">
                    <img src="${item.image}" alt="${item.name}" class="item-img" loading="lazy">
                    <div class="item-details">
                        <h3>${item.name}</h3>
                        <div class="item-price">${item.price} ₺</div>
                    </div>
                </div>
            `).join('');

            const titleSuffix = i === 0 ? '' : ' <span style="font-size: 0.9rem; font-weight: normal; color: #888;">(Devamı)</span>';

            htmlContent += `
                <div class="page">
                    <div class="page-content">
                        <div class="category-header">
                            <span style="font-size: 2rem;">${category.icon}</span>
                            <h2>${category.title}${titleSuffix}</h2>
                        </div>
                        <div class="menu-list">
                            ${itemsHtml}
                        </div>
                    </div>
                </div>
            `;
        }
    });
    
    // Add an end page (back cover)
    htmlContent += `
        <div class="page">
            <div class="page-content cover-page" style="background: var(--bg-color);">
                <h2 style="color: white; margin-bottom: 20px;">Afiyet Olsun!</h2>
                <p style="color: rgba(255,255,255,0.7);">Bizi tercih ettiğiniz için teşekkür ederiz.</p>
                <div class="logo-icon" style="margin-top: 30px;">🌟</div>
            </div>
        </div>
    `;

    bookContainer.innerHTML = htmlContent;

    // 2. Initialize PageFlip
    // Wait a brief moment to ensure DOM is ready and images start loading
    setTimeout(() => {
        const pageFlip = new St.PageFlip(bookContainer, {
            width: window.innerWidth > 600 ? 400 : window.innerWidth, // base width
            height: window.innerHeight, // base height
            size: "stretch", // stretch to fill container
            minWidth: 320,
            maxWidth: 1000,
            minHeight: 400,
            maxHeight: 2000,
            showCover: true,
            mobileScrollSupport: false,
            usePortrait: true, // Only show one page at a time on portrait
            maxShadowOpacity: 0.3, // Shadow intensity when flipping
            showPageCorners: false, // Prevent page from moving/folding on hover
        });

        // Load the pages
        const pages = document.querySelectorAll('.page');
        pageFlip.loadFromHTML(pages);

        // Hide swipe hint when user starts flipping
        pageFlip.on('flip', (e) => {
            const hint = document.getElementById('swipe-hint');
            if (hint) {
                hint.style.display = 'none';
            }
        });
        
        // Handle window resize
        window.addEventListener('resize', () => {
             pageFlip.update();
        });
        
    }, 100);
});
