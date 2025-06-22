// DOM(문서)이 완전히 로드된 후에 모든 코드를 실행합니다.
document.addEventListener('DOMContentLoaded', () => {

  // --- 기능 1: 스크롤에 반응하는 부드러운 애니메이션 ---
  
  // 애니메이션을 적용할 대상을 모두 찾습니다.
  const animatedElements = document.querySelectorAll('.project-item, .container1, .container2');

  // 해당 요소가 없으면 여기서 멈춥니다.
  if (animatedElements.length > 0) {
    // 각 요소에 애니메이션을 위한 기본 클래스를 추가합니다.
    animatedElements.forEach(el => {
      el.classList.add('fade-in-element');
    });

    // 화면에 요소가 나타나는지 감지하는 Intersection Observer를 설정합니다.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // 요소가 화면에 보이면 'visible' 클래스를 추가합니다.
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // 한 번 나타난 요소는 계속 보이도록 관찰을 멈춥니다.
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1 // 요소가 10% 보였을 때 실행
    });

    // 모든 대상 요소를 관찰 시작합니다.
    animatedElements.forEach(el => observer.observe(el));
  }


  // --- 기능 2: '맨 위로 가기' 버튼 동적 생성 및 제어 ---

  // 버튼 요소를 자바스크립트로 직접 만듭니다.
  const backToTopButton = document.createElement('button');
  backToTopButton.textContent = '▲'; // 버튼에 표시될 텍스트
  backToTopButton.id = 'back-to-top'; // CSS에서 사용될 ID

  // 버튼을 body 태그의 자식으로 추가합니다.
  document.body.appendChild(backToTopButton);

  // 스크롤 이벤트가 발생할 때마다 실행될 함수입니다.
  window.addEventListener('scroll', () => {
    // 페이지가 300px 이상 스크롤되면 버튼에 'show' 클래스를 추가하고,
    // 그렇지 않으면 제거합니다.
    if (window.scrollY > 300) {
      backToTopButton.classList.add('show');
    } else {
      backToTopButton.classList.remove('show');
    }
  });

  // 버튼을 클릭하면 페이지 최상단으로 부드럽게 스크롤합니다.
  backToTopButton.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });


  // --- 기능 3: 필요한 CSS 스타일 동적 추가 ---
  // CSS 파일을 수정하지 않기 위해, 필요한 스타일을 자바스크립트로 직접 head에 추가합니다.
  const styles = `
    /* 스크롤 애니메이션 스타일 */
    .fade-in-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
    .fade-in-element.visible {
      opacity: 1;
      transform: translateY(0);
    }

    /* '맨 위로 가기' 버튼 스타일 */
    #back-to-top {
      position: fixed;
      bottom: 25px;
      right: 25px;
      width: 50px;
      height: 50px;
      background-color: #107415;
      color: white;
      border: none;
      border-radius: 50%;
      box-shadow: 0 4px 8px rgba(0,0,0,0.2);
      font-size: 20px;
      cursor: pointer;
      z-index: 1000;
      opacity: 0;
      visibility: hidden;
      transform: translateY(15px);
      transition: opacity 0.3s, visibility 0.3s, transform 0.3s;
    }
    #back-to-top.show {
      opacity: 1;
      visibility: visible;
      transform: translateY(0);
    }
    #back-to-top:hover {
      background-color: #0d5c11;
    }
  `;

  const styleSheet = document.createElement("style");
  styleSheet.type = "text/css";
  styleSheet.innerText = styles;
  document.head.appendChild(styleSheet);

});
