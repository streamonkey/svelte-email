const { renderMail } = require("svelte-mail")

const config = require("./config.json")

require("svelte/register")({

})

const fs = require('fs')

async function buildMail() {
    // clear the module cache or else the compiled result will be cached
    delete require.cache[require.resolve(config.mailTemplate)]

    console.log("building " + config.mailTemplate)
    const Mail = require(config.mailTemplate).default
    const { html, text } = await renderMail(Mail, { data: config.data })

    fs.mkdirSync('./dist', { recursive: true })

    fs.writeFileSync('./dist/mail.html', html)
    fs.writeFileSync('./dist/mail.txt', text)
}

if (require.main === module) {
    buildMail()
}

module.exports = buildMail