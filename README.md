# @saber2pr/koa-fs

> fs jobs for @saber2pr/koa.

```bash
# from npm
npm install @saber2pr/koa-fs

# from github
git clone https://github.com/Saber2pr/koa-fs.git
```

# API

1. IndexJob

2. FsJob

3. HTMLJob

4. Redirect

> 重定向

```ts
export const IndexJob: Job = Redirect({
  '/': '/index.html',
  '/index': '/index.html',
  '/index.htm': '/index.html'
})
```

```ts
Koa()
  .use(HTMLJob)
  .listen(4003, () => console.log('http://localhost:4003'))
```

---

## start

```bash
npm install
```

```bash
npm start

npm test

```

> Author: saber2pr

---

## develope and test

> you should write ts in /src

> you should make test in /src/test

> export your core in /src/index.ts!
