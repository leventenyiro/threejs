window.onload = function () {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true }); // Enable alpha for canvas transparency
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.querySelector('.landing').appendChild(renderer.domElement); // Append to landing section

    const spotLight = new THREE.SpotLight(0xe7c6ff, 0.7);
    const spotLightRadius = 8;
    const spotLightAngle = Date.now() * 0.0005;
    spotLight.position.x = Math.sin(spotLightAngle) * spotLightRadius;
    spotLight.position.z = Math.cos(spotLightAngle) * spotLightRadius;
    scene.add(spotLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1); // Ambient light to illuminate all sides
    scene.add(ambientLight);

    const geometry = new THREE.SphereGeometry(3, 64, 32);

    var material = new THREE.MeshPhongMaterial({ color: 0xef476f });

    const object = new THREE.Mesh(geometry, material);
    scene.add(object);

    camera.position.z = 5;

    const radius = 8;
    const angle = 0;
    camera.position.x = Math.sin(angle) * radius;
    camera.position.z = Math.cos(angle) * radius;
    camera.lookAt(object.position);

    renderer.render(scene, camera);

    let isDragging = false;
    let previousX = 0;
    let previousY = 0;

    // window.addEventListener('click', () => {
    //     material.color.set(material.color.getHex() === 0xed760e ? 0xef476f : 0xed760e);
    // });

    const rotateCamera = (deltaX, deltaY) => {
        const sensitivity = 0.01;
        camera.rotation.y -= deltaX * sensitivity;
        camera.rotation.x -= deltaY * sensitivity;
        camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    };

    document.addEventListener('mousedown', (event) => {
        isDragging = true;
        previousX = event.clientX;
        previousY = event.clientY;
    });

    document.addEventListener('mousemove', (event) => {
        if (isDragging) {
            const deltaX = event.clientX - previousX;
            const deltaY = event.clientY - previousY;
            rotateCamera(deltaX, deltaY);
            previousX = event.clientX;
            previousY = event.clientY;
            renderer.render(scene, camera);
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.render(scene, camera);
    });

    const animate = () => {
        requestAnimationFrame(animate);

        const spotLightAngle = Date.now() * 0.0005;
        spotLight.position.x = Math.sin(spotLightAngle) * spotLightRadius;
        spotLight.position.z = Math.cos(spotLightAngle) * spotLightRadius;

        renderer.render(scene, camera);
    };

    animate();
};