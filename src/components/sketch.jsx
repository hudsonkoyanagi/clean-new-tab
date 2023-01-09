class Ball{
    constructor(x,y,ya,r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.yv = 0;
        this.ya = ya;
    }

    update(){
        this.y += this.yv;
        this.yv += this.ya;
        return this.y;
    }
}

function Sketch(p5) {
    
    const height = document.documentElement.clientHeight/1.1;
    const width = document.documentElement.clientWidth/3;
    const radius = 0.04 * height;
    const acc = 0.0003 * height;

    p5.setup = () => {
        p5.createCanvas(width,height);
    };

    let balls = [];

    p5.draw = () => {
        p5.background(localStorage.getItem("primary_colour"));
        p5.fill(localStorage.getItem("secondary_colour"));
        p5.line(radius,height,width-radius,height)

        balls.forEach(ball => {
            if(ball.y + ball.r >= height){
                ball.yv =- ball.yv;
                // 2% velocity loss every bounce
                ball.yv *= 0.98;
            }
            p5.circle(ball.x, ball.update(), ball.r);
        });
    };

    p5.mouseClicked = () => {
        let tempx = p5.mouseX;
        let tempy = p5.mouseY;
        if(0 < tempx && tempx < width && 0 < tempy && tempy < height-95){
            balls.push(new Ball(tempx, tempy, acc, radius));
        }
    }
}

export default Sketch;