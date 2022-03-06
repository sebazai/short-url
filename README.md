# URL Shortener

Shorten URL services. Similar to bit.ly

## Prerequisites

Node v16.4.0  
NPM v8.1.2

## Setup dev

Create `default.json` file similar to `template.json` in `config` folder on root and add your own `mongoURI` connection key.

## Run dev

Run in root
```
npm ci
npm run dev
```

In another terminal
```
cd frontend
npm ci
npm start
```


## Todo

- Better type checking from backend
  - Better error handling
  - Display nicely error messages
- Testing