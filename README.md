# NF Manager

Api e interface web para gestão do node-framework

# Instalação

Instale com

    npm i @agtm/nf-manager

Em seguida é necessário carregar a aplicação em 

    src/main.mjs

Adicione

```javascript
    import nfManager from '@agtm/nf-manager'
    myApplication.loadApplication(nfManager)
```
    
Exemplo:
```javascript

import { __dirname } from '@agtm/util'
import { Application, checkExecution } from '@agtm/node-framework'
import nfManager from '@agtm/nf-manager'

checkExecution(import.meta.url)

const myApplication = new Application(__dirname(import.meta.url), 'myApplication')
myApplication.loadApplication(nfManager)

export default datalensAutomation

```
# Configuração

Caso queira utilizar a interface web disponível na aplicação defina uma rota em config.default.yaml:

```yaml
httpServer:
  customStaticRoutes:
    - staticRoute: "/manager"
      staticPath: "public/nfManager/main"

  # Necessário para liberar a execução do nuxt (executa script inline)
  helmet:
    contentSecurityPolicy:
      directives:
        scriptSrcElem:
          - "'self'"
          - "'unsafe-inline'"
```

# Acessando API (WebSocket)


# Aproveitando os componentes em vez de utilizar o frontend completo

É possivel desativar o frontend, mantendo apenas api para isso:

<TODO>

Caso de uso seria quando precisar incorporar o fonte em sua própria interface web, caso esteja utilizando Nuxt ou vue3 é
possível aproveitar o código atual

Nd Manager foi desenvolvido em vários componentes pensando no reaproveitamento conforme abaixo:

<TODO>

# Desenvolvimento - Frontend nuxt

O frontend está incorporado ao nf-manager em vez de um repositório separado, localizado na pasta web.

O desenvolvimento e execução e scripts do nuxt deve ser feito diretamente na pasta web, apenas para gerar o código para
carregar no projeto executar conforme abaixo:

Foi adicionado uma rota customizada no backend (nf-manager):

    /manager

Apontando para

    src/public/nf_manager/main

Com isso para acessar a interface web usar:

    http://<ip>/manager

Código fonte da interface está na pasta web, usar o comando a seguir para gerar e copiar frontent para node-framework:

    npm run generate-web


