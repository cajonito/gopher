class Gopher {
  constructor(gopherSel, rightPupilSel, leftPupilSel) {
    this._dom = $(gopherSel);
    var width = this._dom.width();
    var height = this._dom.height();
    this.x = width / 2;
    this.y = height / 2;

    var range = width * 0.07;

    this.rightEye = new Eye(
      rightPupilSel,
      this.x - width * 0.17,
      this.y - height * 0.33,
      range
    );

    this.leftEye = new Eye(
      leftPupilSel,
      this.x + width * 0.14,
      this.y - height * 0.34,
      range
    );
  }

  update(x, y) {
  
    var offset = this._dom.offset();
    var baseX = offset.left;
    var baseY = offset.top;

    this.rightEye.update(x - baseX, y - baseY);
    this.leftEye.update(x - baseX, y - baseY);

    return this;
  }

  render() {
    this.rightEye.render();
    this.leftEye.render();

    return this;
  }
}

class Eye {
  constructor(selector, x, y, range) {
    this._pupil = new Pupil(selector, x, y);
    this.x = x;
    this.y = y;
    this.range = range;
  }

  get pupil() {
    return this._pupil;
  }

  update(x, y) {
    const distanceRatio = 0.3;

    var distanceX = x - this.x;
    var distanceY = y - this.y;
    var distance = Math.min(
      Math.sqrt(distanceX ** 2 + distanceY ** 2) * distanceRatio,
      this.range
    );

    var rad = Math.atan2(distanceY, distanceX);

    var newX = this.x + Math.cos(rad) * distance;
    var newY = this.y + Math.sin(rad) * distance;

    this.pupil.update(newX, newY);
    return this;
  }

  render() {
    this.pupil.render();

    return this;
  }
}

class Pupil {
  constructor(selection, x, y) {
    this._dom = $(selection);
    this.update(x, y);
  }

  update(x, y) {
    this.x = x - this._dom.width() / 2;
    this.y = y - this._dom.height() / 2;

    return this;
  }

  render() {
    this._dom.css({
      top: this.y + "px",
      left: this.x + "px"
    });

    return this;
  }
}
