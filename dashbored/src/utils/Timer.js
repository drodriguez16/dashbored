function* Timer(startTime) {
    while (true) {
        yield startTime += 1;
    };
}


const asyncIntervals = [];


const runAsyncInterval = async (cb, interval, intervalIndex) => {
    await cb();
    if (asyncIntervals[intervalIndex].run) {
        asyncIntervals[intervalIndex].id = setTimeout(() => runAsyncInterval(cb, interval, intervalIndex), interval)
    }
};

const setAsyncInterval = (cb, interval) => {
    if (cb && typeof cb === "function") {
        const intervalIndex = asyncIntervals.length;
        asyncIntervals.push({ run: true, id: 0 })
        runAsyncInterval(cb, interval, intervalIndex);
        return intervalIndex;
    } else {
        throw new Error('Callback must be a function');
    }
};

const clearAsyncInterval = (intervalIndex) => {
    if (asyncIntervals[intervalIndex].run) {
        clearTimeout(asyncIntervals[intervalIndex].id)
        asyncIntervals[intervalIndex].run = false
    }
};


export { runAsyncInterval, setAsyncInterval, clearAsyncInterval, Timer };