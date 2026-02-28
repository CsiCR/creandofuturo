import { clsx } from 'clsx';
import { Link } from 'react-router-dom';

const Button = ({
    children,
    to,
    onClick,
    variant = 'primary',
    className,
    type = 'button',
    ...props
}) => {
    const baseStyles = "inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-bold rounded-md shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2";

    const variants = {
        primary: "bg-ps-green text-ps-black hover:bg-[#16E500] focus:ring-ps-green hover:scale-105",
        secondary: "bg-ps-black text-white hover:bg-ps-gray focus:ring-ps-black",
        outline: "border-2 border-ps-green text-ps-black hover:bg-ps-green/10 focus:ring-ps-green",
        accent: "bg-ps-red text-white hover:bg-red-700 focus:ring-ps-red animate-pulse-subtle",
        ghost: "text-ps-gray hover:text-ps-green hover:bg-gray-50 shadow-none"
    };

    const combinedClasses = clsx(baseStyles, variants[variant], className);

    if (to) {
        if (to.startsWith('http')) {
            return (
                <a href={to} target="_blank" rel="noopener noreferrer" className={combinedClasses} {...props}>
                    {children}
                </a>
            );
        }
        return (
            <Link to={to} className={combinedClasses} {...props}>
                {children}
            </Link>
        );
    }

    return (
        <button type={type} onClick={onClick} className={combinedClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
