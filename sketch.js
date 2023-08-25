var imgIn;

var matrix = [
    [-1, -1, -1],
    [-1, 9, -1],
    [-1, -1, -1]
];


function preload() {
    imgIn = loadImage("Assets/jelly.jpg");
}

function setup() {
    createCanvas(imgIn.width * 2, imgIn.height);
    pixelDensity(1);
}

function draw() {
    background(255);
    imgIn.filter(GRAY);
    image(imgIn, 0, 0);
    image(sharpFilter(imgIn), imgIn.width, 0); 
    noLoop();
}

function sharpFilter(img) {
    var imgOut = createImage(img.width, img.height);
    imgOut.loadPixels();
    img.loadPixels();
    const matrixSize = matrix.length;

    for (var x = 0; x < img.width; x++) {
        for (var y = 0; y < img.height; y++) {
            var index = (x + y * img.width) * 4;

            var c = convolution(x, y, matrix, matrixSize, imgIn);


            imgOut.pixels[index + 0] = c[0];
            imgOut.pixels[index + 1] = c[1];
            imgOut.pixels[index + 2] = c[2];
            imgOut.pixels[index + 3] = 255;
        }
    }
    imgOut.updatePixels();
    return imgOut;
}


function convolution(x, y, matrix, size, img) {
    var totalRed = 0;
    var totalGreen = 0;
    var totalBlue = 0;
    var offset = Math.floor(size / 2);
    

    for (var i=0; i<size; i++) {
        for (var j=0; j<size; j++) {
            var xloc = x + i - offset;
            var yloc = y + j - offset;

            var index = (img.width * yloc + xloc) * 4;
            index = constrain(index, 0, img.pixels.length - 1);

            totalRed += img.pixels[index + 0] * matrix[i][j];
            totalGreen += img.pixels[index + 1] * matrix[i][j];
            totalBlue += img.pixels[index + 2] * matrix[i][j];
        }
    }

    return [totalRed, totalGreen, totalBlue];
}