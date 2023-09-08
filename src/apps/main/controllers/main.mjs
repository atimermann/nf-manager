/**
 * **Created on 10/08/2023**
 *
 * apps/main/controllers/main.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */
import { Controller, createLogger, JobManager, WorkerManager } from '@agtm/node-framework'
import NfManagerDatabase from '../services/nf-manager.database.mjs'

const logger = createLogger('NFManager')

export default class MainController extends Controller {
  async setup () {
    logger.info('Initializing SQLite Database...')
    await NfManagerDatabase.initDatabase()
    logger.info('Creating database structure...')
    await NfManagerDatabase.createTables()

    // Registra erros no processamento
    WorkerManager.events.on('processError', async jobProcess => {
      const jobData = await NfManagerDatabase.addProcessError(jobProcess)

      this.namespace('/job')
        .to(`job:${jobData.uuid}`)
        .emit(
          'processError',
          jobData
        )
    })
  }

  socket () {
    /**
     * Jobs List
     * Outputs updated information of all jobs
     */
    this.namespace('/jobs').on('connection', async socket => {
      // Atualiza contagem de erro baseado na base de dados
      const jobsInformation = JobManager.getJobsInformation()
      const keys = Object.keys(jobsInformation)

      // TODO: executar apenas uma consulta retornando todos os uuids
      await Promise.all(keys.map(async key => {
        jobsInformation[key].errorCount = await NfManagerDatabase.getJobErrorCountByUUID(jobsInformation[key].uuid)
      }))

      socket.emit('jobsList', jobsInformation)
    })

    /**
     * Job OverView
     */
    this.namespace('/job').on('connection', async socket => {
      const jobUuid = socket.handshake.query.uuid

      // Subscribe to the 'job Uuid' room
      socket.join(`job:${jobUuid}`)

      // Send all current errors
      socket.emit(
        'allProcessError',
        await NfManagerDatabase.getRecordsByUUID(jobUuid)
      )
    })
  }
}
