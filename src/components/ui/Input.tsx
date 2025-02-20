import clsx from "clsx";
import React from "react";

export default function Input(
    {
        ...props
    }: 
    {
        
    } & React.ComponentPropsWithoutRef<'input'>
) {
    return (
        <input
            {...props}
            className={clsx('w-full px-4 py-2 rounded-full bg-neutral-100 hover:bg-neutral-200 border-2 border-transparent focus:border-yellow-500 outline-0 placeholder:italic')}
        />
    )
}