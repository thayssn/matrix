import { chars } from './chars.js';
const querySelector = x => document.querySelector(x);

const canvas = querySelector('canvas');
const ctx = canvas.getContext("2d");
const cw = window.innerWidth;
const ch = window.innerHeight;
canvas.width = cw;
canvas.height = ch;

let maxCharCount = 1000;
let fallingCharArr = [];
let fontSize= 20;
let maxColumns = Math.floor(cw/fontSize);
let frames = 0;

const getRandomChar = () => chars[Math.floor(Math.random() * (chars.length - 1))].toUpperCase()
const getRandomX = () => Math.floor( (Math.random() * maxColumns ) ) * fontSize;
const getRandomY = () => (Math.random() * ch) / 2 - 50;
const getRandomSpeed = () => (Math.random() * fontSize * 3) / 4  + (fontSize * 3) / 4

class FallingChar {

    constructor(x,y){
        this.x = x;
        this.y = y
    }

    draw (ctx) {
        this.value = getRandomChar();
        this.speed = getRandomSpeed();
        
        let blue = ((this.y + Math.floor(Math.random() * ch/5)) * 255) / ch


        ctx.fillStyle = `rgba(0,255,${blue})`;
        ctx.font =`${fontSize}px 'Special Elite'`;
        ctx.fillText(this.value, this.x, this.y)

        this.y += this.speed;

        if(this.y > ch) {
            this.y = getRandomY();
            this.x = getRandomX();
            this.speed = getRandomSpeed()
        }

    }
}

let update = () => {
    if(fallingCharArr.length < maxCharCount){
        let fallingChar = new FallingChar(getRandomX(),getRandomY())
        fallingCharArr = [...fallingCharArr, fallingChar]
    }

    ctx.fillStyle = "rgba(0,0,0, 0.1)";
    ctx.fillRect(0,0, cw, ch);

    fallingCharArr.map(char => {
        if(frames % 2 == 0 ) char.draw(ctx)
    })

    requestAnimationFrame(update);
    frames++;
}

update()