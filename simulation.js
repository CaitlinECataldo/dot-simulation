const dots =
document.querySelectorAll('.dot');
const speed1 = 2;
const speed2 = 4; //Adjust speed as needed

const dotPositions = 
Array.from(dots).map(() => 
({ x: Math.random() * (window.innerWidth - 20), y:Math.random() * (window.innerHeight - 20), dx: speed1, dy: speed1 }));

// Set different speed for the second dot
dotPositions[1].dx = speed2;
dotPositions[1].dy = speed2;

function areDotsColliding(dot1, dot2) {
    const rect1 =
    dot1.getBoundingClientRect();
    const rect2 =
    dot2.getBoundingClientRect();

    return (
        rect1.left < rect2.right &&
        rect1.right > rect2.left &&
        rect1.top < rect2.bottom &&
        rect1.bottom > rect2.top
    );
}

function handleCollision(dot1, dot2) {
    const separationDistance = 5;
    const angle = Math.atan2(dot2.y - dot1.y, dot2.x - dot1.x);
    

    // Reverse the direction of each dot
    dot1.dx = -dot1.dx;
    dot1.dy = -dot1.dy;

    dot2.dx = -dot1.dx;
    dot2.dy = -dot2.dy;

    //seperate the dots after collision
    dot1.x += separationDistance * Math.cos(angle);
    dot1.y += separationDistance * Math.sin(angle);

    dot2.x -= separationDistance * Math.cos(angle);
    dot2.y -= separationDistance * Math.sin(angle);
}

function updateDotPositions() {
    dotPositions.forEach((dotPos, index) => {
        dotPos.x += dotPos.dx;
        dotPos.y += dotPos.dy;
    
    //Reverse direction upon hitting window borders
    if (dotPos.x + 
        dots[index].clientWidth >
        window.innerWidth || dotPos.x < 0) {
            dotPos.dx = -dotPos.dx;
        }

    if (dotPos.y + dots[index].clientHeight >
        window.innerHeight || dotPos.y < 0) {
            dotPos.dy = -dotPos.dy;
        }

    // Check for collisions between dots
    for (let i = 0; i < dots.length; i++) {
        if (i !== index && areDotsColliding(dots[index], dots[i])) 
        {
            handleCollision(dotPos, dotPositions[i]);
        }
    }

    // Update dot position
    dots[index].style.left = `${dotPos.x}px`;
    dots[index].style.top = `${dotPos.y}px`;
        });

    // Request the next animation frame
    requestAnimationFrame(updateDotPositions);
    }


    


// Start the simulation
updateDotPositions();