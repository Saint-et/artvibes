import * as tf from '@tensorflow/tfjs';
import useWaifu2xTfjsUtils from './waifu2x-utils';
import { WaifuProcess } from '@/utils/interface';
const noiseLevel = ['None', 'Low', 'Medium', 'High', 'Highest'];


export default function useWaifu2xTfjs() {

    const {
        isOneColor,
        padding,
        showMessage,
        preProcess,
        postProcess,
        showImageInfo,
        setWaifuProcess,
        isWaifuProcess,
    } = useWaifu2xTfjsUtils()

    const startWaifu = async (config: any) => {
        setWaifuProcess((prevState: WaifuProcess) => ({
            ...prevState,
            startProcess: true,
            bar: 0
        }))
        showMessage(true, 'loading model', null, false);

        let modelPath

        if (config['scale'] === 2 && config['noise'] === -1) {
            modelPath = `/models/upconv_7_${config['style']}_scale2.0x/model.json`
        } else if (config['scale'] === 2 && config['noise'] > -1) {
            modelPath = `/models/upconv_7_${config['style']}_noise${config['noise']}/model.json`
        } else if (config['scale'] === 1 && config['noise'] > -1) {
            modelPath = `/models/vgg_7_${config['style']}_noise${config['noise']}/model.json`
        } else {
            return console.error('Erreur lors de la selection du modèle.');
        }

        try {
            const model = await tf.loadLayersModel(modelPath);
            if (!model) {
                console.error("Le chargement du modèle a échoué.");
                return;
            }
            config['model'] = model;
            return config
        } catch (error) {
            console.error('Erreur lors du chargement du modèle:', error);
        }
    }

    const prepareImageWaifu = async (config: any) => {
        if (typeof window === 'undefined') {
            return;
        }

        let img = config['image'];

        // Vérifiez que img est de type supporté
        if (!(img instanceof HTMLImageElement || img instanceof ImageBitmap)) {
            console.error("Le type de l'image n'est pas supporté.");
            return;
        }

        let m = config['model'];
        config['height'] = img.height;
        config['width'] = img.width;

        let is = m.inputs[0].shape[1];
        let os = m.outputShape[1];
        let scale = config['scale'];
        let x;

        if (scale === 2 && os < is) {
            scale = 1;
            let can = document.createElement('canvas');
            can.width = img.width * 2;
            can.height = img.height * 2;
            const ctx = can.getContext('2d');

            // Vérifiez que ctx n'est pas null
            if (!ctx) return;

            ctx.drawImage(img, 0, 0, img.width * 2, img.height * 2);
            x = tf.browser.fromPixels(can, 4);

        } else {
            x = tf.browser.fromPixels(img, 4);
        }

        if (!(x instanceof tf.Tensor)) {
            console.error("L'objet 'x' n'est pas un tenseur valide");
            return;
        }

        let a = x.slice([0, 0, 3], [-1, -1, 1]).dataSync();

        let offset = (is - os / scale) / 2;
        let gs = is - offset * 2;
        let h = x.shape[0];
        let w = x.shape[1];
        let hb = Math.floor(h / gs) + (h % gs === 0 ? 0 : 1);
        let wb = Math.floor(w / gs) + (w % gs === 0 ? 0 : 1);
        let h2 = hb * gs + offset * 2;
        let w2 = wb * gs + offset * 2;

        config['inputSize'] = is;
        config['outputSize'] = os;
        config['offset'] = offset;
        config['gridSize'] = gs;
        config['hasAlpha'] = !isOneColor(a);
        config['row'] = hb;
        config['column'] = wb;
        config['xHeight'] = h;
        config['xWidth'] = w;
        config['yHeight'] = h * scale;
        config['yWidth'] = w * scale;
        config['timeStart'] = new Date();

        x = padding(x, offset, h2 - offset - h, offset, w2 - offset - w);

        let tasks = preProcess(x, config);

        return { tasks: tasks, config: config }
    };


    const processWaifu = async (tasks: any, config: any, idx: any) => {
        if (idx >= tasks.length) {
            let y = postProcess(tasks, config);
            config['timeStop'] = new Date();

            const canvas = document.createElement('canvas');
            canvas.width = config.width;
            canvas.height = config.height;

            // Dessiner l'image sur l'OffscreenCanvas
            await tf.browser.toPixels(tf.clipByValue(y, 0, 1) as tf.Tensor3D, canvas);

            const imgData = canvas.toDataURL('image/png');

            await showImageInfo(config, imgData);

        }

        if (!tasks[idx]) {
            return;
        }
        setWaifuProcess((prevState: any) => ({
            ...prevState,
            bar: Math.floor(100 * idx / tasks.length)
        }))
        requestAnimationFrame(() => {
            if (idx > 0) {
                tasks[idx - 1]['y'].dataSync();
            }
            let x = tasks[idx].x.toFloat().div(255.0);
            let y = config['model'].predict(x);
            tasks[idx]['y'] = y;
            processWaifu(tasks, config, idx + 1);
        });
    }

    return {
        startWaifu,
        prepareImageWaifu,
        processWaifu,
        setWaifuProcess,
        isWaifuProcess,
    }
}