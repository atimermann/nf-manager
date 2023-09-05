<template>
  <div class="container-fluid">
    <Card>
      <!--      <template #subtitle>-->
      <!--        subtitle-->
      <!--      </template>-->

<!--      <template #title>-->
<!--        Lista de Jobs-->
<!--      </template>-->

      <!--      <template #footer>-->
      <!--        Footer-->
      <!--      </template>-->
      <template #content>
        <DataTable
          :value="jobs"
          table-style="min-width: 50rem"
          show-gridlines
          class="p-datatable-sm"
          paginator
          :rows="20"
          sortMode="multiple"
        >
          <Column sortable field="application" header="Projeto" />
          <Column sortable field="app" header="App" />
          <Column sortable field="controller" header="Controller" />
          <Column sortable field="name" header="Job" />
          <Column sortable field="scheduleText" header="Agendamento" />
          <Column sortable field="workers" header="Workers" />
          <Column sortable field="concurrency" header="Inst." />
          <Column sortable field="persistent" header="Pers." />
          <Column sortable field="status" header="Status" />
        </DataTable>
      </template>
    </Card>
  </div>
</template>

<script setup>

import Card from 'primevue/card'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { io } from 'socket.io-client'
import cronstrue from 'cronstrue/i18n'

definePageMeta({
  layout: 'admin',
  title: 'Jobs'
})

const socket = io('http://localhost:4001/jobs')

let jobsIndex = {}

socket.on('connect', () => {
  console.info('Connection with server ok')
})

socket.on('jobsList', jobInformation => {
  jobsIndex = jobInformation
  updateJobsList()
})

const jobs = ref(
  []
)

function updateJobsList () {
  jobs.value = []

  Object.keys(jobsIndex).forEach((key) => {
    const jobInfo = jobsIndex[key]

    let scheduleText = ''
    if (jobInfo.schedule && jobInfo.schedule !== 'now') {
      scheduleText = cronstrue.toString(jobInfo.schedule, { locale: 'pt_BR' })
    } else if (jobInfo.schedule === 'now') {
      scheduleText = 'Na inicialização'
    }

    jobs.value.push({
      name: jobInfo.name,
      application: jobInfo.applicationName,
      app: jobInfo.appName,
      controller: jobInfo.controllerName,
      scheduleText,
      workers: jobInfo.workers?.join(', '),
      concurrency: jobInfo.concurrency,
      persistent: jobInfo.persistent ? 'Sim' : 'Não',
      status: jobInfo.status
    })
  })
}

</script>
