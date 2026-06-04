import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={`flex w-full items-start border-l-4 py-2 pe-4 ps-3 ${
                active
                    ? 'border-gold bg-gold/10 text-gold focus:border-gold-light focus:bg-gold/10 focus:text-gold'
                    : 'border-transparent text-cream/60 hover:border-gold/30 hover:bg-light-brown/20 hover:text-cream focus:border-gold/30 focus:bg-light-brown/20 focus:text-cream'
            } text-base font-medium transition duration-150 ease-in-out focus:outline-none ${className}`}
        >
            {children}
        </Link>
    );
}
