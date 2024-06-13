# LendSQR Backend Wallet Service By Abijah Johnnie

A NodeJS(Expressjs) + Typescript + KnexJS wallet service  using the Karma API to lookup potential users before onboarding with simple deposit, withdrawal and transfer features

## Installation

first, clone the project then open the project file and run the command below

```bash
npm install
npm run start
```

## ER-DIAGRAM URL
[Click to view ER-diagram](https://dbdesigner.page.link/XSgTSraTKR4hBHkL8)


## Available APIS

### AUTHENTICATION WITH JWT

#### Register
```c
method: POST
URL: /auth/register
payload: {
firstname: "",
lastname: "",
email: "",
phone: "",
password: ""
}
```

#### Login
```c
method: POST
URL: /auth/login
payload: {
email: "",
password: ""
}
```

#### Profile
```c
method: GET
URL: /user/profile
```

#### Deposit
```c
method: POST
URL: /wallet/deposit
payload: {
amount: "",
}
```

#### Withdrawal
```c
method: POST
URL: /wallet/withdrawal
payload: {
amount: "",
narration: "",
account_number: "",
bank_code: ""
}
```

#### Transfer
```c
method: POST
URL: /wallet/transfer
payload: {
amount: "",
phone: ""
}
```
###### NOTE: phone is the transfer payload is the recipient phone number and it must exist in the system.


## License

[MIT](https://choosealicense.com/licenses/mit/)