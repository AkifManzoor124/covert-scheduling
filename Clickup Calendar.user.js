// ==UserScript==
// @name         Clickup Calendar
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Easy to read calendar on my raspberry pi
// @author       You
// @match        https://app.clickup.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at       document-idle
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...

    console.log('Running TamperMonkey Script');

    // Define a function to execute when the target element is found
    function executeWhenClassIsFound() {
        // Your script goes here

        setTimeout(function(){}, 2000);

        var calendarViewBar = document.querySelector('.cu2-views-bar__container');

        calendarViewBar.remove();

        var allDayShowMoreButton = document.querySelector('.cal-events-show-more-padding');
        console.log(allDayShowMoreButton);
        allDayShowMoreButton.click();

        var allDayView = document.querySelector('.cu-calendar-content__scroll-container');
        allDayView.style.maxHeight = '500px';

        //only do this if you can fit the font inside the card/box
        //expand the size of the AllDay tasks

        // Create a new <style> element
        var styleEl = document.createElement('style');

        // Add your CSS rule to the <style> element
        var css = '*[class^="cu-dashboard-time__calendar__event"] {font-size: 1vmin !important;};';
        styleEl.appendChild(document.createTextNode(css));
        //styleEl.appendChild(document.createTextNode(secondcss));

        // Append the <style> element to the <head> of the document
        document.head.appendChild(styleEl);

        // Disconnect the observer since we no longer need it
        observer.disconnect();
    }

    // Create a MutationObserver that watches for changes to the DOM
    var observer = new MutationObserver(function(mutations) {
        // Check if the target element is present in the DOM
        var calendarViewBar = document.querySelector('.cu2-views-bar_calendar');
        var spans = document.querySelectorAll('.cu-dashboard-time__calendar__event__title-container');
        if (calendarViewBar && spans.length > 0) {
            // If the target element is found, execute the function and disconnect the observer
            executeWhenClassIsFound();
        }
    });

    console.log('running observer');

    // Start observing the DOM for changes
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();