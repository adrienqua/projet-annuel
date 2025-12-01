# BuildMyPC

A PC builder and ecommerce application.

The application is available here: [https://buildmypc.space](https://buildmypc.space)

The code is available on GitHub: [https://github.com/adrienqua/projet-annuel](https://github.com/adrienqua/projet-annuel)

## Technologies

We build the Backend using Node.js with TypeScript, the ORM Prisma and PostgreSQL for the database.

For the Frontend, we used Vue.js with setup configuration and TypeScript. For the UI we used Tailwind with DaisyUI providing components based on Tailwind.

We used Stripe API for the payment feature and Google API to setup 2FA with Google Authenticator.

## Setup

Start the project :

```bash
cd server

docker compose up -d --build

docker exec -it server-server-1 npx prisma db push

docker exec -it server-server-1 npx prisma db seed
```

## Test users

### Admin

- **Username:** `admin1@test.com`
- **Password:** `admin`

### Customer (User)

- **Username:** `j.doe@test.com`
- **Password:** `Password123*`

## Main Features

- PC Builder : select components and create a fully customized PC.
  - Check compatibility between components.
  - Save components to your profile or add to cart.
  - Your build is saved in the LocaleStorage, you can begin now and continue later.
- Cart : Manage your products, the quantity and proceed to Checkout.
- Checkout : Verify your order, select your Address, the Carrier and proceed to the payment with Stripe
- Product listing and product page : Discover our components, check details and add them to the Cart.
- Comparator : Compare the features between 2 components.
- Admin dashboard : List, Create, Update, Delete Users, Components or Orders.
- Account page : Manage your Addresses, your Orders or your Builds. Enable / disable 2FA.

### "Bonus"

- 2FA : Link your account with Google Authenticator, you will be required to enter a code to login, after the password.
- Matomo : Get analytics features to track SEO of the application ([https://matomo.buildmypc.space](https://matomo.buildmypc.space))
- Adwords campaign : A pdf file to present our marketing strategy
- Sentry : Implement Sentry on the Frontend and on the Server to track errors.
- SQLMap : Analyze vulnerabilities and generate a detailed security report.

## Organization

We used Trello to manage our project. This tool allow us to have a global visibility of the next tasks To do, the tasks In progress or the tasks Done.
([https://trello.com/b/oqhHO5oL/projet-annuel](https://trello.com/b/oqhHO5oL/projet-annuel))

## Design Mockup on Figma

[Figma Design Mockup Link](https://www.figma.com/design/9Cp6HVCtMpZju3033GfMiz/Projet-Annuel?node-id=2-2&p=f&t=b8bygT1d59lIL08D-0)

On the top you can see very detailed Mockup of our current website.

On the bottom, you can see the preliminar mockup we used as a reference to create our current application, before we took the decision to go beyond listing the components from different website to create our own complete ecommerce application.

### Colors and fonts (page Design)

For the colors, we used a navy blue to inspire confidence and a bright mint green to give a fresh, modern and energetic feeling.

We used Montserrat Black (900) for titles, it give a strong visual impact for headings and enhance overall readibility.
For body text, we used Poppins because it match very well with Montserrat and it's modern and easy to read.
