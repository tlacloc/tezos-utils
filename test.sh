sp test src/testrobots.py artifacts/testrobots --html
sp test src/testrobotsv2.py artifacts/testrobotsv2 --html
sp test src/fa2-nft.py artifacts/fa2-nft --html
sp test src/fa2-nft-test.py artifacts/fa2-nft-test --html


docker run --rm --name smartpy-cli --volume /home/erick/tlaloc/tezos-utils/:/project -w /project bakingbad/smartpy-cli "test src/calculator.py tests/ --html"


