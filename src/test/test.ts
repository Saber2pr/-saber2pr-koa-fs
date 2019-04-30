/*
 * @Author: saber2pr
 * @Date: 2019-04-27 19:41:52
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-27 20:23:38
 */
import { Koa } from '@saber2pr/koa'
import { HTMLJob } from '../core/saber-koa-fs'

Koa()
  .use(HTMLJob)
  .use(async (ctx, next) => {
    if (ctx.request.url === '/aa') {
      ctx.response.end('aa')
    }
    await next()
  })

  .listen(4003, () => console.log('http://localhost:4003'))
