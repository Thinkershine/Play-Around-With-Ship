class TetrisPlayer {
  constructor() {
    this.pos = { x: 5, y: 5 };
    this.matrix = null;
    this.score = 0;
  }

  move(dir) {
    this.pos.x += dir;
    if (collide(arena, this)) {
      this.pos.x -= dir;
    }
  }
}
