import clsx from 'clsx';

export default function Button(
    {
        children,
        variant = 'primary',
        sm = false,
        right = false,
        rounded = true,
        center = false,
        ...props
    }: 
    {
        children: React.ReactNode,
        variant?: 'primary' | 'secondary' | 'ghost',
        sm?: boolean,
        right?: boolean,
        rounded?: boolean,
        center?: boolean,
    } & React.ComponentPropsWithoutRef<'button'>
) {
    return (
        <button
            {...props}
            className={clsx('flex gap-2 items-center cursor-pointer',
                {
                    'text-white font-semibold bg-yellow-500 hover:bg-yellow-400 hover:shadow-md shadow-amber-200': variant === 'primary',
                    'text-black bg-slate-200 hover:bg-slate-100': variant === 'secondary',
                    'text-black/50 bg-transparent hover:bg-slate-200 hover:text-black': variant === 'ghost',
                    'rounded-full': rounded,
                    'rounded-lg': !rounded,
                    'ml-auto': right,
                    'text-sm p-1': sm,
                    'px-4 py-2': !sm,
                    'justify-center': center
                }
            )}
        >
            { children }
        </button>
    );
}