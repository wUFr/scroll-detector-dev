interface OptionsInterface
{
    wrapperClass?: string,
    scrollClass?: string,
    contentClass?: string,
    debug?: boolean,
}

const defaultOptions: OptionsInterface = {
    wrapperClass: "-js-scrollDetector-wrapper",
    scrollClass:  "-js-scrollDetector-scroll",
    contentClass: "-js-scrollDetector-content",
    debug: false,
}

export {OptionsInterface, defaultOptions}