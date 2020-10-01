cd /home/opc/node/qlink
if [ `git pull | grep -ic 'Already up-to-date'` -eq 1 ];
then
	echo "Deploying changes.."
	sudo kill -9 `pgrep node | head -1`
	sudo PORT=80 npm start &
fi
