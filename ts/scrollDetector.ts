/*

	SCROLL DETECTOR
	author: Jiří Bělský (wUFr)

*/

import {OptionsInterface, defaultOptions} from "./options"

export default class scrollDetector {

	protected options: OptionsInterface

	constructor(options: OptionsInterface|null = null){
		this.options = {
			...defaultOptions,
			...options,
		}
	}

	init(){

		// CHECK IF THERE ARE ANY ELEMENTS
		this.options.wrapperElement = document.getElementsByClassName(this.options.wrapperClass);

		if(!this.options.wrapperElement.length){
			if(this.options.debug){
				console.log("%cscrollDetector - init(): No wrapper elements found, try checking your classnames", "color: red", this.options.wrapperClass)
			}
			return
		}

		if(this.options.debug){
			console.log("scrollDetector - init(): Found elements", this.options.wrapperElement)
		}

		for (const wrapper of this.options.wrapperElement as any){
			// PREVENT DOUBLE-INIT WHICH WOULD RESULT IN CALLING THIS CODE TWICE OR MORE
			if(wrapper.classList.contains("-js-scrollDetector-init")){
				continue
			}

			wrapper.classList.add("-js-scrollDetector-init")

			const scroller = wrapper.getElementsByClassName(this.options.scrollClass)[0]

			if(!scroller){
				if(this.options.debug){
					console.log("%cscrollDetector - init(): This wrapper does not have scroll element inside.", "color: red", wrapper)
				}
				continue
			}

			const type = wrapper.getAttribute("data-scrollType")


			if(type=="horizontal"){
				Promise.resolve().then(() =>this.detectXScrollPosition(scroller))

				// RUN ONCE PAGE IS READY
				/*window.onload = () => {
					this.detectXScrollPosition(scroller)
				};*/

				// KEEP CHECKING WHEN SCROLLING THROUGH
				scroller.addEventListener("scroll", () => {
					this.detectXScrollPosition(scroller);
				})
			}

			if(type=="vertical"){
				Promise.resolve().then(() =>this.detectYScrollPosition(scroller))

				// RUN ONCE PAGE IS READY
				/*window.onload = () => {
					this.detectYScrollPosition(scroller)
				};*/

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
		const widthContent   = scroller.getElementsByClassName(this.options.contentClass)[0].offsetWidth;
		const areaWrapper    = scroller.closest("." +this.options.wrapperClass);
		const toStart        = scroller.scrollLeft;
		const toEnd          = (widthContainer - widthContent + toStart) * -1;


		if(this.options.debug){
			console.log(scroller)
			console.log("Width:"      +widthContent)
			console.log("To start:"   +toStart)
			console.log("To end:"     +toEnd)
			console.log("---")
		}


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
		const heightContent   = scroller.getElementsByClassName(this.options.contentClass)[0].offsetHeight;
		const areaWrapper     = scroller.closest("." +this.options.wrapperClass);

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
