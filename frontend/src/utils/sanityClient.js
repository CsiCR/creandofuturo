import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: 'qxbgy1nd', // ID del proyecto proporcionado por el usuario
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-02-21',
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => builder.image(source);
