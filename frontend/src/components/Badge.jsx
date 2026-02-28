import { clsx } from 'clsx';

const Badge = ({ children, variant = 'green', className }) => {
    const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm";

    const variants = {
        green: "bg-ps-green/20 text-green-700",
        red: "bg-ps-red/20 text-red-700",
        yellow: "bg-ps-yellow/20 text-yellow-700",
        black: "bg-ps-black text-white",
    };

    return (
        <span className={clsx(baseStyles, variants[variant], className)}>
            {children}
        </span>
    );
};

export default Badge;
