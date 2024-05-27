// Tooltip.js
import React from 'react';
// import './Tooltip.css';

const ToolTip = ({ text, children }) => {
    console.log('🚀 ~ ToolTip ~ text:', text);
    return (
        <div className="tooltip-container">
            {children}
            <div className="tooltip-content">{text}</div>
        </div>
    );
};

export default ToolTip;
