import {PipeosServerApplication} from './application';
import {ApplicationConfig} from '@loopback/core';
import {SERVER_CONFIG} from './config';
import {MultipartFormDataBodyParser} from './utils/multipartform_parser';

export {PipeosServerApplication};

export async function main(options: ApplicationConfig = {}) {
  options = Object.assign(options, {
    rest: SERVER_CONFIG,
  });

  const app = new PipeosServerApplication(options);
  app.bodyParser(MultipartFormDataBodyParser);
  await app.boot();
  await app.start();

  const url = app.restServer.url;
  console.log(`Server is running at ${url}`);
  console.log(`Try ${url}/ping`);

  return app;
}
