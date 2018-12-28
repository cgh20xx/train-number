class Brush {
  constructor(option = {}) {
    this.el = document.querySelector(option.el);
    this.width = option.width || 640;
    this.height = option.height || 640;
    this.brushSize = option.brushSize || 40;
    this.init();
  }

  init() {
    console.log('init');
    this.touchFlag = false;
    this.dots = [];
    this._createCanvas();
    this._onResize();
  }

  _createCanvas() {
    console.log('create');
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    // this.ctx.fillStyle = '#fff';
    // this.ctx.fillRect(0, 0, this.width, this.height);
    this.el.appendChild(this.canvas);

    this._onPointerDown = this._onPointerDown.bind(this);
    this._onPointerMove = this._onPointerMove.bind(this);
    this._onPointerUp = this._onPointerUp.bind(this);
    this._onResize = this._onResize.bind(this);
    // this.onRaf = this.onRaf.bind(this);

    this.canvas.addEventListener(Han.Event.down, this._onPointerDown);
    this.canvas.addEventListener(Han.Event.up, this._onPointerUp);
    window.addEventListener('resize', this._onResize);

    // window.requestAnimationFrame(this.onRaf);
  }

  _drawBursh(e) {
    const rect = e.target.getBoundingClientRect();
    let clientX = e.clientX;
    let clientY = e.clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    }
    let mx = (clientX - rect.left) * this.scale;
    let my = (clientY - rect.top) * this.scale;

    if (this.oldX || this.oldY) {
      for (let i = 0; i <= 1; i += 0.05) {
        let x = utils.lerp(i, this.oldX, mx);
        let y = utils.lerp(i, this.oldY, my);

        this.ctx.save();
        this.ctx.translate(x, y);

        this.ctx.beginPath();
        this.ctx.arc(0, 0, this.brushSize, 0, Math.PI * 2);
        this.ctx.fillStyle = '#000';
        this.ctx.fill();
        this.ctx.closePath();
        this.ctx.restore();
      }
    }

    this.oldX = mx;
    this.oldY = my;
  }

  _onPointerDown(e) {
    console.log('down');
    e.preventDefault();
    this.touchFlag = true;
    this.canvas.addEventListener(Han.Event.move, this._onPointerMove);
    this._drawBursh(e);
  }

  _onPointerMove(e) {
    e.preventDefault();
    this._drawBursh(e);
  }

  _onPointerUp(e) {
    console.log('up');
    this.oldX = null;
    this.oldY = null;
    this.canvas.removeEventListener(Han.Event.move, this._onPointerMove);
  }

  _onResize(e) {
    this.scale = this.width / this.el.clientWidth;
    // console.log(this.scale);
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
}
