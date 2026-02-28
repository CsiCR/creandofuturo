import { useEffect } from 'react';

/**
 * Custom hook to manage SEO per page
 * @param {string} title - The page title
 * @param {string} description - The meta description
 */
export const useSEO = (title, description) => {
    useEffect(() => {
        const defaultTitle = "CPSA – Escuela Psicosocial | Pico Truncado";
        document.title = title ? `${title} | CPSA` : defaultTitle;

        let metaDescription = document.querySelector('meta[name="description"]');
        if (!metaDescription) {
            metaDescription = document.createElement('meta');
            metaDescription.name = "description";
            document.head.appendChild(metaDescription);
        }
        metaDescription.setAttribute('content', description || "Escuela de Psicología Social Sede Pico Truncado. Salud mental comunitaria y formación profesional en la Patagonia.");

        // OpenGraph support
        let ogTitle = document.querySelector('meta[property="og:title"]');
        if (!ogTitle) {
            ogTitle = document.createElement('meta');
            ogTitle.setAttribute('property', 'og:title');
            document.head.appendChild(ogTitle);
        }
        ogTitle.setAttribute('content', document.title);

        return () => {
            // Cleanup if needed
        };
    }, [title, description]);
};
