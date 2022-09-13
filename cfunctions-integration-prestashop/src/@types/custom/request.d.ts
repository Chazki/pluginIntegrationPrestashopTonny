type ExpressRequest = import('express').Request

interface CustomRequest extends ExpressRequest {
  idPlatform?: number
  log: import('express-pino-logger').HttpLogger['logger']
  body: {
    args?: import('schemas').UserDTO
  }
  // We can add custom headers via intersection, remember that for some reason
  // headers must be in Snake-Pascal-Case
  headers: import('http').IncomingHttpHeaders & {
    'id-platform'?: string
  }
}
