document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("star-canvas");
    const ctx = canvas.getContext("2d");

    
    function resizeCanvas() {
        const dpr = window.devicePixelRatio || 1;
        canvas.width = window.innerWidth * dpr;
        canvas.height = window.innerHeight * dpr;
        canvas.style.width = window.innerWidth + "px";
        canvas.style.height = window.innerHeight + "px";
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
    }

    resizeCanvas();
    window.addEventListener("resize", () => {
        resizeCanvas();
        createStars();
    });

    const isMobile = window.innerWidth < 600;

   
    let stars = [];
    function createStars() {
        const starCount = isMobile ? 50 : 150;
        stars = [];
        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * (isMobile ? 1.5 : 2) + 0.5,
                alpha: Math.random() * 0.8 + 0.2, 
                twinkle: Math.random() * 0.003 + 0.001 // nopeus
            });
        }
    }

    createStars();

    
    let mouse = { x: null, y: null };
    if (!isMobile) {
        window.addEventListener("mousemove", e => {
            mouse.x = e.x;
            mouse.y = e.y;
        });
    }

    
    function animate() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        stars.forEach(s => {
            
            s.alpha += s.twinkle;
            if (s.alpha > 1) s.alpha = 0.2; 

            ctx.beginPath();
            ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(255,255,255,${s.alpha})`;
            ctx.fill();

            
            if (!isMobile && mouse.x && mouse.y) {
                const dx = s.x - mouse.x;
                const dy = s.y - mouse.y;
                const dist = Math.sqrt(dx*dx + dy*dy);
                if (dist < 80) {
                    s.x += dx / dist * 0.5;
                    s.y += dy / dist * 0.5;
                }
            }
        });

        requestAnimationFrame(animate);
    }

    animate();
});
