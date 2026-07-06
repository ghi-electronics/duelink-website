import React, { useState } from 'react';

// A clickable inline link/icon that copies a URL (or any text) to the clipboard.
// Usage in MDX: <CopyLink link="https://...">Click Here</CopyLink>
const CopyLink = ({
    link,                 // The text/URL to copy to the clipboard
    children,             // The clickable label (defaults to "Click Here")
    label,                // Alternative to children for setting the label
    copiedLabel = 'Copied!', // Feedback text shown briefly after copying
    variant = 'link',        // 'link' (default) or 'button'
}) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async (e) => {
        e.preventDefault();
        try {
            if (navigator.clipboard && navigator.clipboard.writeText) {
                await navigator.clipboard.writeText(link);
            } else {
                // Fallback for older/non-secure contexts
                const textarea = document.createElement('textarea');
                textarea.value = link;
                textarea.style.position = 'fixed';
                textarea.style.opacity = '0';
                document.body.appendChild(textarea);
                textarea.select();
                document.execCommand('copy');
                document.body.removeChild(textarea);
            }
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy link:', err);
        }
    };

    const content = children || label || 'Click Here';

    const icon = (
        <svg
            aria-hidden="true"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ marginLeft: '0.4em', verticalAlign: 'text-bottom' }}
        >
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
    );

    if (variant === 'button') {
        return (
            <a
                href="#"
                onClick={handleCopy}
                role="button"
                className="button button--primary"
                style={{ color: 'white', margin: '0.75rem 0', cursor: 'pointer' }}
                title="Copy the project link to the clipboard"
            >
                {copied ? copiedLabel : content}
                {icon}
            </a>
        );
    }

    return (
        <a
            href="#"
            onClick={handleCopy}
            role="button"
            title="Copy the project link to the clipboard"
            style={{ cursor: 'pointer', whiteSpace: 'nowrap' }}
        >
            {copied ? copiedLabel : content}
            {icon}
        </a>
    );
};

export default CopyLink;
