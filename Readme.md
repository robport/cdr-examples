# Customer Deposits Registry Example Code

## Installing these examples
- git clone git@github.com:robport/cdr-examples.git
- cd cdr-examples
- npm i

## API Authentication

1. Generate an RSA Key Pair
- cd cdr-examples
- openssl genpkey -algorithm RSA -out private_key.pem -pkeyopt rsa_keygen_bits:2048
- openssl rsa -pubout -in private_key.pem -out public_key.pem

2. Register your public key with your CDR accouunt
- Sign-in to https://customer-deposits-registry.com/
- Goto User Settings
- Copy the contents of public_key.pem into the box and hit save

3. Run the example program
- npm run authenticate

## Signature Generation

- cd cdr-examples
- npm i
- npm run signature
