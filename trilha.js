document.addEventListener('DOMContentLoaded', () => {

    const cards = document.querySelectorAll('.card');

    cards.forEach((card, index) => {
        card.animate([
            { transform: `translateY(0px) rotate(${getRotation(index)}deg)` },
            { transform: `translateY(-15px) rotate(${getRotation(index)}deg)` },
            { transform: `translateY(0px) rotate(${getRotation(index)}deg)` }
        ], {
            duration: 3000 + (index * 500),
            iterations: Infinity,
            easing: 'ease-in-out'
        });
    });

    function getRotation(index) {
        const rotations = [-5, 0, 5, 8];
        return rotations[index] || 0;
    }

    const lessons = document.querySelectorAll('.lesson-box');
    const modal = document.getElementById('lessonModal');
    const title = document.getElementById('lessonTitle');
    const body = document.getElementById('lessonBody');
    const closeLesson = document.querySelector('.close-modal');
    const completeBtn = document.getElementById('completeLesson');

    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const finalModal = document.getElementById('finalModal');
    const closeFinal = document.querySelector('.close-final');

    let completed = JSON.parse(localStorage.getItem('bridgeProgress')) || [];
    let current = null;

    lessons.forEach(box => {
        box.addEventListener('click', () => {
            current = box.dataset.lesson;
            title.textContent = `Etapa ${current}`;
            body.innerHTML = `
                <p>Conteúdo guiado passo a passo:</p>
                <ul>
                    <li>Reflexão prática</li>
                    <li>Exemplo real</li>
                    <li>Ação simples</li>
                </ul>
            `;
            modal.style.display = 'flex';
        });
    });

    closeLesson.onclick = () => modal.style.display = 'none';

    completeBtn.onclick = () => {
        if (!completed.includes(current)) {
            completed.push(current);
            localStorage.setItem('bridgeProgress', JSON.stringify(completed));
        }
        modal.style.display = 'none';
        updateProgress();
    };

    function updateProgress() {
        progressFill.style.width = `${(completed.length / 10) * 100}%`;
        progressText.textContent = `${completed.length} / 10 concluídas`;

        if (completed.length === 10) {
            finalModal.style.display = 'flex';
        }
    }

    closeFinal.onclick = () => {
        finalModal.style.display = 'none';
        document.getElementById('trilhas').scrollIntoView({ behavior: 'smooth' });
    };

    updateProgress();
});
