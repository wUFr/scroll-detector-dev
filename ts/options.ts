interface OptionsInterface
{
    wrapperClass?: string,
	wrapperElement?: HTMLCollection,
    scrollClass?: string,
    contentClass?: string,
    debug?: boolean,
}

const defaultOptions: OptionsInterface = {
    wrapperClass: "-js-scrollDetector-wrapper",
	wrapperElement: null,
    scrollClass:  "-js-scrollDetector-scroll",
    contentClass: "-js-scrollDetector-content",
    debug: false,
}

export {OptionsInterface, defaultOptions}