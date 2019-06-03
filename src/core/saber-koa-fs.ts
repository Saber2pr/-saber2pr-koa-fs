/*
 * @Author: saber2pr
 * @Date: 2019-04-27 19:41:46
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-30 22:41:07
 */
import { FS, Http } from '@saber2pr/node'
import { Job, compose } from '@saber2pr/koa'

export interface PathMap {
  [path: string]: string
}

export function Redirect(pathMap: PathMap): Job {
  return async (ctx, next) => {
    const requestUrl = ctx.request.url
    if (requestUrl in pathMap) {
      ctx.response.statusCode = 302
      ctx.response.setHeader('Location', pathMap[requestUrl])
      ctx.response.end()
    } else {
      await next()
    }
  }
}

export const IndexJob: Job = Redirect({
  '/': '/index.html',
  '/index': '/index.html',
  '/index.htm': '/index.html'
})
/**
 * ## `ensure it is the last of all jobs.`
 */
export const FsJob: Job = async ctx => {
  try {
    try {
      const target = process.cwd() + decodeURIComponent(ctx.request.url)
      const res = await FS.readFile(target)
      ctx.response.end(res)
    } catch (error) {
      throw new Http.HttpException(encodeURI(error.message), 404)
    }
  } catch (error) {
    Http.HttpException.resolve(error, ctx.response)
  }
}
/**
 * ## `ensure it is the last of all jobs.`
 */
export const HTMLJob: Job = compose(
  IndexJob,
  FsJob
)
