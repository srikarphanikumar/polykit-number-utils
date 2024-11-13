// jest-setup/test-types.d.ts
interface Window {
    CSS: any;
    matchMedia: jest.Mock;
}

declare global {
    namespace NodeJS {
        interface Global {
            MutationObserver: typeof MutationObserver;
            ResizeObserver: typeof ResizeObserver;
            IntersectionObserver: typeof IntersectionObserver;
            requestAnimationFrame: (callback: FrameRequestCallback) => number;
            cancelAnimationFrame: (handle: number) => void;
        }
    }
}

// Ensure this is treated as a module
export { };