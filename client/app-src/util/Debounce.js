export function debounce(fn, milliseconds) {
    return () => setTimeout(() => fn(), milliseconds);
}