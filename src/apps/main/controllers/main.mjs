/**
 * **Created on 10/08/2023**
 *
 * apps/main/controllers/main.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */
import { Controller, createLogger, Config, JobManager } from '@agtm/node-framework'
const logger = createLogger('NFManager')

export default class MainController extends Controller {
  socket () {
    this.namespace('/jobs').on('connection', async socket => {
      // Outputs updated information of all jobs

      const jobsInformation = JobManager.getJobsInformation()

      console.log(jobsInformation)

      socket.emit('jobsList', jobsInformation)
    })
  }
}
