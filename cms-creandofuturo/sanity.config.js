import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import curso from './schemas/curso';
import post from './schemas/post';
import anuncio from './schemas/anuncio';
import ajustes from './schemas/ajustes';
import comunidad from './schemas/comunidad';

import React from 'react';
import { useCurrentUser } from 'sanity';

// --- CONFIGURACIÓN DE ACCESO PROFESIONAL ---
const ADMIN_EMAILS = [
    'infocsicr@gmail.com',
    'consultoriacsicr@gmail.com' // Agregá acá tus emails de admin
];

const isAuthorizedAdmin = (user) => {
    if (!user) return false;
    // Es admin si está en la lista blanca O si tiene el rol explícito (pero no es Adrian)
    const isInWhitelist = ADMIN_EMAILS.includes(user.email);
    const hasAdminRole = user.roles?.some(role => role.name === 'administrator');
    const isRestrictedEmail = user.email === 'amontet@gmail.com';

    return (isInWhitelist || hasAdminRole) && !isRestrictedEmail;
};

// Componente para limpiar la interfaz del Editor
function MyCustomNavbar(props) {
    const user = useCurrentUser();
    const isAdmin = isAuthorizedAdmin(user);

    // Si no es admin, inyectamos CSS para "blindar" el Studio
    if (!isAdmin) {
        return React.createElement(React.Fragment, null,
            React.createElement('style', null, `
                /* --- LIMPIEZA TOTAL PARA EL CLIENTE (SOLO CONTENIDO) --- */
                
                /* 1. Ocultar Switcher de Workspaces, Grid de Apps y Logo de Sanity */
                [data-testid="workspace-switcher"],
                [class*="WorkspaceSwitcher"],
                [class*="GridIcon"],
                [aria-label="Workspaces"],
                [class*="StudioNavbar__workspace"],
                [class*="SanityLogo"] { display: none !important; }
                
                /* 2. Ocultar Notificaciones, Ayuda y Menú de Usuario técnico */
                [data-testid="notifications-button"],
                [class*="Notifications"],
                [class*="HelpMenu"],
                button[aria-label="Notifications"],
                button[aria-label="Help"],
                [class*="HelpIcon"] { display: none !important; }
                
                /* 3. Ocultar Sanity Assist (IA) y Favoritos */
                [class*="Assist"],
                [class*="StarIcon"],
                button[aria-label*="Assist"],
                button[aria-label*="IA"],
                [data-testid="presentation-tool-button"] { display: none !important; }

                /* 4. Ocultar botones de "Manage project" / Datasets / API */
                [href*="manage.sanity.io"],
                [aria-label="Manage project"],
                [class*="ProjectMenu"],
                [class*="ActionMenu"] { display: none !important; }

                /* 5. Limpiar barra superior para que quede minimalista */
                [class*="StudioNavbar__tool-list"] { margin-right: auto; }
                [data-testid="global-search"] { display: none !important; }

                /* 6. Evitar que el usuario haga scroll o vea cosas raras en el header */
                header { border-bottom: 1px solid #eee !important; }
            `),
            props.renderDefault(props)
        );
    }

    return props.renderDefault(props);
}

export default defineConfig({
    name: 'default',
    title: 'Creando Futuro - Panel de Control',

    projectId: 'qxbgy1nd',
    dataset: 'production',

    plugins: [
        structureTool({
            structure: (S) =>
                S.list()
                    .title('Contenido')
                    .items([
                        // Ajustes Generales (Singleton)
                        S.listItem()
                            .title('Ajustes Generales')
                            .id('ajustes')
                            .child(
                                S.document()
                                    .schemaType('ajustes')
                                    .documentId('ajustes')
                            ),
                        S.divider(),
                        // Resto de documentos
                        ...S.documentTypeListItems().filter(
                            (listItem) => !['ajustes'].includes(listItem.getId())
                        ),
                    ]),
        }),
        visionTool(), // La herramienta vision se filtra abajo por código
    ],

    studio: {
        components: {
            navbar: MyCustomNavbar,
        },
    },

    tools: (prev, context) => {
        const isAdmin = isAuthorizedAdmin(context.currentUser);
        if (isAdmin) {
            return prev;
        }
        // Para el cliente, SOLO la herramienta de edición ("Contenido")
        return prev.filter(tool => tool.name === 'structure');
    },

    schema: {
        types: [curso, post, anuncio, ajustes, comunidad],
    },
});
