# TO BEGIN (RUN MANUALLY):

# # Install dependencies from apt.
# apt-get update
# apt-get install -yq ca-certificates git supervisor

# # Get the application source code.
# git config --global pull.ff true
# git clone https://github.com/BuildEternal/3w-chatbot-discord-bot.git /opt/discordbot/discord-bot

# # Run the initialization script.
# bash /opt/discordbot/discord-bot/initialize-vm.sh

# # Initialize nvm PATH.
# source ~/.bashrc

# Install and set up nodejs.
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
source ~/.bashrc

nvm install node
npm install -g npm@latest
npm install -g ts-node

# Install app dependencies
cd /opt/discordbot/discord-bot
npm install

# Configure supervisor to run the discord bot.
cat >/etc/supervisor/conf.d/discord-bot.conf <<EOF
[program:discordbot]
directory=/opt/discordbot/discord-bot
command=npm start
autostart=true
autorestart=true
user=root
environment=HOME="/root",USER="root",NODE_ENV="production",PATH="${PATH}"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update

# Application should now be running under supervisor.
