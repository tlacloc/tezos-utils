require('dotenv').config()

// these accounts are just for testing!
const ADMIN = {
  "pkh": "tz1WbaFu1621EAx9bq5qv22RKUG1RAQqusSL",
  "secretKey": "edskRuEtvw1dAKuYCsHbfCKB7dgnnqSAPvQih67mEYKkr5ikMeuUu6yoTNC1MDSnrxpeA6e2EsaRfnmYFihhb9eNyWB2w1NYV1"
}

const userA = {
  "pkh": "tz1c34H3zPG6XLhCHnuvjhL28De7EB92iYWn",
  "secretKey": "edskRm6pESfMfRmT338FJh5SfcMB77GMN5i5z6nbdGNNAGKeVSxSFrHqgZ2wnWjQCmDxyZcJPRDyF6Sza9oyGwf5aQ3SgLLDwg"
}

const userB = {
  "pkh": "tz1Z4wTi75FxzQc6d2WQgZKUNrPwYALfkE55",
  "secretKey": "edskRybw5GzkDksTfF5uXDGLozJep1nK1we7Cnnrrkic9u9brAKkAS7g4aHHSRbYqQJiiUNiQERcxmYpDi9gVRxM7t58FLxNJr"
}

module.exports = {
	ADMIN, userA, userB
}