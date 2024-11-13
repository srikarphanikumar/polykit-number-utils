// jest-setup/angular.setup.ts
import 'zone.js';
import 'zone.js/testing';
import { getTestBed } from '@angular/core/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
} from '@angular/platform-browser-dynamic/testing';

// First, initialize the Angular testing environment.
getTestBed().initTestEnvironment(
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting(),
    {
        teardown: { destroyAfterEach: true }
    }
);

beforeEach(() => {
    getTestBed().resetTestingModule();
});

// Proper mock implementations for DOM APIs
class MockMutationObserver implements MutationObserver {
    private callback: MutationCallback;

    constructor(callback: MutationCallback) {
        this.callback = callback;
    }

    disconnect(): void { }

    observe(target: Node, options?: MutationObserverInit): void { }

    takeRecords(): MutationRecord[] {
        return [];
    }
}

class MockResizeObserver implements ResizeObserver {
    constructor(callback: ResizeObserverCallback) { }

    disconnect(): void { }

    observe(target: Element, options?: ResizeObserverOptions): void { }

    unobserve(target: Element): void { }
}

// Apply mocks to global object with proper typing
Object.defineProperty(window, 'getComputedStyle', {
    value: () => ({
        getPropertyValue: (prop: string): string => '',
        setProperty: (prop: string, value: string): void => { },
        removeProperty: (prop: string): void => { }
    })
});

global.MutationObserver = MockMutationObserver;
global.ResizeObserver = MockResizeObserver as any;

// RAF/CAF mocks
global.requestAnimationFrame = (callback: FrameRequestCallback): number => {
    return 0;
};

global.cancelAnimationFrame = (handle: number): void => {
    clearTimeout(handle);
};

// Optional: Add any additional DOM mocks needed for Angular testing
Object.defineProperty(window, 'CSS', { value: null });
Object.defineProperty(document, 'doctype', {
    value: '<!DOCTYPE html>'
});
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
    })),
});

// Optional: Mock Intersection Observer
class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | Document | null = null;
    readonly rootMargin: string = '';
    readonly thresholds: ReadonlyArray<number> = [];

    constructor(callback: IntersectionObserverCallback, options?: IntersectionObserverInit) { }

    disconnect(): void { }

    observe(): void { }

    unobserve(): void { }

    takeRecords(): IntersectionObserverEntry[] {
        return [];
    }
}

global.IntersectionObserver = MockIntersectionObserver as any;