module.exports = {
    executablePath: '/usr/bin/chromium-browser',
    launch: {
        
        headless: true,
        
        args: [
            // Required for Docker
            '--no-sandbox',
            '--disable-setuid-sandbox',
            // This will write shared memory files into /tmp instead of /dev/shm,
            // because Docker’s default for /dev/shm is 64MB
            '--disable-dev-shm-usage'
         ],
         pipe: true // Required for Docker
       
    },
    browserContext: "default"
};
