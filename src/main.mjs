/**
 * **Created on 10/08/2023**
 *
 * main.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 * Framework Manager, a web interface for the management of framework components, including the job scheduling system, databases, logs, machine resource utilization, sockets, and other related elements
 *
 */
import { dirname } from 'path'
import { pathToFileURL, fileURLToPath } from 'url'
import { Application } from '@agtm/node-framework'

const __dirname = dirname(fileURLToPath(import.meta.url))
const nfManager = new Application(__dirname, 'nfManager')

export default nfManager

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  throw new Error('This module should not be executed directly, use \'run.mjs\' instead.')
}
