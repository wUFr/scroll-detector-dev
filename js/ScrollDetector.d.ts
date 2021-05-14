import { OptionsInterface } from "./Options";
export default class ScrollDetector {
    protected options: OptionsInterface;
    constructor(options?: OptionsInterface | null);
    protected getWrapperElements(): HTMLElement[] | null;
    protected debugLog(...options: any[]): void;
    init(): void;
    protected detectXScrollPosition(scroller: HTMLElement): void;
    protected detectYScrollPosition(scroller: HTMLElement): void;
}
