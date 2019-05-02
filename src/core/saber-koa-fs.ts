/*
 * @Author: saber2pr
 * @Date: 2019-04-27 19:41:46
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-30 22:41:07
 */
import { FS, Http } from '@saber2pr/node'
import { Job, compose } from '@saber2pr/koa'

export const IndexJob: Job = async (ctx, next) => {
  if (ctx.request.url === '/') {
    ctx.response.setHeader('Location', '/index.html')
    ctx.response.statusCode = 302
    ctx.response.end()
  } else {
    await next()
  }
}

export const FsJob: Job = async (ctx, next) => {
  if (ctx.request.url !== '/') {
    try {
      try {
        const target = process.cwd() + decodeURIComponent(ctx.request.url)
        const res = await FS.readFile(target)
        ctx.response.end(res)
      } catch (error) {
        throw new Http.Exception(encodeURIComponent(error.message), 404)
      }
    } catch (error) {
      Http.Exception.resolve(error, ctx.response)
    }
  } else {
    await next()
  }
}

export const HTMLJob: Job = compose(
  FsJob,
  IndexJob
)
