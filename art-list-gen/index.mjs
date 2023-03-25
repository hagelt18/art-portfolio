
import artFiles from '../src/art-files.json' assert { type: 'json' };
import fs from 'fs';
import imgThumbnail from 'image-thumbnail';
import sizeOf from 'image-size';

// obtain the size of an image
const getImageSize = (imgPath) =>{
    return new Promise((resolve, reject) => {
        console.log('Checking size of: ', imgPath);
        sizeOf(imgPath, (err, size) => {
            if (err){
                console.log("Error checking size: ", err);
                return reject(err);
            }
            console.log("Got size: ", size);
            return resolve({ width: size.width, height: size.height });
        })
    });
}

// const getImageSize = () => Promise.resolve({});

const mapToLowerSnakeCase = (name) => name.toLowerCase().replace('-', ' ').replace(/\s+/gi, '-');
const mapShareLinkToDownloadLink = (url) => url.replace(/(.+)\/file\/d\/(.+)\/view.*/i, '$1/uc?export=view&id=$2')

// const downloadFile = (async (url, path) => {
//     const res = await fetch(url);
//     const fileStream = fs.createWriteStream(path);
//     console.log('Downloading: ', url);
//     console.log('Writing to', path);
//     await new Promise((resolve, reject) => {
//         // try {
//             res.body.pipe(fileStream);
//             res.body.on("error", reject);
//             fileStream.on("finish", resolve);
//         // } catch(err){
//         //     reject(err);
//         // }
//       });
//   });



const downloadFile = async (url, path) => {
    console.log('Downloading: ', url);
    const res = await fetch(url);    
    if (res.status !== 200){
        console.log(`ERROR RESPONSE [${res.status}]: ${res.statusText}`)
        return;
    }
    console.log('Writing to', path);
    
    const blob = await res.blob();
    const arrayBuffer = await blob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    fs.writeFileSync(path, buffer)
    // await new Promise((resolve, reject) => {
    //     res.body.pipe(fs.createWriteStream(path))
    //         .on('error', reject)
    //         .once('close', () => resolve(path))
    // });    
  };

const downloadFilex = async (url, path) => {
    const res = await fetch(url);
    console.log('Downloading: ', url);    
    if (res.status !== 200){
        console.log(`ERROR RESPONSE [${res.status}]: ${res.statusText}`)
        return;
    }
    console.log('Writing to', path);
    await new Promise((resolve, reject) => {
        res.body.pipe(fs.createWriteStream(path))
            .on('error', reject)
            .once('close', () => resolve(path))
    });    
  };
const writeFile = (async (buffer, path) => {
    const fileStream = fs.createWriteStream(path);
    console.log('writing to ', path);
    await new Promise((resolve, reject) => {
        try {
        fileStream.write(buffer);
        fileStream.on('error', reject);
        fileStream.end(resolve);
        } catch(err){
            reject(err);
        }
    });
});

const run = async () => {
 
    const errors = [];
    for (let i = artFiles.length - 1; i >= 0; i--){
    // for (let i =0; i < artFiles.length; i++){
    // for (let i =0; i < 1; i++){
        
        const art = artFiles[i];
        const fileName = mapToLowerSnakeCase(art.name);
        const downloadLink = mapShareLinkToDownloadLink(art.url);
        const tempFile = `./output/tmp-${fileName}.png`;
        const outputFileName = `small-${fileName}.png`;
        const outputFile = `../public/assets/images/${outputFileName}`

        try {

            // if (fs.existsSync(outputFile)){
            //     console.log(`Thumbnail already exists: ${outputFile}`);
            //     continue;
            // }

            
            
            if (!fs.existsSync(tempFile)){
                await downloadFile(downloadLink, tempFile);
            }
            
            const originalSize = await getImageSize( tempFile);
            art.originalSize = originalSize;
            delete art.size;

            // const thumb = await imgThumbnail(tempFile);
            // console.log(`Creating thumbnail: ${outputFile}`);

            const smallImage = await imgThumbnail(tempFile, {width: 1920, height: 1080, fit: 'inside'});//, percentage: 100});
            console.log(`Creating small image: ${outputFile}`);

            await writeFile(smallImage, outputFile);
            delete art.thumbnail;
            delete art.thumbnailSize;
            art.smallFile = outputFileName
            art.smallSize = await getImageSize( outputFile );;
        } catch(err) {
            console.log(err);
            errors.push(art.name)
        } finally {
            if (fs.existsSync(tempFile)){
                // fs.rmSync(tempFile);
            }
        }
    }
    errors.length > 0 && console.log("Art with errors: ", errors);

    const newDataFile = './output/NEW_art-files.json';
    // console.log('Writing data to new file: ', newDataFile, artFiles)
    fs.writeFileSync(newDataFile, JSON.stringify(artFiles, null, 2));
    
}

run();