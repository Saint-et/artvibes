import { WaifuProcessDefault } from '@/public/assets/data/defaultValue-drawing';
import { WaifuProcess } from '@/utils/interface';
import * as tf from '@tensorflow/tfjs';
import { useState } from 'react';
import toast from 'react-hot-toast';
const noiseLevel = ['None', 'Low', 'Medium', 'High', 'Highest'];


export default function useWaifu2xTfjsUtils() {


    const [isWaifuProcess, setWaifuProcess] = useState<WaifuProcess>(WaifuProcessDefault)

    const isOneColor = (x: any) => {
        let tmp = x
        if (tmp.length <= 0) return true;
        let c = tmp[0];
        for (let i = 0; i < tmp.length; i++) {
            if (tmp[i] != c) return false;
        }
        return true;
    }
    const padding = (x: any, top: number, bottom: number, left: number, right: number) => {
        let h = x.shape[0];
        let w = x.shape[1];
        let t = tf.tile(tf.slice(x, [0, 0], [1, -1]), [top, 1, 1]);
        let b = tf.tile(tf.slice(x, [h - 1, 0], [1, -1]), [bottom, 1, 1]);
        let l = tf.tile(tf.slice(x, [0, 0], [-1, 1]), [1, left, 1]);
        let r = tf.tile(tf.slice(x, [0, w - 1], [-1, 1]), [1, right, 1]);
        let tl = tf.tile(tf.slice(x, [0, 0], [1, 1]), [top, left, 1]);
        let bl = tf.tile(tf.slice(x, [h - 1, 0], [1, 1]), [bottom, left, 1]);
        let tr = tf.tile(tf.slice(x, [0, w - 1], [1, 1]), [top, right, 1]);
        let br = tf.tile(tf.slice(x, [h - 1, w - 1], [1, 1]), [bottom, right, 1]);

        return tf.concat([
            tf.concat([tl, l, bl], 0),
            tf.concat([t, x, b], 0),
            tf.concat([tr, r, br], 0)
        ], 1);
    }

    const showMessage = (show: boolean, msg: string, bar: number | null, button: boolean) => {
        if (!show) {
            return;
        }

        if (msg == null) {
            return;
        } else {
            console.log(msg);
        }
    }

    function preProcess(x: any, config: any) {
        x = x.expandDims();
        let gs = config['gridSize'];
        let is = config['inputSize'];
        let tasks = [];
        for (let i = 0; i < config['row']; i++) {
            for (let j = 0; j < config['column']; j++) {
                let grid = tf.slice(x, [0, i * gs, j * gs, 0], [1, is, is, -1]);
                for (let k = 0; k < config['tta']; k++) {
                    let t = ttaForward(grid, k);

                    let rgb = tf.slice(t, [0, 0, 0, 0], [-1, -1, -1, 3]);
                    tasks.push({ 'x': rgb });
                    if (config['hasAlpha']) {
                        let a = tf.tile(
                            tf.slice(t, [0, 0, 0, 3], [-1, -1, -1, 1]),
                            [1, 1, 1, 3]);
                        tasks.push({ 'x': a });
                    }
                }
            }
        }
        return tasks;
    }

    function postProcess(tasks: any, config: any) {
        let ptr = 0;
        let img = [];
        for (let i = 0; i < config['row']; i++) {
            let row = [];
            for (let j = 0; j < config['column']; j++) {
                let tta = [];
                for (let k = 0; k < config['tta']; k++) {
                    if (config['hasAlpha']) {
                        let rgb = tasks[ptr++].y;
                        let a = tf.mean(tasks[ptr++].y, -1, true);
                        let rgba = tf.concat([rgb, a], -1);
                        tta.push(ttaBackward(rgba, k));
                    } else {
                        tta.push(ttaBackward(tasks[ptr++].y, k));
                    }
                }
                if (tta.length > 1) {
                    row.push(tf.mean(tf.concat(tta, 0), 0, true));
                } else {
                    row.push(tta[0]);
                }
            }
            img.push(tf.concat(row, -2));
        }
        let y = tf.concat(img, -3);
        y = tf.slice(y, [0, 0, 0, 0], [-1, config['yHeight'], config['yWidth'], -1]);
        return tf.squeeze(y, [0]);
    }
    const ttaForward = (x: any, type: any) => {
        switch (type) {
            case 0:
                break;
            case 1:
                x = tf.transpose(x, [0, 2, 1, 3]);
                break;
            case 2:
                x = tf.reverse(x, 1);
                break;
            case 3:
                x = tf.transpose(x, [0, 2, 1, 3]);
                x = tf.reverse(x, 1);
                break;
            case 4:
                x = tf.reverse(x, 2);
                break;
            case 5:
                x = tf.transpose(x, [0, 2, 1, 3]);
                x = tf.reverse(x, 2);
                break;
            case 6:
                x = tf.reverse(x, 2);
                x = tf.reverse(x, 1);
                break;
            case 7:
                x = tf.transpose(x, [0, 2, 1, 3]);
                x = tf.reverse(x, 1);
                x = tf.reverse(x, 2);
                break;
        }
        return x;
    }


    const ttaBackward = (x: any, type: any) => {
        switch (type) {
            case 0:
                break;
            case 1:
                x = tf.transpose(x, [0, 2, 1, 3]);
                break;
            case 2:
                x = tf.reverse(x, 1);
                break;
            case 3:
                x = tf.reverse(x, 1);
                x = tf.transpose(x, [0, 2, 1, 3]);
                break;
            case 4:
                x = tf.reverse(x, 2);
                break;
            case 5:
                x = tf.reverse(x, 2);
                x = tf.transpose(x, [0, 2, 1, 3]);
                break;
            case 6:
                x = tf.reverse(x, 1);
                x = tf.reverse(x, 2);
                break;
            case 7:
                x = tf.reverse(x, 2);
                x = tf.reverse(x, 1);
                x = tf.transpose(x, [0, 2, 1, 3]);
                break;
        }
        return x;
    }

    const showImageInfo = async (config: any, img: any) => {
        if (config != undefined || config != null) {
            let d = config['timeStop'].getTime() - config['timeStart'].getTime();

            //console.log({
            //    style: config['style'],
            //    size: config['width'] + 'x' + config['height'],
            //    sizeAfterScale: config['height'] != config['yHeight'] ? config['yWidth'] + 'x' + config['yHeight'] : 0,
            //    noise: noiseLevel[config['noise'] + 1] + ' noise reduction',
            //    tta: config['tta'] + 'x TTA',
            //    time: (d / 1000).toFixed(2) + 's',
            //    img: img
            //});
            toast.success('Process completed successfully!')
            return setWaifuProcess((prevState: WaifuProcess) => ({
                ...prevState,
                startProcess: false,
                bar: 0,
                openMenuEnd: true,
                params: {
                    style: `${config['style']}`,
                    size: `${config['width'] + 'x' + config['height']}`,
                    sizeAfterScale: `${config['height'] != config['yHeight'] ? config['yWidth'] + 'x' + config['yHeight'] : 0}`,
                    noise: noiseLevel[config['noise'] + 1] + ' noise reduction',
                    tta: config['tta'] + 'x TTA',
                    time: `${(d / 1000).toFixed(2) + 's'}`,
                    img: img
                }
            }))
        }
    }

    return {
        isOneColor,
        padding,
        showMessage,
        preProcess,
        postProcess,
        showImageInfo,
        setWaifuProcess,
        isWaifuProcess,
    }
}