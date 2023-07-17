// ==UserScript==
// @name         Display Rituals
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Display rituals for Morning and Evening
// @author       You
// @match        https://app.clickup.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=tampermonkey.net
// @grant        none
// @run-at       document-idle
// ==/UserScript==


(function() {
    'use strict';

    // Function to check the time and run the functions at the start of each hour
    function checkTimeAndRunFunctions() {
        var currentTime = new Date();
        var currentHour = currentTime.getHours();
        var currentMinute = currentTime.getMinutes();

        // Check the current hour and run the functions as necessary
        if (currentHour === 8 && (currentMinute === 0 || currentMinute === 1)) {
            displayMorningRitual();
        } else if (currentHour === 21 && (currentMinute === 0 || currentMinute === 1)) {
            displayEveningRitual();
        }

        // Calculate the milliseconds until the next hour starts
        var millisecondsUntilNextHour = calculateMillisecondsUntilNextHour();

        // Call the function again at the start of the next hour
        setTimeout(checkTimeAndRunFunctions, millisecondsUntilNextHour);
    }

    // Function to display the Morning Ritual
    function displayMorningRitual() {
        console.log('Displaying Morning Calendar');
        if(window.location.href != 'https://app.clickup.com/t/ubb9en'){
            window.location.href = 'https://app.clickup.com/t/ubb9en';
        }
    }

    // Function to display the Evening Ritual
    function displayEveningRitual() {
        console.log('Displaying Evening Calendar');
        if(window.location.href != 'https://app.clickup.com/t/ubb9eh'){
            window.location.href = 'https://app.clickup.com/t/ubb9eh';
        }
    }

    // Function to calculate the milliseconds remaining until the next hour starts
    function calculateMillisecondsUntilNextHour() {
        var currentTime = new Date();
        var minutes = 60 - currentTime.getMinutes();
        var seconds = 0;

        if (minutes !== 60) {
            seconds = 60 - currentTime.getSeconds();
        }

        var milliseconds = (minutes * 60 * 1000) + (seconds * 1000);
        return milliseconds;
    }

    // Call the checkTimeAndRunFunctions function initially
    checkTimeAndRunFunctions();
})();