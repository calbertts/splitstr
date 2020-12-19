cat branchesInfo | awk -F"|" '{print $3}' | \
  curl -s -X POST --data-binary @- http://localhost:3000/api/server?sep=`node -e 'console.log(encodeURI(","))'`
