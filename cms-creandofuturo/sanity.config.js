import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import curso from './schemas/curso';
import post from './schemas/post';
import anuncio from './schemas/anuncio';
import ajustes from './schemas/ajustes';

export default defineConfig({
    name: 'default',
    title: 'Creando Futuro - Panel de Control',

    projectId: 'qxbgy1nd',
    dataset: 'production',

    plugins: [structureTool(), visionTool()],

    schema: {
        types: [curso, post, anuncio, ajustes],
    },
});
