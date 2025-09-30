/**
 * Basic slider controller for featured sections
 * Enables keyboard controls, previous/next buttons, and keeps controls in sync
 */
const scrollAmount = (track) => Math.max(track.clientWidth * 0.9, 320);

const updateControls = (track, prev, next) => {
    const maxScroll = track.scrollWidth - track.clientWidth;
    const current = track.scrollLeft;

    if (prev) {
        prev.disabled = current <= 4;
    }

    if (next) {
        next.disabled = current >= maxScroll - 4;
    }
};

const bindSlider = (slider) => {
    const track = slider.querySelector('[data-slider-track]');
    if (!track) {
        return;
    }

    const prev = slider.querySelector('[data-slider-prev]');
    const next = slider.querySelector('[data-slider-next]');

    const scrollPrev = () => {
        track.scrollBy({ left: -scrollAmount(track), behavior: 'smooth' });
    };

    const scrollNext = () => {
        track.scrollBy({ left: scrollAmount(track), behavior: 'smooth' });
    };

    prev?.addEventListener('click', scrollPrev);
    next?.addEventListener('click', scrollNext);

    track.addEventListener('scroll', () => updateControls(track, prev, next));
    window.addEventListener('resize', () => updateControls(track, prev, next));

    track.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowRight') {
            event.preventDefault();
            scrollNext();
        }
        if (event.key === 'ArrowLeft') {
            event.preventDefault();
            scrollPrev();
        }
    });

    updateControls(track, prev, next);
};

export default function initSliders() {
    const sliders = document.querySelectorAll('[data-slider]');
    if (!sliders.length) {
        return;
    }

    sliders.forEach(bindSlider);
}
