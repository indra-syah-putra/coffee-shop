export default function PrimaryButton({
    className = '',
    disabled,
    children,
    ...props
}) {
    return (
        <button
            {...props}
            className={
                `inline-flex items-center rounded-full border border-transparent bg-gold px-6 py-3 text-xs font-bold uppercase tracking-widest text-espresso transition duration-150 ease-in-out hover:bg-gold-light focus:bg-gold-light focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2 active:bg-gold ${
                    disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
