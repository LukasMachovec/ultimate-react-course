import { useState } from "react";
import PropTypes from "prop-types";

const containerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "16px",
};

const starContainerStyle = {
    display: 'flex',
    gap: '4px',
};


StarRating.propTypes = {
    maxRating: PropTypes.number,
    color: PropTypes.string,
    size: PropTypes.number,
    className: PropTypes.string,
    messages: PropTypes.array,
    defaultRating: PropTypes.number,
    onSetRating: PropTypes.func,
}

export default function StarRating({
    maxRating = 5,
    color = "#fcc419",
    size = 48,
    className = "",
    messages = [],
    defaultRating = 0,
    onSetRating = null,
}) {
    const [rating, setRating] = useState(defaultRating);
    const [tempRating, setTempRating] = useState(0);

    const textStyle = {
        lineHeight: '0',
        margin: '1',
        color: `${color}`,
        fontSize: `${size / 1.5}px`,
    };

    function handleSetRating(rating) {
        setRating(rating);
        if (onSetRating)
            onSetRating(rating);
    }

    return (
        <div style={containerStyle} className={className}>
            <div style={starContainerStyle}>{
                Array.from({ length: maxRating }, (_, i) => (
                    <Star
                        key={i}
                        color={color}
                        size={size}

                        full={tempRating ? i < tempRating : i < rating}
                        onRate={() => handleSetRating(i + 1)}
                        onHoverIn={() => setTempRating(i + 1)}
                        onHoverOut={() => setTempRating(0)}
                    />
                ))}
            </div>
            <p style={textStyle}>
                {messages.length === maxRating
                    ? messages[tempRating ? tempRating - 1 : rating - 1]
                    : tempRating ? tempRating : rating}
            </p>
        </div>
    )
}


function Star({ onRate, onHoverIn, onHoverOut, full, size, color }) {
    const starStyle = {
        width: `${size}px`,
        height: `${size}px`,
        display: 'block',
        cursor: 'pointer',
    };


    return (
        <span
            style={starStyle}
            role="button"
            onClick={onRate}
            onMouseEnter={onHoverIn}
            onMouseLeave={onHoverOut}
        >
            {/* Toggle SVG path or fill based on the 'full' prop */}
            <svg
                fill={full ? `${color}` : "none"}
                stroke={`${color}`}
                viewBox="0 0 24 24">
                <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
        </span >
    );
}