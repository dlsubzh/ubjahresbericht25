/* function calcCanvasSize() {
    const canvas = document.getElementById("canvas");
    const ctx = canvas.getContext("2d");

    // Set display size (css pixels).
    const sizew = 1600 * 0.7;
    const sizeh = 3900 * 0.7;
    const scale = window.devicePixelRatio; // Change to 1 on retina screens to see blurry canvas.
    console.log(devicePixelRatio)
    const scaledsizew = Math.floor(sizew * scale);
    const scaledsizeh = Math.floor(sizeh * scale);

    // Set actual size in memory (scaled to account for extra pixel density).

    canvas.width = Math.floor(scaledsizew);
    canvas.height = Math.floor(scaledsizeh);
    canvas.style.width = `${sizew}px`;
    canvas.style.height = `${sizeh}px`;

    const documentHeight = Math.round(sizeh + 300);
    document.documentElement.style.setProperty('--app-height', `${documentHeight}px`);
    console.log(`Canvas height set as --app-height: ${sizeh}px`);
    console.log(canvas.width)
    console.log(canvas.height)


    // Normalize coordinate system to use CSS pixels.
    ctx.scale(scale, scale);
    console.log(ctx + " ctx")
}

calcCanvasSize()
window.addEventListener('resize',calcCanvasSize)
 */