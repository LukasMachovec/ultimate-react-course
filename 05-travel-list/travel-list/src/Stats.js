import { useState } from "react";

export default function Stats({ items }) {
    if (!items.length)
        return (
            <p className="stats">
                <em>Start adding some items to your packing list</em>
            </p>
        )

    const numPacked = items.reduce((acc, item) => { return item.packed ? acc + 1 : acc }, 0);
    const percantage = Math.round(numPacked / items.length * 100)
    return (
        <footer className="stats">
            <em>
                {percantage === 100
                    ? "You got everything! Ready to go!"
                    : `You have ${items.length} items on your list, and you already packed ${numPacked} (${percantage} %)`}
            </em>
        </footer>
    )
}