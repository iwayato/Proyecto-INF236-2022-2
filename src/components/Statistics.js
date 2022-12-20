const Statistics = (dataArray) => {

    let means = []
    let stds = []

    dataArray.forEach(array => {
        let n = array.length;
    
        //Se limpia el array para el caso del Sensor radiometro
        for (let i = 0; i < n; i++) {
            if (array[i] === "/") {
                console.log("Se elimina del array : /")
                array.splice(i, 1)
            }
        }
    
        let m = array.length;
        let sum = 0;
    
        if (m === 0) {
            console.log("No hay datos");
            return ["-", "-"]
        }
    
        for (let j = 0; j < m; j++) {
            sum = sum + Number(array[j]);
        }
    
        means.push(sum/m)
        stds.push(Math.sqrt(array.map(x => Math.pow(x - (sum/m), 2)).reduce((a, b) => a + b) / m))
    });

    return [means, stds]
}

export default Statistics;
