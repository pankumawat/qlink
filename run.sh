#rm -rf ./node_modules/
npm install;
echo "Deploying changes.."
sudo kill -9 `pgrep node | head -1`
sudo SQL_PORT=1811 node server.js &
