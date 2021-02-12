# Kickstart App  

Kick your JavaScript projects set-up !  

Multiple stacks available : React, NextJS and Node.  
With multiple templates : with-redux, with-lowdb...  

All set-ups include Typescript, ESLint and Prettier.  
More addons are available : axios, classnames, react-jss, react-icons, ...  

It uses `yarn` in background (not `npm`) and it supposes you have internet connection.

It supports GitHub & GitLab urls. And username is stored in config file.

Highly inspired by [create-next-app](https://github.com/vercel/next.js/tree/canary/packages/create-next-app) and [create-react-app](https://github.com/facebook/create-react-app).  

⚠️ This repo is only here for my personal purpose.

## How to use it

For the moment, I only tried it locally by linking the package in global npm packages.

1. Clone project :  

```sh
git clone https://github.com/jeannnemelanie/kickstart.git
```

2. Go to project directory :

```sh
cd kickstart
```

3. Create your env variables (optional):

```sh
cp .env.example .env
# then edit .env file with your values
```

4. Install project :

```sh
yarn build
npm link
```

5. Use it to create new app :

```sh
cd your_working_directory
create-app
```

Answser the questions, wait few minutes and you are all set ✨

---

## Todo

### All stacks

- [ ] Add commands in README.md file
- [ ] Add create repo step

### React stack

- [ ] Add webpack set-up file with aliases and Circular dependency plugin

### Node stack

- [ ] Add Node support
- [ ] Add Node templates (ncc, nodemon, express, ...)
