export const buildFileFromUpload = (upload: any, fields: any = {}) => {
  const sep: string[] = upload.originalname.split('.');

  // TODO: get extension from mimetype->extension map
  if (sep.length < 2) {
    throw new Error('Uploaded file name does not contain an extension')
  }
  const extension = sep[sep.length - 1];

  return Object.assign({}, fields, {
    name: upload.originalname,
    extension,
    encoding: upload.encoding,
    mimetype: upload.mimetype,
    size: upload.size,
    source: upload.buffer.toString('hex'),
  });
}
