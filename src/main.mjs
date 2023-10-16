/**
 * **Created on 10/08/2023**
 *
 * main.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 * Framework Manager, a web interface for the management of framework components, including the job scheduling system, databases, logs, machine resource utilization, sockets, and other related elements
 *
 */
import { __dirname } from '@agtm/util'
import { checkExecution } from '@agtm/node-framework'

checkExecution(import.meta.url)

export default function applicationLoader (Application){
  return new Application(__dirname(import.meta.url), 'nfManager')
}
