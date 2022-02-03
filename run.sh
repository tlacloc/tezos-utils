docker run --rm --name bakingbad/smartpy-cli --volume /home/erick/tlaloc/first-contract-tezos/:/project -w /project bakingbad/smartpy-cli /bin/bash -c "compile src/testrobots.py artifacts/testrobots --html"


docker run --rm --name bakingbad/smartpy-cli --volume ${join(__dirname, '../')}:/project -w /project bakingbad/smartpy-cli /bin/bash -c "compile ${path}/${contract}.py compiled/${contract} --html"

## this one works!

docker run --rm --name smartpy-cli --volume /home/erick/tlaloc/tezos-utils/:/project -w /project bakingbad/smartpy-cli "compile src/calculator.py build/calculator --html"
