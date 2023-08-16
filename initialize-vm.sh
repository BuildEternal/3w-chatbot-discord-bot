set -v

# Install logging monitor. The monitor will automatically pick up logs sent to syslog.
curl -s "https://storage.googleapis.com/signals-agents/logging/google-fluentd-install.sh" | bash
service google-fluentd restart &

# Install dependencies from apt.
apt-get update
apt-get install -yq ca-certificates git build-essential supervisor

# Set variables.
# PROJECT_ID=$(curl "http://metadata.google.internal/computeMetadata/v1/project/project-id" -H "Metadata-Flavor: Google")
REPO=https://github.com/BuildEternal/3w-chatbot-discord-bot

# CLIENT_ID=1140443348159696987
# BOT_TOKEN=$(
#     curl "https://secretmanager.googleapis.com/v1/projects/${PROJECT_ID}/secrets/BOT_TOKEN/versions/latest:access" \
#         --request "GET" \
#         --header "authorization: Bearer $(gcloud auth print-access-token)" \
#         --header "content-type: application/json" |
#         jq -r ".payload.data" | base64 --decode
# )

# git requires $HOME and it's not set during the startup script.
export HOME=/root

# Install and set up nodejs.

mkdir /opt/nodejs
curl https://nodejs.org/dist/v16.15.0/node-v16.15.0-linux-x64.tar.gz | tar xvzf - -C /opt/nodejs --strip-components=1
ln -s /opt/nodejs/bin/node /usr/bin/node
ln -s /opt/nodejs/bin/npm /usr/bin/npm
ln -s /opt/nodejs/bin/npx /usr/bin/npx

npm install -g ts-node
ln -s /opt/nodejs/bin/ts-node /usr/bin/ts-node

# Get the application source code from the repository.
git config --global credential.helper gcloud.sh
git clone ${REPO} /opt/app/discord-bot

# Install app dependencies
cd /opt/app/discord-bot
npm install

# Create a nodeapp user. The application will run as this user.
useradd -m -d /home/nodeapp nodeapp
chown -R nodeapp:nodeapp /opt/app

# Configure supervisor to run the node app.
cat >/etc/supervisor/conf.d/node-app.conf <<EOF
[program:nodeapp]
directory=/opt/app/discord-bot
command=npm start
autostart=true
autorestart=true
user=nodeapp
environment=HOME="/home/nodeapp",USER="nodeapp",NODE_ENV="production"
stdout_logfile=syslog
stderr_logfile=syslog
EOF

supervisorctl reread
supervisorctl update

# Application should now be running under supervisor.
