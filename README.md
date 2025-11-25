### Auto Scraper
Plans to scrape auto sites for car prices and ping the user when something they desire is found.

## Setup
# NVM
Install nvm for your machine then run the following commands to install the appropriate Node.js version 
`nvm install 24.11.1`
`nvm use     24.11.1`

# Packages
Install `yarn` globally to use for all future packages
`npm install -g yarn`

`yarn add @prisma/adapter-pg @prisma/client @types/cors cors dotenv express jsonwebtoken pg zod`
`yarn add -D @tsconfig/node-lts @types/express @types/jsonwebtoken @types/node @types/pg @vitest/coverage-v8 prisma tsc tsx typescript vitest`

To setup Prisma follow this guide. The above installations will already include all the Prisma packages needed.
https://www.prisma.io/docs/getting-started/prisma-orm/add-to-existing-project/postgresql

# Prisma Setup
Add to .env DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
Generate from `schema.prisma` file:
`npx prisma generate`

If no migrations, generate and apply first migration with this:
`npx prisma migrate dev --name init`

Generate and apply future migrations with:
`nps prisma migrate dev --name {name of migration here}`

If migrations need to be applied to a new database or existing database:
`npx prisma migrate deploy`

If migrations need to be applied to an existing database with differing schema(s), can cause data loss:
`npx prisma migrate dev`
or
`npx prisma migrate reset`

# IMPORTANT Compiler Options:
```{
  "extends": "@tsconfig/node-lts/tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./"
  },
  "include": [
    "**/*.ts"
  ],
  "exclude": [
    "dist"
  ],
  "ignoreDeprecations": "6.0",
  "moduleResolution": "node",
  "sourceMap": true
}```

