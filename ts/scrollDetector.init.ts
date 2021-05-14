/*

	BUTTON - CLICKED
	author: Jiří Bělský (wUFr)

	Tiny library that updates button status after its clicked.
	Can be used to prevent double-submit on forms and show user a form is being sent, if request is slow

*/


import scrollDetector from './scrollDetector';

const sc = new scrollDetector();
sc.init();