import React, { useContext, useRef } from 'react';
import { mainContext } from '../../context/MainProvider';

export default function Search() {
    const { setSearchQuery } = useContext(mainContext) as any;
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const searchValue = inputRef.current?.value;
        if (searchValue) {
            setSearchQuery(searchValue);
        }
    };

    return (
        <form className="flex gap-4 m-14 mb-44" onSubmit={handleSubmit}>
            <input 
                ref={inputRef} 
                type="text" 
                placeholder="Type something" 
                className="px-4 p-2 w-44 rounded text-black bg-white"
            />
            <button 
                type="submit" 
                className="px-4 p-2 w-28 rounded text-white bg-blue-300 active:scale-90 transition-transform"
            >
                Search
            </button>
        </form>
    );
}
