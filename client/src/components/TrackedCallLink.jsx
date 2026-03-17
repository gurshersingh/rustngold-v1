'use client';

import Link from 'next/link';

// NOTE: You must update the 'send_to' ID and 'value' here
const CLICK_TO_CALL_SNIPPET = 'AW-17459624697/dAPfCKWdhZ0bEPn1soVB';
const CONVERSION_VALUE = 0.20; // AUD value you want to assign

// The function to report the conversion
function gtagReportConversion(url) {
    const callback = function () {
        if (typeof url !== 'undefined') {
            window.location = url;
        }
    };
    
    // Check if the gtag function is available globally
    if (window.gtag) {
        window.gtag('event', 'conversion', {
            'send_to': CLICK_TO_CALL_SNIPPET, 
            'value': CONVERSION_VALUE, 
            'currency': 'AUD', 
            'event_callback': callback
        });
    } else {
        // Fallback: simply navigate if gtag isn't ready
        window.location = url;
    }
    return false;
};


export function TrackedCallLink({ href, children, className }) {
    return (
        <Link 
            href={href} 
            className={className}
            onClick={(e) => {
                e.preventDefault(); // Stop the default navigation
                gtagReportConversion(href); // Track conversion and then navigate
            }}
        >
            {children}
        </Link>
    );
}

// OPTIONAL: Create a similar component for the "Order Online" link with its own unique snippet ID and value
// export function TrackedOrderLink(...) { ... }