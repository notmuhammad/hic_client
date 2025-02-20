import clsx from 'clsx';

export default function Button(
    {
        children,
        variant = 'primary',
        sm = false,
        right = false,
        rounded = true,
        ...props
    }: 
    {
        children: React.ReactNode,
        variant?: 'primary' | 'secondary' | 'ghost',
        sm?: boolean,
        right?: boolean,
        rounded?: boolean,
    } & React.ComponentPropsWithoutRef<'button'>
) {
    return (
        <button
            {...props}
            className={clsx('flex gap-2 items-center cursor-pointer',
                {
                    'text-white font-semibold bg-yellow-500 hover:bg-yellow-400 hover:shadow-md shadow-amber-200': variant === 'primary',
                    'text-black bg-neutral-200 hover:bg-neutral-100': variant === 'secondary',
                    'text-black/50 bg-transparent hover:bg-black/10 hover:text-black': variant === 'ghost',
                    'rounded-full': rounded,
                    'rounded-lg': !rounded,
                    'ml-auto': right,
                    'text-sm p-1': sm,
                    'px-4 py-2': !sm
                }
            )}
        >
            { children }
        </button>
    );
}