/*

	SCROLL DETECTOR
	author: Jiří Bělský (wUFr)

*/

export default class scrollDetector {

	wrapperClass:   string
	wrapperElement: HTMLCollection

	scrollClass:    string
	contentClass:   string

	debug: boolean

	constructor(
		options = {
			wrapperClass: "-js-scrollDetector-wrapper",
			scrollClass:  "-js-scrollDetector-scroll",
			contentClass: "-js-scrollDetector-content",
			debug: false
		}
	){
		this.debug = options.debug

		this.wrapperClass   = options.wrapperClass
		this.wrapperElement = document.getElementsByClassName(this.wrapperClass);


		this.scrollClass   = options.scrollClass
		//this.scrollElement = document.getElementsByClassName(this.scrollClass);


		this.contentClass   = options.contentClass
		//this.contentElement = document.getElementsByClassName(this.contentClass);
	}

	init(){

		// CHECK IF THERE ARE ANY ELEMENTS
		if(!this.wrapperElement.length){
			if(this.debug){
				console.log("%cscrollDetector - init(): No wrapper elements found, try checking your classnames", "color: red", this.wrapperClass)
			}
			return
		}

		if(this.debug){
			console.log("scrollDetector - init(): Found elements", this.wrapperElement)
		}

		for (const wrapper of this.wrapperElement as any){
			// PREVENT DOUBLE-INIT WHICH WOULD RESULT IN CALLING THIS CODE TWICE OR MORE
			if(wrapper.classList.contains("-js-scrollDetector-init")){
				continue
			}

			wrapper.classList.add("-js-scrollDetector-init")

			const scroller = wrapper.getElementsByClassName(this.scrollClass)[0]

			if(!scroller){
				if(this.debug){
					console.log("%cscrollDetector - init(): This wrapper does not have scroll element inside.", "color: red", wrapper)
				}
				continue
			}

			const type = wrapper.getAttribute("data-scrollType")

			if(type=="horizontal"){

				// RUN ONCE ON DOMREADY
				document.addEventListener("DOMContentLoaded", () => {
					this.detectXScrollPosition(scroller);
				})

				// KEEP CHECKING WHEN SCROLLING THROUGH
				scroller.addEventListener("scroll", () => {
					this.detectXScrollPosition(scroller);
				})
			}

			if(type=="vertical"){
				// RUN ONCE ON DOMREADY
				document.addEventListener("DOMContentLoaded", () => {
					this.detectYScrollPosition(scroller);
				})

				// KEEP CHECKING WHEN SCROLLING THROUGH
				scroller.addEventListener("scroll", () => {
					this.detectYScrollPosition(scroller);
				})
			}
		}
	}

	detectXScrollPosition(scroller: any){
		const offset = 5;

		const widthContainer = scroller.offsetWidth;
		const widthContent   = scroller.getElementsByClassName(this.contentClass)[0].offsetWidth;
		const areaWrapper  = scroller.closest("." +this.wrapperClass);

		const toStart        = scroller.scrollLeft;
		const toEnd          = (widthContainer - Math.ceil(widthContent) + Math.ceil(toStart)) * -1;


		if(toStart>0+offset){
			areaWrapper.classList.add("-js-start-shadow");
		}
		else {
			areaWrapper.classList.remove("-js-start-shadow");
		}

		if(toEnd>0+offset){
			areaWrapper.classList.add("-js-end-shadow");
		}
		else {
			areaWrapper.classList.remove("-js-end-shadow");
		}

	}

	detectYScrollPosition(scroller: any){
		const offset = 5;

		const heightContainer = scroller.offsetHeight;
		const heightContent   = scroller.getElementsByClassName(this.contentClass)[0].offsetHeight;
		const areaWrapper     = scroller.closest("." +this.wrapperClass);

		const toStart        = scroller.scrollTop;
		const toEnd          = (heightContainer - Math.ceil(heightContent) + Math.ceil(toStart)) * -1;


		if(toStart>0+offset){
			areaWrapper.classList.add("-js-start-shadow");
		}
		else {
			areaWrapper.classList.remove("-js-start-shadow");
		}

		if(toEnd>0+offset){
			areaWrapper.classList.add("-js-end-shadow");
		}
		else {
			areaWrapper.classList.remove("-js-end-shadow");
		}
	}
}
