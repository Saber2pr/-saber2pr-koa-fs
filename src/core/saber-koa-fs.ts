/*
 * @Author: saber2pr
 * @Date: 2019-04-27 19:41:46
 * @Last Modified by: saber2pr
 * @Last Modified time: 2019-04-27 20:20:08
 */
import { FS } from '@saber2pr/node'
import { Job, compose } from '@saber2pr/koa'

export const IndexJob: Job = async (ctx, next) => {
  if (ctx.request.url === '/') {
    ctx.response.end(await FS.readFile(process.cwd() + '/index.html'))
  }
  await next()
}

export const FsJob: Job = async (ctx, next) => {
  const files = await FS.search()
  const target = process.cwd() + decodeURIComponent(ctx.request.url)
  if (files.includes(target)) {
    const res = await FS.readFile(target)
    ctx.response.end(res)
  }
  await next()
}

export const HTMLJob: Job = compose(
  FsJob,
  IndexJob
)
