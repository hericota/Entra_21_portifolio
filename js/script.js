'use strict';

// Hover polish is optional: touch and reduced-motion users keep a static surface.
const pointerEffects = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
document.querySelectorAll('[data-spotlight]').forEach(surface => {
    surface.addEventListener('pointermove', event => {
        if (!pointerEffects.matches) return;
        const bounds = surface.getBoundingClientRect();
        surface.style.setProperty('--mx', `${event.clientX - bounds.left}px`);
        surface.style.setProperty('--my', `${event.clientY - bounds.top}px`);
    });
    surface.addEventListener('pointerleave', () => {
        surface.style.removeProperty('--mx');
        surface.style.removeProperty('--my');
    });
});

const filters = document.querySelector('.filters');
if (filters) {
    const cards = [...document.querySelectorAll('.tech-card')];
    const result = document.querySelector('#filter-result');
    filters.hidden = false;
    result.hidden = false;
    filters.addEventListener('click', event => {
        const button = event.target.closest('button[data-filter]');
        if (!button) return;
        filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
        cards.forEach(card => { card.hidden = button.dataset.filter !== 'all' && card.dataset.category !== button.dataset.filter; });
        const count = cards.filter(card => !card.hidden).length;
        result.textContent = `${count} ${count === 1 ? 'tecnologia' : 'tecnologias'}`;
    });
}

const playground = document.querySelector('.playground');
if (playground) {
    const accent = document.querySelector('#accent');
    const radius = document.querySelector('#radius');
    const card = document.querySelector('#demo-card');
    const code = document.querySelector('#demo-code');
    const update = () => {
        card.style.borderColor = accent.value;
        card.style.borderRadius = `${radius.value}px`;
        document.querySelector('#radius-value').value = `${radius.value} px`;
        code.textContent = `border-color: ${accent.value};\nborder-radius: ${radius.value}px;`;
    };
    accent.addEventListener('input', update);
    radius.addEventListener('input', update);
    document.querySelector('#reset-demo').addEventListener('click', () => {
        accent.value = '#7aa7ff';
        radius.value = '16';
        update();
    });
    update();
    playground.hidden = false;
}
