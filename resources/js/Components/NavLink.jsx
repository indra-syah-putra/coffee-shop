import { Link } from '@inertiajs/react';

export default function NavLink({
    active = false,
    className = '',
    children,
    ...props
}) {
    return (
        <Link
            {...props}
            className={
                'inline-flex items-center border-b-2 px-1 pt-1 text-sm font-medium leading-5 transition duration-150 ease-in-out focus:outline-none ' +
                (active
                    ? 'border-gold text-white focus:border-gold-light'
                    : 'border-transparent text-cream/70 hover:border-gold/50 hover:text-white focus:border-gold/50 focus:text-white') +
                className
            }
        >
            {children}
        </Link>
    );
}
