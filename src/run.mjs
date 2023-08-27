/**
 * **Created on 10/08/2023**
 *
 * run.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 * Framework Manager, a web interface for the management of framework components, including the job scheduling system, databases, logs, machine resource utilization, sockets, and other related elements
 *
 */

import { Server } from '@agtm/node-framework'
import nf_manager from './main.mjs'

await Server.init(nf_manager)
