import {inject} from '@loopback/context';
import {RestBindings, Request, Response, BodyParser, RequestBody, RequestBodyParserOptions} from '@loopback/rest';
import multer from 'multer';

const FORM_DATA = 'multipart/form-data';

export class MultipartFormDataBodyParser implements BodyParser {
  name = FORM_DATA;

  // constructor(
  //   @inject(RestBindings.REQUEST_BODY_PARSER_OPTIONS, {optional: true})
  //   options: RequestBodyParserOptions = {},
  // ) {
  //   console.log('REQUEST_BODY_PARSER_OPTIONS', RestBindings.REQUEST_BODY_PARSER_OPTIONS)
  //   // const jsonOptions = getParserOptions('json', options);
  //   // this.jsonParser = json(jsonOptions);
  // }

  supports(mediaType: string) {
    // The mediaType can be
    // `multipart/form-data; boundary=--------------------------979177593423179356726653`
    return mediaType.startsWith(FORM_DATA);
  }

  async parse(request: Request): Promise<RequestBody> {
    const storage = multer.memoryStorage();
    const upload = multer({storage});
    // const upload = multer({dest: "/"});
    return new Promise<RequestBody>((resolve, reject) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      upload.any()(request, {} as any, err => {
        if (err) reject(err);
        else {
          resolve({
            value: {
              files: request.files,
              fields: request.body,
            },
          });
        }
      });
    });
  }
}
