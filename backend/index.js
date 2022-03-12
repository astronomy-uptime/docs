
// check for updates
// start express server
require('dotenv').config()
const exec = require("child_process").exec;
const Discord = require("discord.js");
const manager = new Discord.WebhookClient({id: process.env.WEBHOOKID, token: process.env.WEBHOOKTOKEN});

update()

async function update() {
  exec(`git pull origin master`, (error, stdout) => {
    let response = error || stdout;
    if (!error) {
      if (response.includes("Already up to date.")) {
      } else {

        if(error) {
          const UpdateEmbed = new Discord.MessageEmbed()
            .setColor("#ba2a54")
            .setTitle("AstroUptime Docs - Server Error")
            .setDescription(
              `${error}`
            );
          manager.send({ embeds: [UpdateEmbed] });
        }

        console.log("Update has been pulled, working on installing...")
        exec(`npm install`, (error1, stdout1) => {

          if(error1) {
            const UpdateEmbed = new Discord.MessageEmbed()
              .setColor("#ba2a54")
              .setTitle("AstroUptime Docs - Server Error")
              .setDescription(
                `${error1}`
              );
            manager.send({ embeds: [UpdateEmbed] });
          }

          if(stdout1) {
            console.log("Installing has successfully finsished, now working on build website...")
            exec(`npm run build`, (error2, stdout2) => {

              if(error2) {
                const UpdateEmbed = new Discord.MessageEmbed()
                  .setColor("#ba2a54")
                  .setTitle("AstroUptime Docs - Server Error")
                  .setDescription(
                    `${error2}`
                  );
                manager.send({ embeds: [UpdateEmbed] });
              }

              if(stdout2) {
                console.log("Website has been built, now restarting...")
                // start nextJS server


                const UpdateEmbed2 = new Discord.MessageEmbed()
                  .setColor("#57bd76")
                  .setTitle("AstroUptime Docs - Server Update")
                  .setDescription(
                    "Website has been rebuilt and server is restarting!"
                  );
                manager.send({ embeds: [UpdateEmbed2] });


                setTimeout(() => {
                  process.exit();
                }, 1000);
              }

            })

          }

        })
      }
    }
  });
}
setInterval(function() {
  update()
}, 10 * 1000);

require('./server.js')