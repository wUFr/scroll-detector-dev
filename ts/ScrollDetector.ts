import {OptionsInterface, defaultOptions} from "./Options"
import ScrollType from "./ScrollType"

export default class ScrollDetector
{
    protected options: OptionsInterface

    constructor(options: OptionsInterface|null = null)
    {
        this.options = {
            ...options,
            ...defaultOptions,
        }
    }

    protected getWrapperElements(): HTMLElement[]|null
    {
        if (! this.options.wrapperClass) {
            return null
        }

        return Array.from(document.querySelectorAll(this.options.wrapperClass))
    }

    protected debugLog(...options): void
    {
        if (this.options.debug) {
            console.log(options)
        }
    }

    public init(): void
    {
		// CHECK IF THERE ARE ANY ELEMENTS
		if(! this.getWrapperElements()){
            this.debugLog("%cscrollDetector - init(): No wrapper elements found, try checking your classnames", "color: red", this.options.wrapperClass)

            return
		}

        this.debugLog("scrollDetector - init(): Found elements", this.getWrapperElements())

		for (const wrapper of this.getWrapperElements() as any){
			// PREVENT DOUBLE-INIT WHICH WOULD RESULT IN CALLING THIS CODE TWICE OR MORE
			if(wrapper.classList.contains("-js-scrollDetector-init")){
				continue
			}

			wrapper.classList.add("-js-scrollDetector-init")

			const [scroller] = Array.from(wrapper.getElementsByClassName(this.options.scrollClass)) as HTMLElement[]

			if(! scroller){
                this.debugLog("%cscrollDetector - init(): This wrapper does not have scroll element inside.", "color: red", wrapper)

                continue
			}

            switch (wrapper.getAttribute("data-scrollType")) {
                case ScrollType.horizontal: {
                    // RUN ONCE ON DOMREADY
                    document.addEventListener("DOMContentLoaded", () => this.detectXScrollPosition(scroller))

                    // KEEP CHECKING WHEN SCROLLING THROUGH
                    scroller.addEventListener("scroll", () => this.detectXScrollPosition(scroller))
                }

                case ScrollType.vertical: {
                    // RUN ONCE ON DOMREADY
                    document.addEventListener("DOMContentLoaded", () => this.detectYScrollPosition(scroller))

                    // KEEP CHECKING WHEN SCROLLING THROUGH
                    scroller.addEventListener("scroll", () => this.detectYScrollPosition(scroller))
                }
            }
		}
	}

    protected detectXScrollPosition(scroller: HTMLElement): void
    {
		const offset = 5; // @todo: Add this to options

		const widthContainer = scroller.offsetWidth;
		const widthContent = (scroller.getElementsByClassName(this.options.contentClass)[0] as HTMLElement).offsetWidth;
		const areaWrapper = scroller.closest("." +this.options.wrapperClass);

		const toStart = scroller.scrollLeft;
		const toEnd = (widthContainer - Math.ceil(widthContent) + Math.ceil(toStart)) * -1;


		if (toStart > 0 + offset){
			areaWrapper.classList.add("-js-start-shadow"); // @todo: Add this class to options
		} else {
			areaWrapper.classList.remove("-js-start-shadow"); // @todo: Add this class to options
		}

		if (toEnd > 0 + offset){
			areaWrapper.classList.add("-js-end-shadow"); // @todo: Add this class to options
		} else {
			areaWrapper.classList.remove("-js-end-shadow"); // @todo: Add this class to options
		}
	}

    protected detectYScrollPosition(scroller: HTMLElement)
    {
		const offset = 5; // @todo: Add this to options

		const heightContainer = scroller.offsetHeight;
		const heightContent = (scroller.getElementsByClassName(this.options.contentClass)[0] as HTMLElement).offsetHeight;
		const areaWrapper = scroller.closest("." +this.options.wrapperClass);

		const toStart = scroller.scrollTop;
		const toEnd = (heightContainer - Math.ceil(heightContent) + Math.ceil(toStart)) * -1;


		if (toStart > 0 + offset){
			areaWrapper.classList.add("-js-start-shadow"); // @todo: Add this class to options
		} else {
			areaWrapper.classList.remove("-js-start-shadow"); // @todo: Add this class to options
		}

		if (toEnd > 0 + offset){
			areaWrapper.classList.add("-js-end-shadow"); // @todo: Add this class to options
		} else {
			areaWrapper.classList.remove("-js-end-shadow"); // @todo: Add this class to options
		}
	}
}