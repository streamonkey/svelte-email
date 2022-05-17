const fs = require('fs')
const buildMail = require('./build')

const browserSync = require('browser-sync')

browserSync({
    server: ["dist", "internal"],
    injectChanges: false,
    ui: false,
    localOnly: true,
    online: false,
    host: "localhost",
    files: [
        "dist/*",
        // "internal/*"
    ],
    reloadOnRestart: true,
    open: false
})

fs.watch("./src/Mail.svelte", () => {
    buildMail()
})

buildMail()