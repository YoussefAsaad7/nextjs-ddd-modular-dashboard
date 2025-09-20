# Next.js DDD Modular Dashboard  

A learning project built with **Next.js Full Stack** and **Prisma**, following a **DDD (Domain-Driven Design) modular monolith** approach.  
This project is part of a **learning journey** and was originally created as part of [vercel/learn](https://github.com/vercel/learn).  

---

## 🚀 Demo  

🔗 [Live Deployment](https://nextjs-ddd-modular-dashboard.vercel.app)  

Login credentials:  
- **Email:** `user@nextmail.com`  
- **Password:** `123456`  

---

## 📦 Tech Stack  

- **Framework:** Next.js (App Router)  
- **Database:** PostgreSQL (Vercel Postgres)  
- **ORM:** Prisma  
- **Auth:** NextAuth.js  
- **UI:** TailwindCSS 
- **Package Manager:** pnpm  

---

## 🛠️ Local Setup  

1. **Clone the repository**  

```bash
git clone https://github.com/YoussefAsaad7/nextjs-ddd-modular-dashboard.git
cd nextjs-ddd-modular-dashboard
```
2. **Install dependencies**
```bash
pnpm install
```
3. **Configure environment variables**
   
Create a .env file in the project root:
```bash
DATABASE_URL="<your-vercel-postgres-connection-string>"
AUTH_SECRET="<your-secret>"
```
👉 You can generate a strong AUTH_SECRET here: https://generate-secret.vercel.app/32  

4. **Push Prisma schema to database**
```bash
pnpm prisma db push
```
5. **Seed the database**
This project uses a custom tsconfig.seed.json for seeding.
Run:
```bash
pnpm ts-node --project tsconfig.seed.json prisma/seed.ts
```
## 💡 Notes

- Make sure you have **Vercel Postgres** set up and update your `DATABASE_URL`.  
- Authentication is handled via **NextAuth** with an environment secret.  
- This project is for **learning purposes** — not production-ready.  

## 📖 References

- [Next.js Documentation](https://nextjs.org/docs)  
- [Prisma Documentation](https://www.prisma.io/docs)  
- [NextAuth.js](https://next-auth.js.org/)  
- [Vercel Postgres](https://vercel.com/postgres)  
