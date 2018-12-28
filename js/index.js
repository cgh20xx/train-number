function onloadHandler() {
  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  // let numbers = [0, 1, 2];
  const net = new brain.NeuralNetwork({ hiddenLayers: [12] });
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const cw = (canvas.width = 32);
  const ch = (canvas.height = 32);

  let trainArr = [];
  let normal = val => val / 255;

  function setTrainData(num) {
    let img = document.getElementById('img' + num);
    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, 0, 0, cw, ch);
    let data = ctx.getImageData(0, 0, cw, ch).data;
    let normolizeData = data.map(normal);
    let trainData = {
      input: normolizeData,
      output: { ['is' + num]: 1 }
    };
    console.log(trainData);
    trainArr.push(trainData);
  }

  numbers.forEach(num => {
    setTrainData(num);
  });

  net.train(trainArr);

  const brush = new Brush({
    el: '#fabric',
    width: 32,
    height: 32,
    brushSize: 1
  });

  let guessHandler = function() {
    let data = brush.ctx.getImageData(0, 0, cw, ch).data;
    let normalizeData = data.map(normal);
    const output = net.run(normalizeData);
    console.log(output);
    let str = '';
    for (let key in output) {
      str = str + key + ':' + output[key] + '<br>';
    }
    console.log(str);
    document.getElementById('result').innerHTML = str;
  };

  let clearHandler = function() {
    brush.clear();
    document.getElementById('result').innerHTML = '';
  };

  document.getElementById('guess').addEventListener('click', guessHandler);
  document.getElementById('clear').addEventListener('click', clearHandler);
}
window.onload = onloadHandler;
