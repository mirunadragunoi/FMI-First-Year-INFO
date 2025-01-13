document.addEventListener("DOMContentLoaded", () => {
    const desen = document.getElementById("yogaCanvas");
    const ctx = desen.getContext("2d");

    // Variabile pentru animație
    let angle = 0;
    let gradientOffset = 0;
    let butterflyAngle = 0;

    function animate() {
        ctx.clearRect(0, 0, desen.width, desen.height);
        drawBackground(ctx, gradientOffset, desen);
        drawYogaMat(ctx);
        drawPerson(ctx, angle);
        drawButterflies(ctx, butterflyAngle);
        angle += 0.05; // Crește viteza animației
        gradientOffset += 0.5; // Mișcă gradientul fundalului
        butterflyAngle += 0.02; // Mișcare mai lentă a fluturilor
        requestAnimationFrame(animate);
    }

    animate();
});

function drawBackground(ctx, offset, desen) {
    // Gradient animat pentru fundal
    const gradient = ctx.createLinearGradient(0, offset % desen.height, 0, 600 + offset % desen.height);
    gradient.addColorStop(0, "#87CEEB");
    gradient.addColorStop(1, "#FFFFFF");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, desen.width, desen.height);

    // Nori animați
    drawCloud(ctx, 100 + offset % desen.width, 100, 50, 30);
    drawCloud(ctx, 400 + (offset * 0.7) % desen.width, 150, 60, 40);
    drawCloud(ctx, 700 + (offset * 0.5) % desen.width, 80, 40, 20);

    // Flori decorative animate
    const flowerAngle = offset / 100; // Rotește florile
    drawDecorativeFlowers(ctx, 150, 150, 80, flowerAngle, desen);
    drawDecorativeFlowers(ctx, 600, 180, 60, -flowerAngle, desen);
}

function drawCloud(ctx, x, y, width, height) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    ctx.ellipse(x, y, width, height, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function drawDecorativeFlowers(ctx, x, y, size, rotation, desen) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation); // Adaugă rotație

    ctx.fillStyle = "rgba(212, 227, 240, 0.6)";
    for (let i = 0; i < 8; i++) {
        const angle = (i * Math.PI) / 4;
        ctx.beginPath();
        ctx.ellipse(
            size * Math.cos(angle),
            size * Math.sin(angle),
            size * 0.3,
            size * 0.5,
            angle,
            0,
            2 * Math.PI
        );
        ctx.fill();
    }

    ctx.restore();
}

function drawYogaMat(ctx) {
    // Covoraș yoga
    ctx.fillStyle = "#fbe8a6";
    ctx.beginPath();
    ctx.roundRect(200, 450, 400, 20, 10);
    ctx.fill();

    // Umbră sub covoraș
    ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
    ctx.beginPath();
    ctx.ellipse(400, 470, 220, 10, 0, 0, 2 * Math.PI);
    ctx.fill();
}

function drawPerson(ctx, angle) {
    // Adaugă mișcări animate
    drawLegs(ctx, angle);
    drawTorso(ctx);
    drawArms(ctx, angle);
    drawHead(ctx);
}

function drawHead(ctx) {
    // Cap
    ctx.fillStyle = "#f5c3a1";
    ctx.beginPath();
    ctx.arc(400, 140, 30, 0, 2 * Math.PI);
    ctx.fill();

    // Păr
    ctx.fillStyle = "#603e26";
    ctx.beginPath();
    ctx.arc(400, 130, 35, Math.PI, 2 * Math.PI);
    ctx.fill();
}

function drawTorso(ctx) {
    // Trunchi
    const gradient = ctx.createLinearGradient(370, 200, 430, 200);
    gradient.addColorStop(0, "#f5c3a1");
    gradient.addColorStop(1, "#f1b299");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(385, 170);
    ctx.lineTo(370, 260);
    ctx.lineTo(430, 260);
    ctx.lineTo(415, 170);
    ctx.closePath();
    ctx.fill();

    // Top sport
    ctx.fillStyle = "#eae0d5";
    ctx.beginPath();
    ctx.moveTo(370, 260);
    ctx.lineTo(430, 260);
    ctx.lineTo(420, 200);
    ctx.lineTo(380, 200);
    ctx.closePath();
    ctx.fill();
}

function drawArms(ctx, angle) {
    // Braț drept animat
    ctx.strokeStyle = "#f5c3a1";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(430, 190);
    ctx.lineTo(480, 120);
    ctx.lineTo(500 + 30 * Math.sin(angle), 70);
    ctx.stroke();

    // Braț stâng animat
    ctx.beginPath();
    ctx.moveTo(370, 190);
    ctx.lineTo(320 + 20 * Math.sin(angle), 250);
    ctx.lineTo(290, 300);
    ctx.stroke();
}

function drawLegs(ctx, angle) {
    // Picior drept animat
    ctx.strokeStyle = "#f5c3a1";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(420, 260);
    ctx.lineTo(460, 400);
    ctx.lineTo(490 + 10 * Math.sin(angle), 460);
    ctx.stroke();

    // Picior stâng animat
    ctx.beginPath();
    ctx.moveTo(380, 260);
    ctx.lineTo(350, 350);
    ctx.lineTo(300 - 10 * Math.sin(angle), 460);
    ctx.stroke();
}

function drawButterflies(ctx, angle) {
    // Fluture 1
    drawButterfly(ctx, 200 + 50 * Math.sin(angle), 100 + 20 * Math.cos(angle), angle, "#ff9999");

    // Fluture 2
    drawButterfly(ctx, 500 + 30 * Math.sin(angle + Math.PI / 2), 150 + 30 * Math.cos(angle), angle, "#99ccff");
}

function drawButterfly(ctx, x, y, angle, color) {
    ctx.save();
    ctx.translate(x, y);

    // Aripa stângă
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.ellipse(-20, 0, 20, 10 + 5 * Math.sin(angle), 0, 0, 2 * Math.PI);
    ctx.fill();

    // Aripa dreaptă
    ctx.beginPath();
    ctx.ellipse(20, 0, 20, 10 + 5 * Math.sin(angle), 0, 0, 2 * Math.PI);
    ctx.fill();

    // Corpul
    ctx.fillStyle = "#000";
    ctx.beginPath();
    ctx.ellipse(0, 0, 5, 15, 0, 0, 2 * Math.PI);
    ctx.fill();

    ctx.restore();
}
