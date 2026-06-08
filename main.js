// Aguarda o carregamento do HTML completo antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    
    /* ========================================================
       1. FUNCIONALIDADE: SISTEMA MODO CLARO / ESCURO (TOGGLE)
       ======================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    
    // Verifica se o usuário já visitou e definiu uma preferência anterior
    const currentTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);

    themeToggleBtn.addEventListener('click', () => {
        // Alterna entre os modos de luz e sombra
        let theme = document.documentElement.getAttribute('data-theme');
        let newTheme = (theme === 'dark') ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme); // Salva a escolha do usuário
    });

    /* ========================================================
       2. FUNCIONALIDADE: CARROSSEL DE IMAGENS AUTOMÁTICO/MANUAL
       ======================================================== */
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentSlideIndex = 0;
    let carouselInterval;

    // Função que altera a visibilidade das fotos com base no índice
    function showSlide(index) {
        slides.forEach(slide => slide.classList.remove('active'));
        
        // Se passar do fim, volta pro começo
        if (index >= slides.length) currentSlideIndex = 0;
        // Se for menor que o começo, vai pro fim
        if (index < 0) currentSlideIndex = slides.length - 1;
        
        slides[currentSlideIndex].classList.add('active');
    }

    // Avançar slide de forma manual
    nextBtn.addEventListener('click', () => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
        resetarTimer(); // Reinicia o tempo para não pular rápido demais
    });

    // Voltar slide de forma manual
    prevBtn.addEventListener('click', () => {
        currentSlideIndex--;
        showSlide(currentSlideIndex);
        resetarTimer();
    });

    // Loop Automático (Muda a cada 4 segundos)
    function iniciarTimer() {
        carouselInterval = setInterval(() => {
            currentSlideIndex++;
            showSlide(currentSlideIndex);
        }, 4000);
    }

    function resetarTimer() {
        clearInterval(carouselInterval);
        iniciarTimer();
    }

    // Inicia o carrossel junto com o site
    iniciarTimer();

    /* ========================================================
       3. FUNCIONALIDADE: CALCULADORA ECOLOGICA SIMPLE
       ======================================================== */
    const calcBtn = document.getElementById('calc-btn');
    const areaInput = document.getElementById('area-input');
    const resultDiv = document.getElementById('calc-result');
    const litrosResultadoText = document.getElementById('litros-resultado');

    calcBtn.addEventListener('click', () => {
        const areaHectares = parseFloat(areaInput.value);

        // Validação básica se o número inserido é válido
        if (isNaN(areaHectares) || areaHectares <= 0) {
            alert('Por favor, insira um número válido de hectares maior do que zero!');
            return;
        }

        /* Regra matemática fictícia inspirada em dados reais: 
           Sistemas de irrigação inteligente por gotejamento economizam em média 
           2.500 litros de água por hectare ao dia comparado com a irrigação antiga.
        */
        const economiaPorHectare = 2500;
        const totalEconomizado = areaHectares * economiaPorHectare;

        // Insere o resultado final no HTML formatado com pontos flutuantes brasileiros
        litrosResultadoText.textContent = totalEconomizado.toLocaleString('pt-BR');
        
        // Remove a classe que esconde o painel de resultados
        resultDiv.classList.remove('hidden');
    });
});