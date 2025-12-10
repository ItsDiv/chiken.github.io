// 챕터 전환 함수
function showChapter(chapterNumber) {
    // 모든 챕터 숨기기
    const chapters = document.querySelectorAll('.chapter');
    chapters.forEach(chapter => {
        chapter.classList.add('hidden');
    });

    // 모든 네비게이션 버튼 비활성화
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => {
        btn.classList.remove('active');
    });

    // 선택된 챕터 보이기
    const selectedChapter = document.getElementById(`chapter${chapterNumber}`);
    if (selectedChapter) {
        selectedChapter.classList.remove('hidden');
    }

    // 선택된 버튼 활성화
    const selectedButton = document.querySelector(`.nav-btn:nth-child(${chapterNumber})`);
    if (selectedButton) {
        selectedButton.classList.add('active');
    }

    // 스크롤을 챕터 시작 위치로 이동
    const chapterHeader = selectedChapter.querySelector('.chapter-header');
    if (chapterHeader) {
        chapterHeader.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// 스토리 카드 애니메이션
function animateCards() {
    const cards = document.querySelectorAll('.story-card');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', () => {
    // 첫 번째 챕터 표시
    showChapter(1);
    
    // 카드 애니메이션 초기화
    animateCards();
    
    // 스크롤 시 헤더 효과
    let lastScroll = 0;
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });
});

// 키보드 네비게이션 (화살표 키로 챕터 이동)
document.addEventListener('keydown', (e) => {
    const activeButton = document.querySelector('.nav-btn.active');
    const buttons = Array.from(document.querySelectorAll('.nav-btn'));
    const currentIndex = buttons.indexOf(activeButton);
    
    if (e.key === 'ArrowRight' && currentIndex < buttons.length - 1) {
        showChapter(currentIndex + 2);
    } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        showChapter(currentIndex);
    }
});

// 이미지 로드 실패 시 플레이스홀더 표시
document.querySelectorAll('.image-placeholder img').forEach(img => {
    img.addEventListener('error', function() {
        this.style.display = 'none';
        this.nextElementSibling.style.display = 'flex';
    });
});
