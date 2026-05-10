"use client";

import {useState} from 'react';
import {Heart} from 'lucide-react';
import {LikeProps} from '@/app/lib/definitions';

export default function LikeButton({likeCount}: LikeProps) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(likeCount);

    function handleLike() {
        setLiked(!liked);
        setCount(liked ? count - 1 : count + 1)
    }

    return (
        <button
            onClick={handleLike}
            className={`
            flex items-center gap-1.5 text-sm transition-colors
            ${liked
                ? "text-pink-500 hover:text-pink-400"
                : "text-gray-400 hover:text-pink-500"
            }`}
        >
            <Heart
                size={18}
                className="transition-transform active:scale-125"
                fill={liked ? "currentColor" : "none"}
            />
            <span>{count}</span>
        </button>
    )
}