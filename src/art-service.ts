
import artFiles from './art-files.json';

export interface Artwork {
    name: string;
    url: string;
}

export const getArtList = () => { 
    const mappedArt = artFiles.map(a => {
        return {
            ...a,
            url: a.url.replace(/(.+)\/file\/d\/(.+)\/view.*/i, '$1/uc?export=view&id=$2'),
        }
    });
    return mappedArt; 
};
