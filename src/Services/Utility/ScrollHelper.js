
/**
 * Scroll lib to help with all scrolling actions
 * @type {Object}
 */
var ScrollHelper = {
    scrollTop() {
        window.scrollTo(0, 0);
    },

    /**
     * Core scrolling function which when given a raw id of an element, 
     * attempts to scroll to that element
     * @param {any} idOfElement
     * @param {any} smooth
     * @param {any} offset
     */
    scrollToElement(idOfElement, smooth = true, offset = 0) {
        var elementToScrollTo = $("#" + idOfElement); //still use Jquery
        if (elementToScrollTo.length !== 0) {            
            window.scrollTo(0, (elementToScrollTo.offset().top - offset));           
        }

        //let elementToScrollTo = document.getElementById(idOfElement);
        //const { top } = elementToScrollTo.getBoundingClientRect();       
        //if (elementToScrollTo.length !== 0) {
        //    window.scrollTo(0, (top));
        //}
    },
    scrollToElementWithTimout(id) {
        setTimeout(function () {
            ScrollHelper.scrollToElement(id, true, 80);
        }, 50);
    }
}

module.exports = ScrollHelper;